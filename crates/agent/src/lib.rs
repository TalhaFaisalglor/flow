mod connector_tags;
mod directives;
mod discovers;
mod jobs;
pub mod logs;
mod publications;

use anyhow::Context;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::postgres::PgListener;
use std::{collections::HashMap, sync::Arc};
use tokio::sync::{mpsc, Mutex};

pub use agent_sql::{CatalogType, Id};
pub use connector_tags::TagHandler;
pub use directives::DirectiveHandler;
pub use discovers::DiscoverHandler;
pub use publications::PublishHandler;

#[derive(Debug)]
pub enum HandlerStatus {
    Active,
    Idle,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct AgentNotification {
    timestamp: DateTime<Utc>,
    table: String,
}

/// Handler is the principal trait implemented by the various task-specific
/// event handlers that the agent runs.
#[async_trait::async_trait]
pub trait Handler {
    async fn handle(&mut self, pg_pool: &sqlx::PgPool) -> anyhow::Result<HandlerStatus>;

    fn table_name(&self) -> &'static str;

    fn name(&self) -> &'static str {
        std::any::type_name::<Self>()
    }
}

const AGENT_NOTIFICATION_CHANNEL: &str = "agent_notifications";

// serve one or more Handlers until signaled by a ready |exit| future.
#[tracing::instrument(ret, skip_all)]
pub async fn serve<E>(
    handlers: Vec<Box<dyn Handler>>,
    pg_pool: sqlx::PgPool,
    exit: E,
) -> anyhow::Result<()>
where
    E: std::future::Future<Output = ()> + Send,
{
    let handlers_by_table = handlers
        .into_iter()
        .map(|h| (h.table_name(), Arc::new(Mutex::new(h))))
        .collect::<HashMap<_, _>>();

    let mut listener = PgListener::connect_with(&pg_pool).await?;

    listener.listen(AGENT_NOTIFICATION_CHANNEL).await?;

    // We use a channel here for two reasons:
    // 1. Because handlers run one task at a time, and can also indicate that they have more work to perform or not,
    //    we want to balance the time spent processing each type of handler so that no one handler can monopolize resources.
    // 2. It makes it easy to preemptively schedule at least one run of each handler on boot up to allow for handling requests
    //    that came in while we weren't running
    // NOTE: it is critical that we use an unbounded channel here, otherwise we would open ourselves up to a deadlock scenario
    // Example deadlock when using a bounded channel:
    // 1. A spike of work comes in
    let (task_tx, mut task_rx) = mpsc::unbounded_channel::<String>();

    // Each handler gets run at least once to check if there is any pending work
    for (handler_table, _) in handlers_by_table.iter() {
        task_tx.send(handler_table.to_string())?;
    }

    let task_tx_cloned = task_tx.clone();
    let listen_to_datbase_notifications = async move {
        loop {
            let item = listener.recv().await.map_err(|e| anyhow::Error::from(e))?;
            let notification: AgentNotification = serde_json::from_str(item.payload())
                .context("deserializing agent task notification")?;
            let table: &str = &notification.table;

            tracing::debug!(table = table, "Message received to invoke handler");
            task_tx_cloned
                .send(table.to_string())
                .map_err(|e| anyhow::Error::from(e))?
        }
        // Need this here to indicate that this future returns an anyhow::Result<()>
        #[allow(unreachable_code)]
        Ok::<(), anyhow::Error>(())
    };

    let mut listener_handler = tokio::spawn(listen_to_datbase_notifications);

    tokio::pin!(exit);

    loop {
        tokio::select! {
            _ = &mut exit => {
                return Ok(())
            }
            listener_res = &mut listener_handler => {
                match listener_res {
                    // It should be impossible to get here since `listen_to_datbase_notifications` loop has no `return`s or `break`s
                    Ok(Ok(())) => return Err(anyhow::anyhow!("Unexpected notification listener exit")),
                    // If we get an error from inside `listen_to_datbase_notifications`,
                    // something went wrong when actually listening to the postgres channel
                    Ok(Err(e)) => return Err(e.into()),
                    // If we got a JoinError, the listener failed unexpectedly
                    Err(e) => return Err(e.into()),
                }
            }
            maybe_handler_table = task_rx.recv() => {
                match maybe_handler_table {
                    Some(handler_table) => {
                        let mut handler = match handlers_by_table.get(&handler_table as &str) {
                            Some(handler) => handler.lock().await,
                            None => {
                                tracing::warn!(table = &handler_table, "Message received to handle unknown table");
                                continue;
                            },
                        };

                        let handle_result = handler.handle(&pg_pool).await;

                        match handle_result {
                            Ok(status) => {
                                tracing::info!(handler = %handler.name(), table = %handler.table_name(), status = ?status, "invoked handler");
                                match status {
                                    HandlerStatus::Active => {
                                        // Re-schedule another run to handle this MoreWork
                                        task_tx.send(handler.table_name().to_string())?;
                                    }
                                    _ => {}
                                }
                            }
                            Err(err) => {
                                // Do we actually just want to crash here?
                                tracing::error!(handler = %handler.name(), table = %handler.table_name(), "Error invoking handler: {err}");
                            }
                        }
                    },
                    None => {
                        // If `task_rx.recv()` returns None, the channel has been closed
                        // This shouldn't happen, so if it does then something probably went wrong and we should exit
                        return Ok(())
                    },
                }
            }
        }
    }
}

// upsert_draft_specs updates the given draft with specifications of the catalog.
async fn upsert_draft_specs(
    draft_id: Id,
    models::Catalog {
        collections,
        captures,
        materializations,
        tests,
        ..
    }: models::Catalog,
    txn: &mut sqlx::Transaction<'_, sqlx::Postgres>,
) -> Result<(), sqlx::Error> {
    for (collection, spec) in collections {
        agent_sql::upsert_draft_spec(
            draft_id,
            collection.as_str(),
            spec,
            CatalogType::Collection,
            txn,
        )
        .await?;
    }
    for (capture, spec) in captures {
        agent_sql::upsert_draft_spec(draft_id, capture.as_str(), spec, CatalogType::Capture, txn)
            .await?;
    }
    for (materialization, spec) in materializations {
        agent_sql::upsert_draft_spec(
            draft_id,
            materialization.as_str(),
            spec,
            CatalogType::Materialization,
            txn,
        )
        .await?;
    }
    for (test, steps) in tests {
        agent_sql::upsert_draft_spec(draft_id, test.as_str(), steps, CatalogType::Test, txn)
            .await?;
    }

    agent_sql::touch_draft(draft_id, txn).await?;
    Ok(())
}

#[cfg(test)]
mod test {
    use std::time::Duration;

    use crate::{serve, AgentNotification, Handler, HandlerStatus, AGENT_NOTIFICATION_CHANNEL};

    use futures::{FutureExt, TryFutureExt};
    use sqlx::{postgres::PgListener, PgPool};

    const FIXED_DATABASE_URL: &str = "postgresql://postgres:postgres@localhost:5432/postgres";
    const CLEANUP: &str = include_str!("publications/test_resources/cleanup.sql");

    #[derive(Debug)]
    struct MockHandler {
        notifier: tokio::sync::mpsc::UnboundedSender<()>,
        table_name: &'static str,
    }

    impl MockHandler {
        fn new(table_name: &'static str, notifier: tokio::sync::mpsc::UnboundedSender<()>) -> Self {
            MockHandler {
                notifier,
                table_name,
            }
        }
    }

    #[async_trait::async_trait]
    impl Handler for MockHandler {
        async fn handle(&mut self, _: &sqlx::PgPool) -> anyhow::Result<HandlerStatus> {
            self.notifier.send(()).unwrap();
            Ok(HandlerStatus::Idle)
        }

        fn table_name(&self) -> &'static str {
            &self.table_name
        }
    }

    #[tokio::test]
    async fn test_handlers_react_quickly() -> anyhow::Result<()> {
        let pg_pool = PgPool::connect(&FIXED_DATABASE_URL).await.unwrap();

        let (handler_notify_tx, mut handler_notify_rx) =
            tokio::sync::mpsc::unbounded_channel::<()>();
        let (_, exit_rx) = tokio::sync::oneshot::channel::<()>();

        let server = serve(
            vec![Box::new(MockHandler::new(
                "publications",
                handler_notify_tx,
            ))],
            pg_pool.clone(),
            exit_rx.map(|_| ()),
        );

        tokio::pin!(server);

        tokio::select! {
            _ = &mut server => {
                Err(anyhow::anyhow!("Handler unexpectedly exited"))
            }
            res = async move {
                // Do this 10 times in a row to make sure that our handler gets called consistently quickly
                for _ in 0..10{
                    let mut txn = pg_pool.begin().await.unwrap();
                    sqlx::query(CLEANUP).execute(&mut txn).await.unwrap();
                    // Sets up the database to have a valid publication task and associated draft/specs
                    sqlx::query(include_str!("publications/test_resources/happy_path.sql"))
                        .execute(&mut txn)
                        .await
                        .unwrap();

                    // We have to commit the transaction for the NOTIFY to get sent
                    txn.commit().await.unwrap();

                    // Make sure that our mock publication handler was called within 25ms
                    let res = tokio::time::timeout(Duration::from_millis(25), handler_notify_rx.recv().map(|_|()))
                        .await
                        .map_err(|_| anyhow::anyhow!("Timed out waiting for mock publication handler to get called"));

                    res?;
                }
                Ok(())
            } => {
                res
            }
        }
    }

    #[tokio::test]
    async fn test_pg_notifications() {
        let pg_pool = PgPool::connect(&FIXED_DATABASE_URL).await.unwrap();
        let mut txn = pg_pool.begin().await.unwrap();

        let mut listener = PgListener::connect_with(&pg_pool).await.unwrap();

        listener.listen(AGENT_NOTIFICATION_CHANNEL).await.unwrap();

        // This sets up the database to have a valid publication
        // which should trigger a NOTIFY on the AGENT_NOTIFICATION_CHANNEL
        sqlx::query(CLEANUP).execute(&mut txn).await.unwrap();
        sqlx::query(include_str!("publications/test_resources/happy_path.sql"))
            .execute(&mut txn)
            .await
            .unwrap();

        // We have to commit the transaction for the NOTIFY to get sent
        txn.commit().await.unwrap();

        let notification: AgentNotification = tokio::time::timeout(
            Duration::from_millis(50),
            listener
                .recv()
                .map_ok(|item| serde_json::from_str(item.payload()).unwrap()),
        )
        .await
        .unwrap()
        .unwrap();

        insta::assert_json_snapshot!(
            notification,
            {".timestamp" => "[timestamp]"},
            @r#"
            {
              "timestamp": "[timestamp]",
              "table": "publications"
            }"#
        );
    }
}

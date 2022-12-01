use serde::Deserialize;

use super::config;

mod roles;

#[derive(Debug, clap::Args)]
#[clap(rename_all = "kebab-case")]
pub struct Auth {
    #[clap(subcommand)]
    cmd: Command,
}

#[derive(Debug, clap::Subcommand)]
#[clap(rename_all = "kebab-case")]
pub enum Command {
    /// Authenticate to Flow using a service account file.
    ///
    /// You can find this service account within Flow UI dashboard under "Admin".
    ServiceAccount(ServiceAccountArgs),
    /// Authenticate to a local development instance of the Flow control plane.
    ///
    /// This is intended for developers who are running local instances
    /// of the Flow control and data-planes.
    Develop(Develop),
    /// Work with authorization roles and grants.
    ///
    /// Roles are prefixes of the Flow catalog namespace.
    /// Granting a role (the object) to another role or user (the subject)
    /// gives the subject a capability (read, write, or admin) to the object role.
    ///
    /// A 'read' capability allows a subject user or specifications to read
    /// from object collections.
    ///
    /// A 'write' capability allows reads and writes to object collections
    /// from the subject.
    ///
    /// An 'admin' capability allows a subject to manage catalog specifications,
    /// grants, and storage mappings which are prefixed by the object role.
    /// Unlike 'read' or 'write', the subject of an 'admin' grant also inherits
    /// capabilities granted to the object role from still-other roles.
    Roles(roles::Roles),
    /// Manually refresh tokens of service account
    Refresh
}

#[derive(Debug, clap::Args)]
#[clap(rename_all = "kebab-case")]
pub struct ServiceAccountArgs {
    /// Path to service account JSON file
    #[clap(long)]
    path: String,
}

#[derive(Debug, Deserialize)]
pub struct ServiceAccount {
    pub access_token: String,
    pub refresh_token: String,
    pub expires_at: i64,
}

#[derive(Debug, clap::Args)]
#[clap(rename_all = "kebab-case")]
pub struct Develop {
    #[clap(long)]
    token: Option<String>,
}

impl Auth {
    pub async fn run(&self, ctx: &mut crate::CliContext) -> Result<(), anyhow::Error> {
        match &self.cmd {
            Command::ServiceAccount(ServiceAccountArgs { path }) => {
                let sa_file = std::fs::File::open(path)?;
                let sa: ServiceAccount = serde_json::from_reader(sa_file)?;
                ctx.config_mut().api = Some(config::API::managed(sa));
                println!("Configured service account.");
                Ok(())
            }
            Command::Develop(Develop { token }) => {
                ctx.config_mut().api = Some(config::API::development(token.clone()));
                println!("Configured for local development.");
                Ok(())
            }
            Command::Roles(roles) => roles.run(ctx).await,
            Command::Refresh => {
                if let Some(api) = ctx.config_mut().api.as_mut() {
                    api.refresh().await?;
                }
                println!("Configured service account.");
                Ok(())
            }
        }
    }
}

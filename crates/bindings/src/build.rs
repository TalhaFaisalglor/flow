use crate::service::{self, Channel};
use build::API;

#[no_mangle]
pub extern "C" fn build_create(log_level: i32, log_dest_fd: i32) -> *mut Channel {
    service::create::<API>(log_level, log_dest_fd)
}
#[no_mangle]
pub extern "C" fn build_invoke1(ch: *mut Channel, i: service::In1) {
    service::invoke::<API, _>(ch, i)
}
#[no_mangle]
pub extern "C" fn build_invoke4(ch: *mut Channel, i: service::In4) {
    service::invoke::<API, _>(ch, i)
}
#[no_mangle]
pub extern "C" fn build_invoke16(ch: *mut Channel, i: service::In16) {
    service::invoke::<API, _>(ch, i)
}
#[no_mangle]
pub extern "C" fn build_drop(ch: *mut Channel) {
    service::drop::<API>(ch)
}

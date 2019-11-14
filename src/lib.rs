mod utils;

use wasm_bindgen::prelude::*;
use std::f64::consts::PI;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Simulation {
    speed: u64
}

#[wasm_bindgen]
impl Simulation {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Simulation {
        utils::set_panic_hook();
        Simulation { speed: 10000000}
    }

    pub fn sun_rotation(&self, delta: f64) -> f64 {
        //(360.0 * PI / 180.0) / (86164000.0 / (delta * self.speed as f64))
        (360.0 / (2114208000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn earth_rotation(&self, delta: f64) -> f64 {
        //(360.0 * PI / 180.0) / (86164000.0 / (delta * self.speed as f64))
        (360.0 / (86164000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn earth_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (31558118400.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn mars_rotation(&self, delta: f64) -> f64 {
        //(360.0 * PI / 180.0) / (86164000.0 / (delta * self.speed as f64))
        (360.0 / (88560000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn mars_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (59355072000.0 / (delta * self.speed as f64))) * PI / 180.0
    }
}


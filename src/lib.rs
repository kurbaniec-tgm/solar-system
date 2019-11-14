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

    pub fn reduce_speed(&mut self) {
        self.speed = self.speed / 10;
    }

    pub fn increase_speed(&mut self) {
        self.speed = self.speed * 10;
    }

    pub fn sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (2114208000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn mercury_rotation(&self, delta: f64) -> f64 {
        (360.0 / (5067000000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn mercury_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (7600521600.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn venus_rotation(&self, delta: f64) -> f64 {
        (360.0 / (20995200.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn venus_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (19414166400.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn earth_rotation(&self, delta: f64) -> f64 {
        (360.0 / (86164000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn earth_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (31558118400.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn moon_rotation(&self, delta: f64) -> f64 {
        (360.0 / (2360448000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn mars_rotation(&self, delta: f64) -> f64 {
        (360.0 / (88560000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn mars_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (59355072000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn jupiter_rotation(&self, delta: f64) -> f64 {
        (360.0 / (857952000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn jupiter_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (374080032000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn saturn_rotation(&self, delta: f64) -> f64 {
        (360.0 / (38361600.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn saturn_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (928987488000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn uranus_rotation(&self, delta: f64) -> f64 {
        (360.0 / (62064000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn uranus_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (2649465504000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn neptune_rotation(&self, delta: f64) -> f64 {
        (360.0 / (57564000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    pub fn neptune_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (5196912048000.0 / (delta * self.speed as f64))) * PI / 180.0
    }
}


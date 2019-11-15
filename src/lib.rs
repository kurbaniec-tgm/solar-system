mod utils;

use wasm_bindgen::prelude::*;
use std::f64::consts::PI;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Represents an object that handles the logic of the solar-system simulation.
#[wasm_bindgen]
pub struct Simulation {
    /// Defines the speed of the simulation.
    ///
    /// Speed = 1
    /// => Real-life speed.
    ///
    /// Speed = 10
    /// => Every millisecond in real-life is represented as 10 milliseconds in the simulation.
    speed: u64
}

#[wasm_bindgen]
impl Simulation {
    /// Creates a new simulation object.
    /// Speed set to 10000000 ms.
    #[wasm_bindgen(constructor)]
    pub fn new() -> Simulation {
        utils::set_panic_hook();
        Simulation { speed: 10000000}
    }

    /// Reduces the speed of the simulation to a tenth of the current one.
    pub fn reduce_speed(&mut self) {
        self.speed = self.speed / 10;
    }

    /// Increased the speed of the simulation by ten times of the current one.
    pub fn increase_speed(&mut self) {
        self.speed = self.speed * 10;
    }

    /// Returns the angle in radians that the sun rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (2114208000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that mercury rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn mercury_rotation(&self, delta: f64) -> f64 {
        (360.0 / (5067000000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that mercury rotated around the sun in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn mercury_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (7600521600.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that venus rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn venus_rotation(&self, delta: f64) -> f64 {
        (360.0 / (20995200.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that venus rotated around the sun in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn venus_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (19414166400.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that earth rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn earth_rotation(&self, delta: f64) -> f64 {
        (360.0 / (86164000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that earth rotated around the sun in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn earth_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (31558118400.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that the moon rotated on its own axis / around earth
    /// in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn moon_rotation(&self, delta: f64) -> f64 {
        (360.0 / (2360448000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that mercury rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn mars_rotation(&self, delta: f64) -> f64 {
        (360.0 / (88560000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that mars rotated around the sun in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn mars_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (59355072000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that jupiter rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn jupiter_rotation(&self, delta: f64) -> f64 {
        (360.0 / (857952000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that jupiter rotated around the sun in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn jupiter_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (374080032000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that saturn rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn saturn_rotation(&self, delta: f64) -> f64 {
        (360.0 / (38361600.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that saturn rotated around the sun in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn saturn_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (928987488000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that uranus rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn uranus_rotation(&self, delta: f64) -> f64 {
        (360.0 / (62064000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that uranus rotated around the sun in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn uranus_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (2649465504000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that neptune rotated on its own axis in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn neptune_rotation(&self, delta: f64) -> f64 {
        (360.0 / (57564000.0 / (delta * self.speed as f64))) * PI / 180.0
    }

    /// Returns the angle in radians that neptune rotated around the sun in the elapsed time.
    ///
    /// # Arguments
    ///
    /// * `delta` - The elapsed time in milliseconds
    pub fn neptune_sun_rotation(&self, delta: f64) -> f64 {
        (360.0 / (5196912048000.0 / (delta * self.speed as f64))) * PI / 180.0
    }
}


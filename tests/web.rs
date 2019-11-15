//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;
use solar_system::Simulation;


wasm_bindgen_test_configure!(run_in_browser);

// Source: https://stackoverflow.com/questions/41447678/comparison-of-two-floats-in-rust-to-arbitrary-level-of-precision
fn approx_equal(a: f64, b: f64, decimal_places: u8) -> bool {
    let factor = 10.0f64.powi(decimal_places as i32);
    let a = (a * factor).trunc();
    let b = (b * factor).trunc();
    a == b
}

#[wasm_bindgen_test]
fn get_speed() {
    let simulation = Simulation::new();
    assert_eq!(simulation.get_speed(), 10000000);
}

#[wasm_bindgen_test]
fn increase_speed() {
    let mut simulation = Simulation::new();
    simulation.increase_speed();
    assert_eq!(simulation.get_speed(), 100000000);
}

#[wasm_bindgen_test]
fn reduce_speed() {
    let mut simulation = Simulation::new();
    simulation.reduce_speed();
    assert_eq!(simulation.get_speed(), 1000000);
}

#[wasm_bindgen_test]
fn sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.sun_rotation(1.0);
    assert!(approx_equal(rotation, 2.9718860713702655920918314406903e-9, 20))
}

#[wasm_bindgen_test]
fn mercury_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.mercury_rotation(1.0);
    assert!(approx_equal(rotation, 1.2400207829444615111358371356935e-9, 20))
}

#[wasm_bindgen_test]
fn mercury_sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.mercury_sun_rotation(1.0);
    assert!(approx_equal(rotation, 8.2667817261115164476676005585709e-10, 20))
}

#[wasm_bindgen_test]
fn venus_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.venus_rotation(1.0);
    assert!(approx_equal(rotation, 2.9926770438860246517895932244318e-7, 20))
}

#[wasm_bindgen_test]
fn venus_sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.venus_sun_rotation(1.0);
    assert!(approx_equal(rotation, 3.2363920127827824103358291842801e-10, 20))
}

#[wasm_bindgen_test]
fn earth_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.earth_rotation(1.0);
    assert!(approx_equal(rotation, 7.2921235169903747236958437010341e-8, 20))
}

#[wasm_bindgen_test]
fn earth_sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.earth_sun_rotation(1.0);
    assert!(approx_equal(rotation, 1.9909885714794664300788245875137e-10, 20))
}

#[wasm_bindgen_test]
fn moon_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.moon_rotation(1.0);
    assert!(approx_equal(rotation, 2.6618613530904245621700993906915e-9, 20))
}


#[wasm_bindgen_test]
fn mars_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.mars_rotation(1.0);
    assert!(approx_equal(rotation, 7.0948343577005267354621575954822e-8, 20))
}

#[wasm_bindgen_test]
fn mars_sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.mars_sun_rotation(1.0);
    assert!(approx_equal(rotation, 1.05857597261099885059953878357e-10, 20))
}

#[wasm_bindgen_test]
fn jupiter_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.jupiter_rotation(1.0);
    assert!(approx_equal(rotation, 7.3234695031651962777932643860717e-9, 20))
}

#[wasm_bindgen_test]
fn jupiter_sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.jupiter_sun_rotation(1.0);
    assert!(approx_equal(rotation, 1.6796366471599281933672649938607e-11, 20))
}

#[wasm_bindgen_test]
fn saturn_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.saturn_rotation(1.0);
    assert!(approx_equal(rotation, 1.6378840578024864648307908863444e-7, 20))
}

#[wasm_bindgen_test]
fn saturn_sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.saturn_sun_rotation(1.0);
    assert!(approx_equal(rotation, 6.7634767834242203237567035634381e-12, 20))
}

#[wasm_bindgen_test]
fn uranus_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.uranus_rotation(1.0);
    assert!(approx_equal(rotation, 1.012371955913184209352488844831e-7, 20))
}

#[wasm_bindgen_test]
fn uranus_sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.uranus_sun_rotation(1.0);
    assert!(approx_equal(rotation, 2.3714916452747242399745872541691e-12, 20))
}

#[wasm_bindgen_test]
fn neptune_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.neptune_rotation(1.0);
    assert!(approx_equal(rotation, 1.0915129781077733439172550146896e-7, 20))
}

#[wasm_bindgen_test]
fn neptune_sun_rotation() {
    let mut simulation = Simulation::new();
    simulation.set_speed(1);
    let rotation = simulation.neptune_sun_rotation(1.0);
    assert!(approx_equal(rotation, 1.2090228291621044722605024095184e-12, 20))
}





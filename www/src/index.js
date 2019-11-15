import * as wasm from "solar-system";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module';

// WebAssembly initialization
const simulation = new wasm.Simulation();

// Three.js initialization
const clock = new THREE.Clock();
const fullRotation = 2*Math.PI;
//const container = document.getElementById( 'container' );
const container = document.createElement('div');
document.body.appendChild(container);
const stats = new Stats();
container.appendChild( stats.dom );
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
container.appendChild( renderer.domElement );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000000 );
// Note: x is forward/backward, z is left/right, y is top/bottom
camera.position.set( -15000, 7000, -3300 );
camera.rotation.set(-2.2578094173636574, -1.004615448774449, -2.3419978296978265, "XYZ");
const controls = new OrbitControls( camera, renderer.domElement );
// Set keybindings for moving the camera to "WASD" instead of Arrow-Keys
controls.keys = {
    LEFT: 65, // A
    UP: 87, // W
    RIGHT: 68, // D
    BOTTOM: 83 // S
};
const textureLoader = new THREE.TextureLoader();

// Saves every object in the solar system
const everything = [];
// Define planets that orbit the sun
const planets = [];
// Flag that determines if textures should be used
let textureFlag = true;
// Flag that determines if lightning should be used
let lightningFlag = true;
// Flag that determines if simulation is paused
let pause = false;

// Define objects of the solar-system
// Every object is a Three.js mesh with a an appropriate texture loaded.
// When textures are disabled, a basic material is loaded with a color as placeholder.
// The simulation features one light source found in the sun that can be toggled.

// GALAXY
const galaxy = new (function () {
    this.geometry = new THREE.SphereGeometry(500000, 50, 50);
    this.material = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load("resources/galaxy.png"),
            side: THREE.DoubleSide,
            shininess: 0
        }
    );
    this.basic = new THREE.MeshBasicMaterial( { color: 0x000 } );
    this.instance = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.instance);
    everything.push(this);
});
// SUN
const sun = new (function() {
    this.radius = 3477.55;
    this.texture = textureLoader.load("resources/sun.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    this.ownRotation = function (delta) {
        return simulation.sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    this.instance.position.set(0, 0, 0);
    this.lightIntensity = 3;
    this.light = new THREE.AmbientLight( 0x404040, this.lightIntensity ); // soft white light
    scene.add(this.instance);
    scene.add(this.light);
    everything.push(this);
})();
// MERCURY
const mercury = new (function() {
    this.radius = 180.0;
    this.texture = textureLoader.load("resources/mercury.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xdec692 } );
    this.ownRotation = function (delta) {
        return simulation.mercury_rotation(delta);
    };
    this.sunDistance = 5000.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.mercury_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    planets.push(this);
    everything.push(this);
})();
// VENUS
const venus = new (function() {
    this.radius = 318.0;
    this.texture = textureLoader.load("resources/venus.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xdec692 } );
    this.ownRotation = function (delta) {
        return simulation.venus_rotation(delta);
    };
    this.sunDistance = 7000.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.venus_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    planets.push(this);
    everything.push(this);
})();
// EARTH
const earth = new (function() {
    this.radius = 318.5;
    this.texture = textureLoader.load("resources/earth.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0x00a2ff } );
    this.ownRotation = function (delta) {
        return simulation.earth_rotation(delta);
    };
    this.sunDistance = 9000.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.earth_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    planets.push(this);
    everything.push(this);
})();
// MOON
const moon = new (function() {
    this.radius = 86.855;
    this.texture = textureLoader.load("resources/moon.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xbdbdbd } );
    this.earthDistance = 784.400; // 384400km
    this.theta = 0;
    this.rotation = function (delta) {
        return simulation.moon_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    everything.push(this);
})();
// MARS
const mars = new (function() {
    this.radius = 250.855;
    this.texture = textureLoader.load("resources/mars.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xa10606 } );
    this.ownRotation = function (delta) {
        return simulation.mars_rotation(delta);
    };
    this.sunDistance = 11000.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.mars_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    planets.push(this);
    everything.push(this);
})();
// JUPITER
const jupiter = new (function() {
    this.radius = 1500.855;
    this.texture = textureLoader.load("resources/jupiter.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xffe1b8 } );
    this.ownRotation = function (delta) {
        return simulation.jupiter_rotation(delta);
    };
    this.sunDistance = 14000.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.jupiter_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    planets.push(this);
    everything.push(this);
})();
// SATURN
const saturn = new (function() {
    this.radius = 1400.0;
    this.texture = textureLoader.load("resources/saturn.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xfff0db } );
    this.ownRotation = function (delta) {
        return simulation.saturn_rotation(delta);
    };
    this.sunDistance = 17500.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.saturn_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    planets.push(this);
    everything.push(this);
})();
// URANUS
const uranus = new (function() {
    this.radius = 800.0;
    this.texture = textureLoader.load("resources/uranus.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xb0ceff } );
    this.ownRotation = function (delta) {
        return simulation.uranus_rotation(delta);
    };
    this.sunDistance = 20000.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.uranus_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    planets.push(this);
    everything.push(this);
})();
// NEPTUNE
const neptune = new (function() {
    this.radius = 800.0;
    this.texture = textureLoader.load("resources/neptune.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0x4c8df5 } );
    this.ownRotation = function (delta) {
        return simulation.neptune_rotation(delta);
    };
    this.sunDistance = 22000.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.neptune_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    scene.add(this.instance);
    planets.push(this);
    everything.push(this);
})();

animate();

/**
 * Defines the simulation loop of the solar-system.
 */
export function animate() {
    requestAnimationFrame(animate);
    // Get elapsed time
    const delta = clock.getDelta();
    // Unless simulation is not stopped
    if (!pause) {
        // Rotate sun around its axis
        sun.instance.rotateY(sun.ownRotation(delta));
        // Get axis and earth rotation in radians of the moon
        const moonRotation = moon.rotation(delta);
        // Rotate moon around the earth
        moon.theta += moonRotation;
        moon.instance.position.x = earth.instance.position.x + moon.earthDistance * Math.cos(moon.theta);
        moon.instance.position.z = earth.instance.position.z + moon.earthDistance * Math.sin(moon.theta);
        // Rotate moon around its axis
        moon.instance.rotateY(moonRotation);
        // Perform operations on all planets that orbit the sun
        planets.forEach(function (planet) {
            // Rotate planet around its own axis
            planet.instance.rotateY(planet.ownRotation(delta));
            // Update stored angle for sun rotation
            planet.theta += planet.sunRotation(delta);
            // If the stored angle is more than a full rotation (2*Pi), subtract it to hinder overflowing
            if (planet.theta > fullRotation) {
                planet.theta -= fullRotation;
            }
            // Rotate planet around the sun
            planet.instance.position.x = planet.sunDistance * Math.cos(planet.theta);
            planet.instance.position.z = planet.sunDistance * Math.sin(planet.theta);
        });
    }
    // Update Three.js properties
    controls.update(delta);
    camera.clearViewOffset();
    stats.update();
    renderer.render(scene, camera);
}

/**
 * Defines a listener for user interactions.
 */
export function inputHandler(e) {
    switch (e.code) {
        case 'ArrowUp':     // Increase simulation speed
            simulation.increase_speed();
            break;
        case 'ArrowDown':   // Reduce simulation speed
            simulation.reduce_speed();
            break;
        case 'KeyT':        // Turn textures on/off
            toggleTextures();
            break;
        case 'KeyL':        // Turn lightning on/off
            toggleLightning();
            break;
        case 'Space':       // Pause/Continue simulation
            togglePause();
            break;
    }
}
document.addEventListener('keydown', (e) => inputHandler(e));

/**
 * Enables or disables the use of textures.
 */
export function toggleTextures() {
    if (textureFlag) {
        textureFlag = false;
        everything.forEach(function (planet) {
            planet.instance.material = planet.basic;
        });
    } else {
        textureFlag = true;
        everything.forEach(function (planet) {
            planet.instance.material = planet.material;
        });
    }
}

/**
 * Enables or disables the use of lightning.
 */
export function toggleLightning() {
    if (lightningFlag) {
        lightningFlag = false;
        sun.light.intensity = 0;
    } else {
        lightningFlag = true;
        sun.light.intensity = sun.lightIntensity;
    }
}

/**
 * Pauses or continues the simulation.
 */
export function togglePause() {
    pause = !pause;
}

/**
 * Updates the Three.js renderer, when the browser window size changes.
 */
export function onResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener("resize", onResize);

//export default {animate, inputHandler, toggleTextures, toggleLightning, togglePause, onResize}


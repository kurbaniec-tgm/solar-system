import * as wasm from "solar-system";
import * as THREE from "three";
import * as LOADER from "three-obj-loader"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {Vector3} from "three";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";
import {Euler} from "three";

// Initialize WebAssembly
const simulation = new wasm.Simulation();
console.log("Radiant: " + simulation.earth_rotation(1.0));

// Three.js initialization
const clock = new THREE.Clock();
const fullRotation = 2*Math.PI;
const container = document.getElementById( 'container' );
const stats = new Stats();
container.appendChild( stats.dom );
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
container.appendChild( renderer.domElement );
const scene = new THREE.Scene();

scene.background = new THREE.Color( 0xbfe3dd );
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000000 );
// Note: x is forward/backward, z is left/right, y is top/bottom
camera.position.set( -15000, 7000, -3300 );
camera.rotation.set(-2.2578094173636574, -1.004615448774449, -2.3419978296978265, "XYZ");
//camera.position.set(0, 0, 0);
const controls = new OrbitControls( camera, renderer.domElement );
controls.keys = {
    LEFT: 65, //left arrow
    UP: 87, // up arrow
    RIGHT: 68, // right arrow
    BOTTOM: 83 // down arrow
};
//let controls = new FirstPersonControls( camera, renderer.domElement );
//controls.target.set( 0, 0.5, 0 );
// controls.enablePan = false;
scene.add( new THREE.AmbientLight( 0x404040 ) );
const pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.copy( camera.position );
scene.add( pointLight );

// KeyListener
const movement = [false, false, false, false];

const textureLoader = new THREE.TextureLoader();

const sun = new (function() {
    this.radius = 3477.55;
    this.texture = textureLoader.load("resources/sun.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    this.ownRotation = function (delta) {
        return simulation.sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    this.instance.position.set(0, 0, 0);
    scene.add(this.instance);
})();

// Define planets that orbit the sun
const planets = [];
// EARTH
const earth = new (function() {
    this.radius = 310.855;
    this.texture = textureLoader.load("resources/earth.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0x00a2ff } );
    this.ownRotation = function (delta) {
        return simulation.earth_rotation(delta);
    };
    this.sunDistance = 7960.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.earth_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    this.instance.position.set(0, 0, 10.00);
    planets.push(this);
})();

const moon = new (function() {
    this.radius = 347.755;
    this.texture = textureLoader.load("resources/moon.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    this.ownRotation = function (delta) {
        return simulation.sun_rotation(delta);
    };
    this.earthDistance = 796.00; // 149.600.000km
    this.theta = 0;
    this.earthRotation = function (delta) {
        return 2 * simulation.earth_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    this.instance.position.set(0, 0, 1000);
    scene.add(this.instance);
})();

const mars = new (function() {
    this.radius = 250.855;
    this.texture = textureLoader.load("resources/mars.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0x00a2ff } );
    this.ownRotation = function (delta) {
        return simulation.mars_rotation(delta);
    };
    this.sunDistance = 10960.00; // 149.600.000km
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.mars_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    this.instance.position.set(0, 0, 10.00);
    planets.push(this);
})();

// Add all planets to the scene
planets.forEach(function (planet) {
    scene.add(planet.instance);
});

animate();

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};

function animate() {
    requestAnimationFrame( animate );
    // Get elapsed time
    const delta = clock.getDelta();
    // Perform operations on all planets
    //moon.theta += moon.earthRotation(delta);

    /**moon.theta += 2 * Math.PI / 1000 ;
    let x, z;
    x = moon.earthDistance;
    z = 0;
    x = x * Math.cos(moon.theta) - z * Math.sin(moon.theta);
    z = x * Math.sin(moon.theta) + z * Math.cos(moon.theta);
    moon.instance.position.x = earth.instance.position.x + x;
    moon.instance.position.z = earth.instance.position.z + z;*/

    moon.theta += simulation.earth_rotation(delta);
    moon.instance.position.x = earth.instance.position.x + moon.earthDistance * Math.cos(moon.theta);
    moon.instance.position.z = earth.instance.position.z + moon.earthDistance * Math.sin(moon.theta);
    //moon.instance.position.x = earth.instance.position.x + moon.earthDistance * Math.cos(moon.theta);
    //moon.instance.position.z = earth.instance.position.z + moon.earthDistance * Math.sin(moon.theta);

    sun.instance.rotateY(sun.ownRotation(delta));

    planets.forEach(function (planet) {
        planet.instance.rotateY(planet.ownRotation(delta));
        planet.theta += planet.sunRotation(delta);
        if (planet.theta > fullRotation) {
            planet.theta -= fullRotation;
        }
        planet.instance.position.x = planet.sunDistance * Math.cos(planet.theta);
        planet.instance.position.z = planet.sunDistance * Math.sin(planet.theta);
    });

    /**
    if (movement[0]) {
        camera.position.x = camera.position.x + 100;
    } else if (movement[1]) {
        camera.position.x = camera.position.x - 100;
    } else if (movement[2]) {
        camera.position.z = camera.position.z - 100;
    } else if (movement[3]) {
        camera.position.z = camera.position.z + 100;
    }*/
    controls.update(delta);
    camera.clearViewOffset();
    //console.log("new: " + JSON.stringify(newCam.position));
    console.log("old: " + JSON.stringify(camera.position));
    stats.update();

    renderer.render( scene, camera );
}

/**
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'KeyW':
            movement[0] = true;
            break;
        case 'KeyS':
            movement[1] = true;
            break;
        case 'KeyA':
            movement[2] = true;
            break;
        case 'KeyD':
            movement[3] = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'KeyW':
            movement[0] = false;
            break;
        case 'KeyS':
            movement[1] = false;
            break;
        case 'KeyA':
            movement[2] = false;
            break;
        case 'KeyD':
            movement[3] = false;
            break;
    }
});*/

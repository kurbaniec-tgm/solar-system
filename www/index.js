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
//camera.position.set(0, 0, 0);
let controls = new OrbitControls( camera, renderer.domElement );
//controls.target.set( 0, 0.5, 0 );
// controls.enablePan = false;
scene.add( new THREE.AmbientLight( 0x404040 ) );
const pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.copy( camera.position );
scene.add( pointLight );

// KeyListener
const movement = [false, false, false, false];

const textureLoader = new THREE.TextureLoader();
const sunT = textureLoader.load("resources/sun.jpg");
const sunG = new THREE.SphereGeometry( 3477.55, 32, 32 );
const sunM = new THREE.MeshBasicMaterial( { map: sunT} );
const sunB = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sun = new THREE.Mesh( sunG, sunM );
sun.position.set(0, 0, 0);
scene.add(sun);

// Define planets that orbit the sun
const planets = [];
// EARTH
//
const earth = new (function() {
    this.radius = 310.855;
    this.texture = textureLoader.load("resources/earth.jpg");
    this.geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
    this.basic = new THREE.MeshBasicMaterial( { color: 0x00a2ff } );
    this.ownRotation = function (delta) {
        return simulation.earth_rotation(delta);
    };
    this.sunDistance = 14960.00;
    this.theta = 0;
    this.sunRotation = function (delta) {
        return simulation.earth_sun_rotation(delta);
    };
    this.instance = new THREE.Mesh( this.geometry, this.material );
    this.instance.position.set(0, 0, 1000.00);
    planets.push(this);
})();

// Add all planets to the scene
planets.forEach(function (planet) {
    scene.add(planet.instance);
});

controls.update(1.0);
const newCam = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000000 );
newCam.position.copy(camera.position);
newCam.rotation.copy(camera.rotation);
controls = new PointerLockControls(newCam, renderer.domElement);
controls.connect();
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
    const delta = clock.getDelta();
    earth.instance.rotateY(earth.ownRotation(delta));
    theta += dTheta;
    if (theta > 2*Math.PI) {
        theta -= 2*Math.PI;
    }
    earth.instance.position.x = r * Math.cos(theta);
    earth.instance.position.z = r * Math.sin(theta);
    //console.log(JSON.stringify(earth.instance.position));
    //console.log(JSON.stringify(earth.position));
     */
    if (movement[0]) {
        camera.position.x = camera.position.x + 100;
    } else if (movement[1]) {
        camera.position.x = camera.position.x - 100;
    } else if (movement[2]) {
        camera.position.z = camera.position.z - 100;
    } else if (movement[3]) {
        camera.position.z = camera.position.z + 100;
    }
    camera.clearViewOffset();
    console.log(JSON.stringify(camera.position));

    stats.update();

    renderer.render( scene, camera );
}

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
});

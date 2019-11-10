import * as wasm from "solar-system";
import * as THREE from "three";
import * as LOADER from "three-obj-loader"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Initialize WebAssembly
const simulation = new wasm.Simulation();
console.log("Radiant: " + simulation.earth_rotation(1.0));

// Three.js initialization
const clock = new THREE.Clock();
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
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
// Note: x is forward/backward, z is left/right, y is top/bottom
camera.position.set( -50, 0, 0 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.enablePan = false;
scene.add( new THREE.AmbientLight( 0x404040 ) );
const pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.copy( camera.position );
scene.add( pointLight );

const textureLoader = new THREE.TextureLoader();
const sunT = textureLoader.load("resources/sun.jpg");
const sunG = new THREE.SphereGeometry( 10.0, 32, 32 );
const sunM = new THREE.MeshBasicMaterial( { map: sunT} );
const sunB = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sun = new THREE.Mesh( sunG, sunM );
sun.position.set(0, 0, 0);
scene.add(sun);

// TODO Streamline planets
const earthT = textureLoader.load("resources/earth.jpg");
const earthG = new THREE.SphereGeometry( 1.0, 32, 32 );
const earthM = new THREE.MeshBasicMaterial( { map: earthT} );
const earthB = new THREE.MeshBasicMaterial( { color: 0x00a2ff } );
const earth = new THREE.Mesh( earthG, earthM );
earth.baum = "test";
console.log(earth.baum);
earth.position.set(0, 0, 20);
scene.add(earth);

const r = 20;
// TODO Modulo Thetha at some point
let theta = 0;
const dTheta = 2 * Math.PI / 1000;

animate();

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};

function animate() {
    requestAnimationFrame( animate );
    //earth.rotateY(0.05);
    const delta = clock.getDelta();
    earth.rotateY(simulation.earth_rotation(delta));
    theta += dTheta;
    earth.position.x = r * Math.cos(theta);
    earth.position.z = r * Math.sin(theta);

    //console.log(JSON.stringify(earth.position));

    controls.update(delta);
    stats.update();
    renderer.render( scene, camera );
}

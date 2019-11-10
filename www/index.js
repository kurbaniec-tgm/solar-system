import * as wasm from "solar-system";
import * as THREE from "three";
import * as LOADER from "three-obj-loader"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// wasm.greet();

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
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.enablePan = false;
scene.add( new THREE.AmbientLight( 0x404040 ) );
const pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.copy( camera.position );
scene.add( pointLight );

const textureLoader = new THREE.TextureLoader();
const earthT = textureLoader.load("resources/earth.jpg");
const earthG = new THREE.SphereGeometry( 1.5, 32, 32 );
const earthM = new THREE.MeshBasicMaterial( { map: earthT} );
const earthB = new THREE.MeshBasicMaterial( { map: earthT} );
const earth = new THREE.Mesh( earthG, earthM );
scene.add( earth );
animate();

window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};

function animate() {
    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    controls.update(delta);
    stats.update();
    renderer.render( scene, camera );
}

/**
 * Example from: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_keyframes.html
 */
/**
var scene, camera, pointLight, stats;
var renderer, mixer, controls;
var clock = new THREE.Clock();
var container = document.getElementById( 'container' );
stats = new Stats();
container.appendChild( stats.dom );
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
container.appendChild( renderer.domElement );
scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );
camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );
controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.enablePan = false;
scene.add( new THREE.AmbientLight( 0x404040 ) );
pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.copy( camera.position );
scene.add( pointLight );
// envmap
var path = 'resources/park2/';
var format = '.jpg';
var envMap = new THREE.CubeTextureLoader().load( [
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format
] );
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'draco/' );
var loader = new GLTFLoader();
loader.setDRACOLoader( dracoLoader );

loader.load( 'resources/LittlestTokyo.glb', function ( gltf ) {
    const textureLoader = new THREE.TextureLoader();
    const earthT = textureLoader.load("resources/earth.jpg");
    const earthG = new THREE.SphereGeometry( 1.5, 32, 32 );
    const earthM = new THREE.MeshBasicMaterial( { map: earthT} );
    const earth = new THREE.Mesh( earthG, earthM );
    scene.add( earth );
    var model = gltf.scene;
    model.position.set( 1, 1, 0 );
    model.scale.set( 0.01, 0.01, 0.01 );
    model.traverse( function ( child ) {
        if ( child.isMesh ) child.material.envMap = envMap;
    } );
    scene.add( model );
    mixer = new THREE.AnimationMixer( model );
    mixer.clipAction( gltf.animations[ 0 ] ).play();
    animate();
}, undefined, function ( e ) {
    console.error( e );
} );
window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};
function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    mixer.update( delta );
    controls.update( delta );
    stats.update();
    renderer.render( scene, camera );
}*/
/**
  *@author arnould Jean-Michel
  */

import * as THREE from './modules/build/three.module.js';
import Stats from './modules/Stats.js';
import { OrbitControls } from './modules/OrbitControls.js';
import { SVGLoader } from './modules/SVGLoader.js';
import { STLExporter } from './modules/STLExporter.js';

/**
 * Initialisation de l'affichage
 */
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xb0b0b0);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
scene.add(camera);

camera.position.set(0,160,200);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

var container = document.getElementById('contain');
container.appendChild( renderer.domElement );
var controls = new OrbitControls(camera);

var axes = new THREE.AxesHelper(100);
scene.add(axes);


// Creation d'une boite de stats
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.bottom = '0px';
stats.domElement.style.zIndex = 100;
container.appendChild( stats.domElement );

animate();


// Gestion de la boucle animation
function animate()
{
  requestAnimationFrame( animate );
	render();
  controls.update();
  stats.update();
}

function render()
{
	renderer.render( scene, camera );
}

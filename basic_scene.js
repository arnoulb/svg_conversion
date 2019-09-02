/**
  *@author arnould Jean-Michel
  */

import * as THREE from './build/three.module.js';
import Stats from './Stats.js';
import { OrbitControls } from './OrbitControls.js';
import { SVGLoader } from './SVGLoader.js';
import { STLExporter } from './STLExporter.js';


/**
 * Initialisation de l'affichage
 */
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xb0b0b0);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
scene.add(camera);

camera.position.set(0,160,800);
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

// Chargement de l'image SVG
var loader = new SVGLoader();
loader.load("./apple.svg",
    function(data) {
        var paths = data.paths;
        var group = new THREE.Group();
        for (var i = 0; i < paths.length; i++) {
          var path = paths[i];
          var material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false });

          var shapes = path.toShapes( true );

			       for ( var j = 0; j < shapes.length; j ++ ) {
               var shape = shapes[ j ];
				       var geometry = new THREE.ShapeBufferGeometry( shape );
				       var mesh = new THREE.Mesh( geometry, material );
				       group.add( mesh );
             }
        }
        scene.add(group);
        var exporter = new STLExporter();

        var result = exporter.parse(group, {binary :true});
        saveArrayBuffer(result, "obj.stl");
    },

    function (xhr) {

    },
    // retour d'erreur
    function(err) {
        console.log("Error");
    }
);

// Gestion de la boucle animation
function animate()
{
  requestAnimationFrame( animate );
	render();
  controls.update();
  stats.update();
}

var link = document.createElement("a");
document.body.appendChild(link);

/**
  * Permet de sauvegarder le fichier .stl
  * @param {blob} blob le contenu du fichier
  * @param {string} name le nom du fichier enregistré
  */
function save(blob, name){
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}

function saveArrayBuffer(buffer, name) {
  save(new Blob([buffer], {type: 'application/octet-stream'}), name);
}

function render()
{
	renderer.render( scene, camera );
}

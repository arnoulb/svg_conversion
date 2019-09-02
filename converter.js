/**
  *@author arnould Jean-Michel
  */

import * as THREE from './modules/build/three.module.js';
import { SVGLoader } from './modules/SVGLoader.js';
import { STLExporter } from './modules/STLExporter.js';

var button = document.getElementById("export");

button.onclick = convert;
// Chargement de l'image SVG
function convert() {
  var loader = new SVGLoader();
  var dirpath = "apple.svg";

  loader.load(dirpath,
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
          // Exportation de l'image au format .STL
          var exporter = new STLExporter();
          var result = exporter.parse(group, {binary :true});
          saveArrayBuffer(result, "obj.stl");
      },
      // Fonction appelee lors du chargement
      function (xhr) {

      },
      // Fonction appelee en cas d'erreur
      function(err) {
          console.log("Error");
      }
  );
}
// Creation d'un lien permettant de telecharger l'image

/**
  * Fonction qui permet de sauvegarder l'image .STL
  * @param {blob} blob le contenu de l'image sous forme binaire
  * @param {text} name le nom que l'image portera lors du telechargement
  */
function save(blob, name){
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}

/**
  * Fonction qui permet de sauvegarder l'image .STL
  * @param {text} buffer le contenu de l'image sous forme d'un buffer
  * @param {text} name le nom que l'image portera lors du telechargement
  */
function saveArrayBuffer(buffer, name) {
  save(new Blob([buffer], {type: 'application/octet-stream'}), name);
}

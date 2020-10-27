import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
import * as STLLoader from '/jsm/loaders/STLLoader.js'
function init() {

    var stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = 250;
    camera.position.y = 100;
    camera.position.z = 250;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(250, 50, 250);
    scene.add(spotLight);
    

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    // call the render function
    var step = 0;


    // setup the control gui
    var controls = new function () {
        // we need the first child, since it's a multimaterial


    };

    var group;


    // model from http://www.thingiverse.com/thing:69709
    var loader = new STLLoader.STLLoader(); 
    var group = new THREE.Object3D();
    loader.load("../stl-files/deneme.stl", function (geometry) {
        console.log(geometry);
        var mat = new THREE.MeshLambertMaterial({color: 0xff77ff});
        group = new THREE.Mesh(geometry, mat);
        group.rotation.x = -0.5 * Math.PI;
        group.scale.set(0.6, 0.6, 0.6);
        scene.add(group);
    });


    render();


    function render() {
        stats.update();

        if (group) {
            group.rotation.z += 0.017;
            // group.rotation.x+=0.006;
        }

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }

    function initStats() {

        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);

        return stats;
    }
}
window.onload = init;
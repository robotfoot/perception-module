var playerBox, camera, scene;
var incrementalRotation = Math.PI/50;
var max_level_boxes = 5;

var otherPlayerMeshes;
var otherPlayerBullets;

function initSky(){
  var skyGeo = new THREE.SphereGeometry(100, 25, 25);
  var skyMaterial = new THREE.MeshLambertMaterial({color: 0xBBBBEE});
  //var skyTexture = THREE.ImageUtils.loadTexture( "/images/sky.jpg" );
  var sky = new Physijs.SphereMesh( skyGeo, skyMaterial, 0);
  sky.material.side = THREE.BackSide;
  scene.add(sky);
}

function initLevel(){
  var islandGeo = new THREE.CylinderGeometry(40, 40, 1);
  //var islandMaterial = new THREE.MeshLambertMaterial({color: 0x999999});
  var islandMaterial = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/grass.jpg')});
  var island = new Physijs.CylinderMesh( islandGeo, islandMaterial, 0);
  island.position = new THREE.Vector3(0,0,0);
  scene.add(island);
  return island;
}

function createLevelBoxes(){
  for(i=0; i < max_level_boxes; i++){
    var boxGeo = new THREE.CylinderGeometry(2,2,20);
    var boxMaterial = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/pillar.jpg')});
    var box = new Physijs.BoxMesh(boxGeo, boxMaterial, 20);
    box.position.x = Math.floor(Math.random()*39);
    box.position.y = 20;
    box.position.z = Math.floor(Math.random()*39);
    scene.add(box);
  }
}

function dropPlayerBox(){
  var boxGeo = new THREE.BoxGeometry(5,5,5);
  var boxMaterial = new THREE.MeshLambertMaterial({color: getRandomColor()});
  var box = new Physijs.BoxMesh(boxGeo, boxMaterial);
  box.position.x = 0;
  box.position.y = 3;
  box.position.z = 0;
  scene.add(box);
  return box;
}

function addLightSource(){
  var light = new THREE.AmbientLight( 0xCCCCCC); // soft white light
  scene.add( light );
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateLevelState(){
  if(playerBox){
    camera.position.set(playerBox.position.x, playerBox.position.y, playerBox.position.z);
    camera.rotation.set(playerBox.rotation.x, playerBox.rotation.y, playerBox.rotation.z);
  }
}

function fire(){
  var bulletVelocityMultiplier = 100;
  var bulletGeo = new THREE.BoxGeometry(1,1,1);
  var bulletMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
  var bullet = new Physijs.BoxMesh(bulletGeo, bulletMaterial);
  //bullet.position.x = playerBox.position.x;
  //bullet.position.y = playerBox.position.y;
  //bullet.position.z = playerBox.position.z -5;
  inFrontLocal = new THREE.Vector3(0,0,-1);
  inFrontGlobal = playerBox.localToWorld(new THREE.Vector3(0,0,-1));
  bullet.position.set(inFrontGlobal.getComponent(0), inFrontGlobal.getComponent(1), inFrontGlobal.getComponent(2));
  scene.add(bullet);

  rotation = playerBox.getWorldQuaternion();
  bulletVelocity = inFrontLocal.applyQuaternion(rotation);
  bulletVelocity = bulletVelocity.multiplyScalar(bulletVelocityMultiplier);
  bullet.setLinearVelocity(bulletVelocity);
  bullet.__dirtyPosition = true;

  setTimeout(function(){ scene.remove(bullet);}, 3000);
}

function onKeyDown(event){
  switch(event.key){
    case "ArrowUp":
      var vector = new THREE.Vector3(0,0,-1);
      camera.translateOnAxis(vector, 1);
      //playerBox.__dirtyPosition = true;
      break;
    case "ArrowDown":
      var vector = new THREE.Vector3(0,0,1);
      camera.translateOnAxis(vector, 1);
      //playerBox.__dirtyPosition = true;
      break;
    case "ArrowLeft":
      camera.rotateY(incrementalRotation);
      //playerBox.__dirtyRotation = true;
      break;
    case "ArrowRight":
      camera.rotateY(-incrementalRotation);
      //playerBox.__dirtyRotation = true;
      break;
    case " ":
      camera.setLinearVelocity(new THREE.Vector3(0, 5, 0));
      //playerBox.__dirtyPosition = true;
      break;
    case "q":
      fire();
      break;
  }
}

function start(){
  'use strict';

  Physijs.scripts.worker = '/javascripts/physijs_worker.js';
  Physijs.scripts.ammo = '/javascripts/ammo.js';

  scene = new Physijs.Scene({antialias: true});
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );

  var renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setSize( window.innerWidth - 200, window.innerHeight - 200);
  document.getElementById( 'viewport' ).appendChild( renderer.domElement );

  //initSky(scene);
  var level = initLevel();
  //playerBox = dropPlayerBox();
  var lightSource = addLightSource();
  createLevelBoxes();

  camera.position.set( 60, 50, 60 );
  camera.lookAt( scene.position );
  scene.add( camera );

  var controls = new THREE.OrbitControls(camera, document, renderer.domElement);

  requestAnimationFrame( render );

  function render() {
    scene.simulate();
    //sendLevelState();
    updateLevelState();
    renderer.render( scene, camera );
    requestAnimationFrame( render );
  }
  render();

  document.addEventListener("keydown", onKeyDown, false);
  //document.addEventListener("keyup", onKeyUp, false);
}

function sendLevelState(){
  //sendPlayerMesh();
  //sendBulletMeshes();
}

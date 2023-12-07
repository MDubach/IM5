import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

// renderer settings
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerHeight, window.innerHeight);

// set camera position and render scene
camera.position.setZ(30);
renderer.render(scene, camera);

// add light and grid helper to scene
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// add gridHelper if needed
// const gridHelper = new THREE.GridHelper(200,200);
// scene.add(gridHelper);

// Orbitcontrols for movement
const controls = new OrbitControls(camera, renderer.domElement);

// liltecca video setup
const lilteccaGeometry = new THREE.SphereGeometry(13,32,32);
const lilteccaVideo = document.getElementById("lilteccavideo");
const lilteccaTexture = new THREE.VideoTexture(lilteccaVideo);
const lilteccaMaterial = new THREE.MeshBasicMaterial({ map: lilteccaTexture });
const lilteccaSphere = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
lilteccaSphere.name = "lilteccaSphere";
lilteccaSphere.videoname = "Lil Tecca - 500lbs";

// add liltecca video to scene
scene.background = lilteccaTexture;
scene.add(lilteccaSphere);

// yeat video setup
const yeatGeometry = new THREE.DodecahedronGeometry(13,0);
const yeatVideo = document.getElementById("yeatvideo");
const yeatTexture = new THREE.VideoTexture(yeatVideo);
const yeatMaterial = new THREE.MeshBasicMaterial({ map: yeatTexture });
const yeatTorus = new THREE.Mesh(yeatGeometry, yeatMaterial);
yeatTorus.position.set(-30, 0, 0);
yeatTorus.name = "yeatTorus";
yeatTorus.videoname = "Yeat - bigger then everything";

// add yeat video to scene
scene.add(yeatTorus);

// travis video setup
const travisGeometry = new THREE.IcosahedronGeometry(13,0);
const travisVideo = document.getElementById("travisvideo");
const travisTexture = new THREE.VideoTexture(travisVideo);
const travisMaterial = new THREE.MeshBasicMaterial({ map: travisTexture });
const travisIcosahedron = new THREE.Mesh(travisGeometry, travisMaterial);
travisIcosahedron.position.set(30,0,0);
travisIcosahedron.name = "travisIcosahedron";
travisIcosahedron.videoname = "Travis Scott - Escape Plan";

// add travis video to scene
scene.add(travisIcosahedron);

// create sphere, torus and iconsahedron for musicvideos
const sphere01 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere02 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere03 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere04 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere05 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere06 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const torus01 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus02 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus03 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus04 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus05 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus06 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const iconsahedron01 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron02 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron03 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron04 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron05 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron06 = new THREE.Mesh(travisGeometry, travisMaterial);


function setPosition3DElementsForVideos() {
  sphere01.position.set(0,40,0);
  sphere02.position.set(0,0,40);
  sphere03.position.set(0,0,-40);
  sphere04.position.set(0,-40,0);
  sphere05.position.set(40,0,0);
  sphere06.position.set(-40,0,0);
  torus01.position.set(-30,40,0);
  torus02.position.set(-30,0,40);
  torus03.position.set(-30,0,-40);
  torus04.position.set(-30,-40,0);
  torus05.position.set(10,0,0);
  torus06.position.set(-70,0,0);
  iconsahedron01.position.set(30,40,0);
  iconsahedron02.position.set(30,0,40);
  iconsahedron03.position.set(30,0,-40);
  iconsahedron04.position.set(30,-40,0);
  iconsahedron05.position.set(70,0,0);
  iconsahedron06.position.set(-10,0,0);
}

setPosition3DElementsForVideos();

// selected mesh and song
let selectedMesh = lilteccaSphere;

// song is playing boolean
let isPlaying = false;

// add sphere to scene
function addSphere() {
    const geometry = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 'red' });
    const sphere = new THREE.Mesh( geometry, material );

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    sphere.position.set(x,y,z);
    scene.add(sphere);
}

// add 200 spheres to scene => example how to add a lot of objects to scene
Array(200).fill().forEach(addSphere);

// spacebar pause and play
document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    playOrStopVideo();
  }
}

// raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// onMouseClick Event => function is not used.
function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const meshes = [lilteccaSphere, yeatTorus, travisIcosahedron];
  const intersects = raycaster.intersectObjects(meshes);

  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    // could add function to change stuff on website based on mouse click event.
    console.log(`Mesh clicked: ${clickedMesh.name}`);
  }
}

window.addEventListener('click', onMouseClick);

// add liltecca 3d Objects
function lilteccaAdd() {
  scene.remove(yeatTorus, travisIcosahedron);
  scene.add(sphere01, sphere02, sphere03, sphere04, sphere05, sphere06);
}

// add travis 3d Objects
function travisAdd() {
  scene.remove(lilteccaSphere, yeatTorus);
  scene.add(iconsahedron01, iconsahedron02, iconsahedron03, iconsahedron04, iconsahedron05, iconsahedron06);
}

// add yeat 3d Objects
function yeatAdd() {
  scene.remove(lilteccaSphere, travisIcosahedron);
  scene.add(torus01, torus02, torus03, torus04, torus05, torus06);
}

// animate movement for 3d objects
function animate() {
  requestAnimationFrame(animate);

  lilteccaSphere.rotation.x += 0.001;
  lilteccaSphere.rotation.y += 0.008;
  lilteccaSphere.rotation.z += 0.002;

  yeatTorus.rotation.x += 0.01;
  yeatTorus.rotation.y += 0.005;
  yeatTorus.rotation.z += 0.01;

  travisIcosahedron.rotation.x += 0.01;
  travisIcosahedron.rotation.y += 0.005;
  travisIcosahedron.rotation.z += 0.001;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// animation for 3d elements
let countAnimate = 0;

let lilteccaAnimationRequest;
function lilteccaAnimate() {
  lilteccaAnimationRequest = requestAnimationFrame(lilteccaAnimate);

  countAnimate++;
  console.log(countAnimate);

  if (countAnimate > 500) {
    countAnimate = 0;
  } else if (countAnimate > 250) {

    sphere01.position.y -= 0.1;
    sphere02.position.z -= 0.1;
    sphere03.position.z += 0.1;
    sphere04.position.y += 0.1;
    sphere05.position.x -= 0.1;
    sphere06.position.x += 0.1;

    sphere01.rotation.y -= 0.1;
    sphere02.rotation.y -= 0.1;
    sphere03.rotation.y += 0.1;
    sphere04.rotation.y += 0.1;
    sphere05.rotation.y -= 0.1;
    sphere06.rotation.y += 0.1;

  } else {

    sphere01.position.y += 0.1;
    sphere02.position.z += 0.1;
    sphere03.position.z -= 0.1;
    sphere04.position.y -= 0.1;
    sphere05.position.x += 0.1;
    sphere06.position.x -= 0.1;

    sphere01.rotation.y += 0.1;
    sphere02.rotation.y += 0.1;
    sphere03.rotation.y -= 0.1;
    sphere04.rotation.y -= 0.1;
    sphere05.rotation.y += 0.1;
    sphere06.rotation.y -= 0.1;

  }

  controls.update();
  renderer.render(scene, camera);
}

let yeatAnimationRequest;
function yeatAnimate() {
  yeatAnimationRequest = requestAnimationFrame(yeatAnimate);

  countAnimate ++;
  console.log(countAnimate);

  if(countAnimate > 1000) {
    countAnimate = 0;
  } else if (countAnimate > 500) {
    torus01.position.y += 0.5;
    torus02.position.z += 0.5;
    torus03.position.z -= 0.5;
    torus04.position.y -= 0.5;
    torus05.position.x += 0.5;
    torus06.position.x -= 0.5;

    torus01.scale.x += 0.01;
    torus01.scale.z += 0.01;
    torus01.scale.y += 0.01;
    torus02.scale.x += 0.01;
    torus02.scale.z += 0.01;
    torus02.scale.y += 0.01;
    torus03.scale.x += 0.01;
    torus03.scale.z += 0.01;
    torus03.scale.y += 0.01;
    torus04.scale.x += 0.01;
    torus04.scale.z += 0.01;
    torus04.scale.y += 0.01;
    torus05.scale.x += 0.01;
    torus05.scale.z += 0.01;
    torus05.scale.y += 0.01;
    torus06.scale.x += 0.01;
    torus06.scale.z += 0.01;
    torus06.scale.y += 0.01;

    torus01.rotation.y += 0.05;
    torus02.rotation.z += 0.05;
    torus03.rotation.z -= 0.05;
    torus04.rotation.y -= 0.05;
    torus05.rotation.x += 0.05;
    torus06.rotation.x -= 0.05;

  } else {

    torus01.position.y -= 0.5;
    torus02.position.z -= 0.5;
    torus03.position.z += 0.5;
    torus04.position.y += 0.5;
    torus05.position.x -= 0.5;
    torus06.position.x += 0.5;

    torus01.scale.x -= 0.01;
    torus01.scale.z -= 0.01;
    torus01.scale.y -= 0.01;
    torus02.scale.x -= 0.01;
    torus02.scale.z -= 0.01;
    torus02.scale.y -= 0.01;
    torus03.scale.x -= 0.01;
    torus03.scale.z -= 0.01;
    torus03.scale.y -= 0.01;
    torus04.scale.x -= 0.01;
    torus04.scale.z -= 0.01;
    torus04.scale.y -= 0.01;
    torus05.scale.x -= 0.01;
    torus05.scale.z -= 0.01;
    torus05.scale.y -= 0.01;
    torus06.scale.x -= 0.01;
    torus06.scale.z -= 0.01;
    torus06.scale.y -= 0.01;

    torus01.rotation.y -= 0.05;
    torus02.rotation.z -= 0.05;
    torus03.rotation.z += 0.05;
    torus04.rotation.y += 0.05;
    torus05.rotation.x -= 0.05;
    torus06.rotation.x += 0.05;

  }

  controls.update();
  renderer.render(scene, camera);
}

let travisAnimationRequest;
function travisAnimate() {
  travisAnimationRequest = requestAnimationFrame(travisAnimate);

  countAnimate++;

  if (countAnimate > 200) {
    countAnimate = 0;
  } else if (countAnimate > 100) {

    iconsahedron01.rotation.y += 0.1;
    iconsahedron02.rotation.z += 0.1;
    iconsahedron03.rotation.z -= 0.1;
    iconsahedron04.rotation.y -= 0.1;
    iconsahedron05.rotation.x += 0.1;
    iconsahedron06.rotation.x -= 0.1;

    iconsahedron01.position.y += 5;
    iconsahedron02.position.z += 5;
    iconsahedron03.position.z -= 5;
    iconsahedron04.position.y -= 5;
    iconsahedron05.position.x += 5;
    iconsahedron06.position.x -= 5;

    iconsahedron01.scale.x -= 0.05;
    iconsahedron01.scale.z -= 0.05;
    iconsahedron01.scale.y -= 0.05;
    iconsahedron02.scale.x -= 0.05;
    iconsahedron02.scale.z -= 0.05;
    iconsahedron02.scale.y -= 0.05;
    iconsahedron03.scale.x -= 0.05;
    iconsahedron03.scale.z -= 0.05;
    iconsahedron03.scale.y -= 0.05;
    iconsahedron04.scale.x -= 0.05;
    iconsahedron04.scale.z -= 0.05;
    iconsahedron04.scale.y -= 0.05;
    iconsahedron05.scale.x -= 0.05;
    iconsahedron05.scale.z -= 0.05;
    iconsahedron05.scale.y -= 0.05;
    iconsahedron06.scale.x -= 0.05;
    iconsahedron06.scale.z -= 0.05;
    iconsahedron06.scale.y -= 0.05;

  } else {

    iconsahedron01.rotation.y += 0.1;
    iconsahedron02.rotation.z += 0.1;
    iconsahedron03.rotation.z -= 0.1;
    iconsahedron04.rotation.y -= 0.1;
    iconsahedron05.rotation.x += 0.1;
    iconsahedron06.rotation.x -= 0.1;

    iconsahedron01.position.y -= 5;
    iconsahedron02.position.z -= 5;
    iconsahedron03.position.z += 5;
    iconsahedron04.position.y += 5;
    iconsahedron05.position.x -= 5;
    iconsahedron06.position.x += 5;

    iconsahedron01.scale.x += 0.05;
    iconsahedron01.scale.z += 0.05;
    iconsahedron01.scale.y += 0.05;
    iconsahedron02.scale.x += 0.05;
    iconsahedron02.scale.z += 0.05;
    iconsahedron02.scale.y += 0.05;
    iconsahedron03.scale.x += 0.05;
    iconsahedron03.scale.z += 0.05;
    iconsahedron03.scale.y += 0.05;
    iconsahedron04.scale.x += 0.05;
    iconsahedron04.scale.z += 0.05;
    iconsahedron04.scale.y += 0.05;
    iconsahedron05.scale.x += 0.05;
    iconsahedron05.scale.z += 0.05;
    iconsahedron05.scale.y += 0.05;
    iconsahedron06.scale.x += 0.05;
    iconsahedron06.scale.z += 0.05;
    iconsahedron06.scale.y += 0.05;
  }

  controls.update();
  renderer.render(scene, camera);
}

// play settings buttons
const resetButton = document.getElementById("resetButton");
const playButton = document.getElementById("playButton");
const nextVideoButton = document.getElementById("nextVideoButton");

// reset all videos and scene
resetButton.addEventListener("click", function() {
  isPlaying = false;
  playButton.innerHTML = "play";
  setPosition3DElementsForVideos();
  resetScene();
  cancelAnimationFunctions();
  lilteccaVideo.load();
  yeatVideo.load();
  travisVideo.load();
});

// playbutton play and stop video
playButton.addEventListener("click", function() {
  playOrStopVideo();
});

// show next video and reset scene
nextVideoButton.addEventListener("click", function() {

  lilteccaVideo.pause();
  yeatVideo.pause();
  travisVideo.pause();
  resetScene();
  cancelAnimationFunctions();

  if (selectedMesh == lilteccaSphere) {
    document.getElementById('infoText').innerHTML = travisIcosahedron.videoname;
    selectedMesh = travisIcosahedron;
    scene.background = travisTexture;
  } else if (selectedMesh == travisIcosahedron) {
    document.getElementById('infoText').innerHTML = yeatTorus.videoname;
    selectedMesh = yeatTorus;
    scene.background = yeatTexture;
  } else if (selectedMesh == yeatTorus) {
    document.getElementById('infoText').innerHTML = lilteccaSphere.videoname;
    selectedMesh = lilteccaSphere;
    scene.background = lilteccaTexture;
  }

  isPlaying = false;
  playButton.innerHTML = "play";
});

// cancel animation functions
function cancelAnimationFunctions () {
  cancelAnimationFrame(lilteccaAnimationRequest);
  cancelAnimationFrame(travisAnimationRequest);
  cancelAnimationFrame(yeatAnimationRequest);
  countAnimate = 0;
}

// reset scene
function resetScene() {
  scene.remove(travisIcosahedron, yeatTorus, lilteccaSphere);
  scene.add(travisIcosahedron, yeatTorus, lilteccaSphere);
  scene.remove(sphere01, sphere02, sphere03, sphere04, sphere05, sphere06);
  scene.remove(torus01, torus02, torus03, torus04, torus05, torus06);
  scene.remove(iconsahedron01, iconsahedron02, iconsahedron03, iconsahedron04, iconsahedron05, iconsahedron06);
}

// play or stop video
function playOrStopVideo() {

  animate();

  if (isPlaying) {
    lilteccaVideo.pause();
    yeatVideo.pause();
    travisVideo.pause();
    cancelAnimationFunctions();
    isPlaying = false;
    playButton.innerHTML = "play";
  } else {
    if (selectedMesh.name == 'lilteccaSphere') {
      document.getElementById('infoText').innerHTML = lilteccaSphere.videoname;
      lilteccaVideo.play();
      lilteccaAdd();
      lilteccaAnimate();
    } else if (selectedMesh.name == 'yeatTorus') {
      document.getElementById('infoText').innerHTML = yeatTorus.videoname;
      yeatVideo.play();
      yeatAdd();
      yeatAnimate();
    } else if (selectedMesh.name == 'travisIcosahedron') {
      document.getElementById('infoText').innerHTML = travisIcosahedron.videoname;
      travisVideo.play();
      travisAdd();
      travisAnimate();
    }
  
    isPlaying = true;
    playButton.innerHTML = "stop";
  }

}
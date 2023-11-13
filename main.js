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
camera.position.setZ(30);
renderer.render(scene, camera);

// add light and grid helper to scene
const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(ambientLight, gridHelper);

// liltecca video einbindung
const lilteccaGeometry = new THREE.SphereGeometry(13,32,32);
const lilteccaVideo = document.getElementById("lilteccavideo");
const lilteccaTexture = new THREE.VideoTexture(lilteccaVideo);
const lilteccaMaterial = new THREE.MeshBasicMaterial({ map: lilteccaTexture });
const lilteccaSphere = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
lilteccaSphere.name = "lilteccaSphere";
lilteccaSphere.videoname = "Lil Tecca - 500lbs";
console.log(lilteccaSphere);

// add liltecca video to scene
scene.background = lilteccaTexture;
scene.add(lilteccaSphere);

// yeat video einbindung
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


// travis video einbindung
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

// selected mesh and song
let selectedMesh = lilteccaSphere;

// sphere, torus and iconsahedron for musicvideos
const sphere01 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere02 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere03 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere04 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere05 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
const sphere06 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
sphere01.position.set(0,40,0);
sphere02.position.set(0,0,40);
sphere03.position.set(0,0,-40);
sphere04.position.set(0,-40,0);
sphere05.position.set(40,0,0);
sphere06.position.set(-40,0,0);
const torus01 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus02 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus03 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus04 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus05 = new THREE.Mesh(yeatGeometry, yeatMaterial);
const torus06 = new THREE.Mesh(yeatGeometry, yeatMaterial);
torus01.position.set(0,40,0);
torus02.position.set(0,0,40);
torus03.position.set(0,0,-40);
torus04.position.set(0,-40,0);
torus05.position.set(40,0,0);
torus06.position.set(-40,0,0);
const iconsahedron01 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron02 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron03 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron04 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron05 = new THREE.Mesh(travisGeometry, travisMaterial);
const iconsahedron06 = new THREE.Mesh(travisGeometry, travisMaterial);
iconsahedron01.position.set(0,40,0);
iconsahedron02.position.set(0,0,40);
iconsahedron03.position.set(0,0,-40);
iconsahedron04.position.set(0,-40,0);
iconsahedron05.position.set(40,0,0);
iconsahedron06.position.set(-40,0,0);

// song is playing boolean
let isPlaying = false;

// Orbitcontrols for movement
const controls = new OrbitControls(camera, renderer.domElement);

// add stars to scene
function addStar() {
    const geometry = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh( geometry, material );

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

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

function onMouseClick(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set the ray direction and origin based on the mouse position
  raycaster.setFromCamera(mouse, camera);

  // Create an array of the meshes you want to check for intersections
  const meshes = [lilteccaSphere, yeatTorus, travisIcosahedron];

  // Check for intersections with each mesh
  const intersects = raycaster.intersectObjects(meshes);

  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    onMeshClick(clickedMesh); // Call your custom function when a mesh is clicked
  }
}

window.addEventListener('click', onMouseClick);


function onMeshClick(mesh) {
  console.log(`Mesh clicked: ${mesh.name}`);
}

function lilteccaAdd() {
  scene.remove(yeatTorus, travisIcosahedron);
  //const sphere05 = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
  scene.add(sphere01, sphere02, sphere03, sphere04, sphere05, sphere06);
}

function travisAdd() {
  scene.remove(lilteccaSphere, yeatTorus);
  scene.add(iconsahedron01, iconsahedron02, iconsahedron03, iconsahedron04, iconsahedron05, iconsahedron06);
}

function yeatAdd() {
  scene.remove(lilteccaSphere, travisIcosahedron);
  scene.add(torus01, torus02, torus03, torus04, torus05, torus06);
}

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

function lilteccaAnimate() {
  requestAnimationFrame(lilteccaAnimate);
  controls.update();
  renderer.render(scene, camera);

}

function yeatAnimate() {
  requestAnimationFrame(yeatAnimate);
  controls.update();
  renderer.render(scene, camera);
}

function travisAnimate() {
  requestAnimationFrame(travisAnimate);
  controls.update();
  renderer.render(scene, camera);
}



// playsettings controllers
const resetButton = document.getElementById("resetButton");
const playButton = document.getElementById("playButton");
const nextVideoButton = document.getElementById("nextVideoButton");

resetButton.addEventListener("click", function() {
  resetScene();
  lilteccaVideo.load();
  yeatVideo.load();
  travisVideo.load();

});

playButton.addEventListener("click", function() {
  playOrStopVideo();
});

nextVideoButton.addEventListener("click", function() {

  lilteccaVideo.pause();
  yeatVideo.pause();
  travisVideo.pause();

  resetScene();

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

function resetScene() {
  scene.remove(travisIcosahedron, yeatTorus, lilteccaSphere);
  scene.add(travisIcosahedron, yeatTorus, lilteccaSphere);
  scene.remove(sphere01, sphere02, sphere03, sphere04, sphere05, sphere06);
  scene.remove(torus01, torus02, torus03, torus04, torus05, torus06);
  scene.remove(iconsahedron01, iconsahedron02, iconsahedron03, iconsahedron04, iconsahedron05, iconsahedron06);
}

function playOrStopVideo() {

  animate();

  if (isPlaying) {
    lilteccaVideo.pause();
    yeatVideo.pause();
    travisVideo.pause();
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
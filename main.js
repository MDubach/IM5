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
const lilteccaGeometry = new THREE.SphereGeometry(5,32,32);
const lilteccaVideo = document.getElementById("lilteccavideo");
const lilteccaTexture = new THREE.VideoTexture(lilteccaVideo);
const lilteccaMaterial = new THREE.MeshBasicMaterial({ map: lilteccaTexture });
const lilteccaSphere = new THREE.Mesh(lilteccaGeometry, lilteccaMaterial);
lilteccaSphere.position.set(30, 0, 0);
lilteccaSphere.name = 'lilteccaSphere';

// add liltecca video to scene
scene.background = lilteccaTexture;
scene.add(lilteccaSphere);

// yeat video einbindung
const yeatGeometry = new THREE.TorusGeometry(10,3,16,100);
const yeatVideo = document.getElementById("yeatvideo");
const yeatTexture = new THREE.VideoTexture(yeatVideo);
const yeatMaterial = new THREE.MeshBasicMaterial({ map: yeatTexture });
const yeatTorus = new THREE.Mesh(yeatGeometry, yeatMaterial);
yeatTorus.name = 'yeatTorus';

// add yeat video to scene
scene.add(yeatTorus);


// travis video einbindung
const travisGeometry = new THREE.IcosahedronGeometry(16,0);
const travisVideo = document.getElementById("travisvideo");
const travisTexture = new THREE.VideoTexture(travisVideo);
const travisMaterial = new THREE.MeshBasicMaterial({ map: travisTexture });
const travisIcosahedron = new THREE.Mesh(travisGeometry, travisMaterial);
travisIcosahedron.position.set(60,0,0);
travisIcosahedron.name = 'travisIcosahedron';

// add travis video to scene
scene.add(travisIcosahedron);

// Orbitcontrols for movement
const controls = new OrbitControls(camera, renderer.domElement);

// add stars to scene
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
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
    if (lilteccaVideo.paused) {
      lilteccaVideo.play();
    } else {
      lilteccaVideo.pause();
    }
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
  // Perform your actions when a mesh is clicked
  console.log(`Mesh clicked: ${mesh.name}`);
}



/*function onMeshClick(event, intersectsMesh) {
  console.log(intersectsMesh);
  // Perform your actions when the mesh is clicked
  if (lilteccaVideo.paused) {
    scene.background = lilteccaTexture;
    lilteccaVideo.play();
    travisVideo.pause();
  } else {
    lilteccaVideo.pause();
    scene.background = travisTexture;
    travisVideo.play();
  }
  console.log('Mesh clicked!');
}*/

function animate() {
  requestAnimationFrame(animate);
  yeatTorus.rotation.x += 0.01;
  yeatTorus.rotation.y += 0.005;
  yeatTorus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);

}

animate();
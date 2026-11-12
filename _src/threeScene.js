import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

//Create a new renderer by instating the canvas element in our HTML file
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(10, 10, 10);
//set the color of the basic material in the obj parameters '{}'
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 }); //changed from basic to standard material to show lighting effects
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//cube positioning & rotation
cube.position.z = -15;
cube.position.x = -15;

cube.rotation.x = 2;
cube.rotation.y = 0.5;

const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  flatShading: true,
});
const icoMesh = new THREE.Mesh(ico, icoMaterial);
scene.add(icoMesh);

icoMesh.position.z = -15;
icoMesh.position.x = 15;

//Lighting
const pointLight = new THREE.PointLight(0xffffff, 200);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400);

scene.add(pointLight);
scene.add(ambientLight);

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

//Background
const spaceTexture = new THREE.TextureLoader().load(
  new URL("../threed-images/galaxyBG.jpg", import.meta.url).href,
);
scene.background = spaceTexture;

//Texture mapping
const catTexture = new THREE.TextureLoader().load(
  new URL("../threed-images/catTexture.jpg", import.meta.url).href,
);
const sphereGeometry = new THREE.SphereGeometry(10, 22, 10);
const catMaterial = new THREE.MeshBasicMaterial({ map: catTexture });
const catMesh = new THREE.Mesh(sphereGeometry, catMaterial);
scene.add(catMesh);

const normalTexture = new THREE.TextureLoader().load(
  new URL("../threed-images/normals/textureNormal.png", import.meta.url).href,
);
const torusGeo = new THREE.TorusKnotGeometry(5, 1, 250, 5, 9, 15);
const torusMaterial = new THREE.MeshStandardMaterial({
  normalMap: normalTexture,
  roughness: 0,
  metalness: 0.8,
});

const torusKnot = new THREE.Mesh(torusGeo, torusMaterial);
scene.add(torusKnot);
torusKnot.position.y = 20;

//Animation
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  //Rotate the icosahedron a little faster in opposite direction
  icoMesh.rotation.x += -0.03;
  icoMesh.rotation.y += -0.03;
  //Rotate the cat sphere on the Y axis
  catMesh.rotation.y += 0.05;
  //Allows orbit controls to update in real-time
  controls.update();

  renderer.render(scene, camera);
}

animate();

import "./style.css";
import "./gopal.jpg";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.setPixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
const geometry = new THREE.TorusGeometry(10, 3, 16, 80);
const material = new THREE.MeshStandardMaterial({ color: "red" });

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Pointlight && Ambientlight
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// add stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//space Texture
const spaceTextureLoader = new THREE.TextureLoader().load("");

scene.background = spaceTextureLoader;

// Avatar
const gopalTexture = new THREE.TextureLoader().load("gopal.JPG");
const gopal = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: gopalTexture })
);

scene.add(gopal);

// moon

const moonTexture = new THREE.TextureLoader().load("moon.JPG");
const normalTexture = new THREE.TextureLoader().load("normal.JPG");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6, 50, 50),
  new THREE.MeshBasicMaterial({ map: moonTexture, normalMap: normalTexture })
);
moon.position.z = -5;
moon.position.setX(-10);
scene.add(moon);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  gopal.rotation.x += 0.1;
  gopal.rotation.y += 0.01;
  // gopal.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector("#bg"),
// });

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);
// renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({
//   color: "red",
// });

// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// function animate() {
//   requestAnimationFrame(animate);

//   torus.rotation.x += 0.01;
//   torus.rotation.y += 0.01;
//   torus.rotation.z += 0.01;

//   renderer.render(scene, camera);
// }

// animate();

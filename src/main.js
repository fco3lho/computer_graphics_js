// Importar os módulos do Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createPerson } from './person';

// Configurar a cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Carregar texturas
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('./src/textures/piso.jpg');
const wallTexture = textureLoader.load('./src/textures/parede.jpg');
const carpetTexture = textureLoader.load('./src/textures/tapete.jpg');
wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(2, 2);

// Criar materiais
const createMaterial = (color) => new THREE.MeshStandardMaterial({ color });
const material_pes = createMaterial(0x8B4513);
const material_cadeira = createMaterial(0x556B2F);
const material_mesa = createMaterial(0xA0522D);
const floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture });
const wallMaterial = new THREE.MeshPhongMaterial({ map: wallTexture });
const carpetMaterial = new THREE.MeshPhongMaterial({ map: carpetTexture, side: THREE.DoubleSide });

// Criar ambiente (chão, paredes, tapete)
const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const createWall = (width, height, x, y, z, rotationY) => {
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), wallMaterial);
  wall.position.set(x, y, z);
  if (rotationY) wall.rotation.y = rotationY;
  wall.receiveShadow = true;
  scene.add(wall);
};

createWall(10, 5, 0, 2.5, -5, 0); // Parede traseira
createWall(10, 5, -5, 2.5, 0, Math.PI / 2); // Parede esquerda

const carpet = new THREE.Mesh(new THREE.PlaneGeometry(3, 5), carpetMaterial);
carpet.rotation.x = -Math.PI / 2;
carpet.position.set(2, 0.1, 0);
carpet.receiveShadow = true;
scene.add(carpet);

// Criar móveis
const createBox = (w, h, d, material, x, y, z, castShadow = true) => {
  const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  box.position.set(x, y, z);
  if (castShadow) box.castShadow = true;
  scene.add(box);
  return box;
};

createBox(4, 0.3, 2, createMaterial(0x8B4513), -3, 0.15, 0); // Base cama
createBox(3.8, 0.2, 1.8, createMaterial(0xFFFFFF), -3, 0.4, 0); // Colchão
createBox(3, 3, 1, createMaterial(0x8B0000), -4.45, 1.5, 3).rotation.y = Math.PI / 2; // Guarda-roupa

// Criar mesa e cadeira
const createCylinder = (radius, height, material, x, y, z) => {
  const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height), material);
  cylinder.position.set(x, y, z);
  cylinder.castShadow = true;
  scene.add(cylinder);
};

createBox(1, 0.1, 1, material_cadeira, -2.5, 0.5, -2.99); // Assento cadeira
createBox(1, 1, 0.1, material_cadeira, -1.95, 1, -3.0).rotation.y = Math.PI / 2; // Encosto cadeira

// Pernas da cadeira
[-3, -2].forEach(x => {
  [-2.49, -3.49].forEach(z => {
    createCylinder(0.05, 0.5, material_pes, x, 0.25, z);
  });
});

// Mesa
createBox(2.2, 0.2, 2.5, material_mesa, -4, 1, -3);
[-4.7, -3].forEach(x => {
  [-4, -2].forEach(z => {
    createCylinder(0.1, 1, material_pes, x, 0.5, z);
  });
});

// PC
createBox(1.5, 0.1, 0.5, createMaterial(0x000000), -4.4, 1.15, -3).rotation.y = Math.PI / 2; // Base do monitor
createBox(1.4, 0.8, 0.05, createMaterial(0x555555), -4.4, 1.61, -3).rotation.y = Math.PI / 2; // Tela monitor
createBox(1.4, 0.05, 0.6, createMaterial(0x2F4F4F), -3.4, 1.1, -3.1).rotation.y = Math.PI / 2; // Teclado

// Criar pessoa e adicionar à cena
const person = createPerson();
scene.add(person);

// Animação do movimento da pessoa
let direction = 2;

function animatePerson() {
  person.position.z += 0.02 * direction;
  
  if (person.position.z > 4) direction = -2;
  if (person.position.z < -4) direction = 2;
}

// Adicionar luzes
const light = new THREE.PointLight(0xffffff, 1, 5000);
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.01);
scene.add(ambientLight);

// Configurar câmera e controles
camera.position.set(5, 5, 10);
camera.lookAt(0, 1, 0);
const controls = new OrbitControls(camera, renderer.domElement);

// Raycaster para movimentar luz com mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children.filter(obj => obj instanceof THREE.Mesh), true);
  if (intersects.length > 0) light.position.copy(intersects[0].point).add(new THREE.Vector3(0.1, 0.1, 0.1));
});

// Função de animação
function animate() {
  requestAnimationFrame(animate);
  animatePerson();
  renderer.render(scene, camera);
  controls.update();
}

animate();

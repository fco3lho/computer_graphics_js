// Importar os módulos do Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Configurar a cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  1, 
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Tipo de sombra mais suave


// Configurando textura do chão
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('./textures/piso.jpg');

const floorMaterial = new THREE.MeshPhongMaterial({ 
  map: floorTexture // Textura base
});

// Configurar o chão e paredes do quarto
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  floorMaterial
);
floor.rotation.x = -Math.PI / 2; // Deixa o chão plano
scene.add(floor);


// configurando textura das paredes
const wallTexture = textureLoader.load('./textures/parede.jpg');
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(2, 2);


const wallMaterial = new THREE.MeshPhongMaterial({  map: wallTexture });
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
backWall.position.z = -5;
backWall.position.y = 2.5;
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -5;
leftWall.position.y = 2.5;
scene.add(leftWall);

// Criar um objeto básico na cena

const createMaterial = (color) => new THREE.MeshStandardMaterial({ color });

//cama
const base_cama = new THREE.Mesh(new THREE.BoxGeometry(4, 0.3, 2), createMaterial(0x8B4513));
base_cama.position.set(-3, 0.15, 0);
scene.add(base_cama);
const colchao = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.2, 1.8), createMaterial(0xFFFFFF));
colchao.position.set(-3, 0.4, 0);
scene.add(colchao);


// guarda roupa
const g_roupa = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 1), createMaterial(0x8B0000));
g_roupa.position.set(-4.45, 1.5, 3);
g_roupa.rotation.y = Math.PI / 2;
scene.add(g_roupa);

//config mesa/cadeira
const material_pes = createMaterial(0x8B4513);
const material_cadeira = createMaterial(0x556B2F);
const material_mesa = createMaterial(0xA0522D);

// Cadeira
const assento = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 1), material_cadeira);
assento.position.set(-2.5, 0.5, -2.99); 
scene.add(assento);

const encosto = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.1), material_cadeira);
encosto.position.set(-1.95, 1, -3.0); 
scene.add(encosto);

// Ajuste das pernas
assento.rotation.y = Math.PI / 2; 
encosto.rotation.y = Math.PI / 2;

const leg_assento1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), material_pes);
leg_assento1.position.set(-3, 0.25, -2.49);
leg_assento1.rotation.y = Math.PI / 2;
scene.add(leg_assento1);

const leg_assento2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), material_pes);
leg_assento2.position.set(-2, 0.25, -2.49);
leg_assento2.rotation.y = Math.PI / 2;
scene.add(leg_assento2);

const leg_assento3 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), material_pes);
leg_assento3.position.set(-3, 0.25, -3.49);
leg_assento3.rotation.y = Math.PI / 2;
scene.add(leg_assento3);

const leg_assento4 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), material_pes);
leg_assento4.position.set(-2, 0.25, -3.49);
leg_assento4.rotation.y = Math.PI / 2;
scene.add(leg_assento4);

// mesa
const tampa = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.2, 2.5), material_mesa);
tampa.position.set(-4, 1, -3);
scene.add(tampa);

const mesa_material_pes = [
    [-4.7, 0.5, -4], [-3, 0.5, -4],
    [-4.7, 0.5, -2], [-3, 0.5, -2]
];

mesa_material_pes.forEach(pos => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1), material_pes);
    leg.position.set(...pos);
    scene.add(leg);
});

const leg_mesa1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1), material_pes);
leg_mesa1.position.set(-4.7, 0.5, -4);
leg_mesa1.rotation.y = Math.PI / 2;
scene.add(leg_mesa1);

const leg_mesa2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1), material_pes);
leg_mesa2.position.set(-3, 0.5, -4);
leg_mesa2.rotation.y = Math.PI / 2;
scene.add(leg_mesa2);

const leg_mesa3 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1), material_pes);
leg_mesa3.position.set(-4.7, 0.5, -2);
leg_mesa3.rotation.y = Math.PI / 2;
scene.add(leg_mesa3);

const leg_mesa4 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1), material_pes);
leg_mesa4.position.set(-3, 0.5, -2);
leg_mesa4.rotation.y = Math.PI / 2;
scene.add(leg_mesa4);

// PC na mesa

// Base do monitor
const monitorBase = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 0.5), createMaterial(0x000000));
monitorBase.position.set(-4.4, 1.15, -3);
scene.add(monitorBase);
monitorBase.rotation.y = Math.PI / 2; 

// Tela do monitor
const monitorScreen = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.05), createMaterial(0x555555)); 
monitorScreen.position.set(-4.4, 1.61, -3);
scene.add(monitorScreen);
monitorScreen.rotation.y = Math.PI / 2; 

// Teclado
const keyboard = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.05, 0.6), createMaterial(0x2F4F4F)); 
keyboard.position.set(-3.4, 1.1, -3.1);
scene.add(keyboard);
keyboard.rotation.y = Math.PI / 2

// tapete
const carpetTexture = textureLoader.load('./textures/tapete.jpg');

const carpetMaterial = new THREE.MeshPhongMaterial({
  map: carpetTexture,
  side: THREE.DoubleSide // os dois lados estao visíveis
});

const carpet = new THREE.Mesh(new THREE.PlaneGeometry(3, 5), carpetMaterial);
carpet.rotation.x = -Math.PI / 2;
carpet.position.set(2, 0.1, 0); 
scene.add(carpet);

//Sombras
base_cama.castShadow = true;
colchao.castShadow = true;
g_roupa.castShadow = true;
assento.castShadow = true;
encosto.castShadow = true;
leg_assento1.castShadow = true
leg_assento2.castShadow = true
leg_assento3.castShadow = true
leg_assento4.castShadow = true
tampa.castShadow = true;
leg_mesa1.castShadow = true
leg_mesa2.castShadow = true
leg_mesa3.castShadow = true
leg_mesa4.castShadow = true
monitorBase.castShadow = true;
monitorScreen.castShadow = true;
keyboard.castShadow = true;
floor.receiveShadow = true;
backWall.receiveShadow = true;
leftWall.receiveShadow = true;
carpet.receiveShadow = true;

// Adicionar luz controlável
const light = new THREE.PointLight(0xffffff, 1, 5000);
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);

// Adicionar luz ambiente
const ambientLight = new THREE.AmbientLight(0x404040, 0.01);
scene.add(ambientLight);

// Configurar a posição da câmera
camera.position.set(5, 5, 10);
camera.lookAt(0, 1, 0);

// Criar um Raycaster para projetar a posição do mouse no espaço 3D
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// controle da câmera
const controls = new OrbitControls(camera, renderer.domElement);

// Função de animação
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

// Atualizar a posição da luz com base no ponteiro do mouse
window.addEventListener('mousemove', (event) => {
  // Normalizar as coordenadas do mouse para o intervalo -1 a 1
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Usar o Raycaster para calcular a posição no espaço 3D
  raycaster.setFromCamera(mouse, camera);
 
  const objects = scene.children.filter(obj => obj instanceof THREE.Mesh);
  const intersects = raycaster.intersectObjects(objects, true);


  if (intersects.length > 0) {
    const intersectPoint = intersects[0].point;
    light.position.copy(intersectPoint).add(new THREE.Vector3(0.1, 0.1, 0.1));
  }
});

animate();

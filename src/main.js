// Importar os módulos do Three.js
import * as THREE from 'three';

// Configurar a cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Configurar o chão e paredes do quarto
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshPhongMaterial({ color: 0x8c8c8c })
);
floor.rotation.x = -Math.PI / 2; // Deixa o chão plano
scene.add(floor);

const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xb0c4de });
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
const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
box.position.set(0, 1, 0);
scene.add(box);

// Adicionar luz controlável
const light = new THREE.PointLight(0xffffff, 1, 100);
light.castShadow = true; // Ativar sombras para mais realismo
scene.add(light);

// Adicionar luz ambiente
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Configurar a posição da câmera
camera.position.set(5, 5, 10);
camera.lookAt(0, 1, 0);

// Criar um Raycaster para projetar a posição do mouse no espaço 3D
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Função de animação
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Atualizar a posição da luz com base no ponteiro do mouse
window.addEventListener('mousemove', (event) => {
  // Normalizar as coordenadas do mouse para o intervalo -1 a 1
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Usar o Raycaster para calcular a posição no espaço 3D
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([floor, backWall, leftWall]);

  if (intersects.length > 0) {
    // Posicionar a luz na posição do primeiro objeto intersectado
    light.position.copy(intersects[0].point);
  }
});



// Iniciar a animação
animate();

import * as THREE from 'three';

/**
 * Cria e retorna um boneco 3D simples.
 * @returns {THREE.Group} Grupo contendo a pessoa.
 */
export function createPerson() {
    const person = new THREE.Group();
  
    // Materiais
    const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 }); // Pele
    const shirtMaterial = new THREE.MeshStandardMaterial({ color: 0x3366ff }); // Camisa
    const pantsMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 }); // Calça
    const shoesMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Sapatos
  
    // Cabeça
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.25), skinMaterial);
    head.position.y = 1.6;
  
    // Pescoço
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15), skinMaterial);
    neck.position.y = 1.45;
  
    // Corpo (camisa)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.3), shirtMaterial);
    body.position.y = 1.1;
  
    // Braços
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
    const leftArm = new THREE.Mesh(armGeometry, skinMaterial);
    leftArm.position.set(-0.35, 1.1, 0);
    leftArm.rotation.z = -Math.PI / 8;
  
    const rightArm = new THREE.Mesh(armGeometry, skinMaterial);
    rightArm.position.set(0.35, 1.1, 0);
    rightArm.rotation.z = Math.PI / 8;
  
    // Mãos
    const handGeometry = new THREE.SphereGeometry(0.1);
    const leftHand = new THREE.Mesh(handGeometry, skinMaterial);
    leftHand.position.set(-0.45, 0.88, 0);
  
    const rightHand = new THREE.Mesh(handGeometry, skinMaterial);
    rightHand.position.set(0.45, 0.88, 0);
  
    // Pernas (calça)
    const legGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.6);
    const leftLeg = new THREE.Mesh(legGeometry, pantsMaterial);
    leftLeg.position.set(-0.15, 0.5, 0);
  
    const rightLeg = new THREE.Mesh(legGeometry, pantsMaterial);
    rightLeg.position.set(0.15, 0.5, 0);
  
    // Pés (sapatos)
    const footGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.3);
    const leftFoot = new THREE.Mesh(footGeometry, shoesMaterial);
    leftFoot.position.set(-0.15, 0.2, 0.05);
  
    const rightFoot = new THREE.Mesh(footGeometry, shoesMaterial);
    rightFoot.position.set(0.15, 0.2, 0.05);
  
    // Montar o boneco
    person.add(head, neck, body, leftArm, rightArm, leftHand, rightHand, leftLeg, rightLeg, leftFoot, rightFoot);
  
    // Posição inicial
    person.position.set(2, 0, 0);
  
    return person;
}

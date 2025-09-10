// Scene Setup
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

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Load Texture Asynchronously
const loader = new THREE.TextureLoader();
loader.load("assets/earth_texture.jpg", (texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Camera Position
  camera.position.z = 5;

  // Resize Handling
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Color Toggle Button
  document.getElementById("colorButton").addEventListener("click", () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    material.color.set(`#${randomColor}`);
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }

  animate(); // Start animation only after texture is loaded
});
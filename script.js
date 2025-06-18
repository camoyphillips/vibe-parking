const canvas = document.getElementById('parkingLot');
const ctx = canvas.getContext('2d');

// Parking lot layout
function drawParkingLot() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw parking spaces
  ctx.fillStyle = '#bdbdbd';
  ctx.fillRect(100, 50, 600, 400);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  for (let i = 0; i < 10; i++) {
    ctx.strokeRect(120 + i * 60, 60, 50, 100); // Top row
    ctx.strokeRect(120 + i * 60, 340, 50, 100); // Bottom row
  }

  // Draw driving lanes
  ctx.fillStyle = '#888';
  ctx.fillRect(120, 180, 600, 140);

  // Draw arrows and signage
  drawLaneArrowsAndSigns();
}

// Car properties
const car = {
  x: 400,
  y: 250,
  width: 40,
  height: 20,
  color: '#1976d2',
  angle: 0,
  speed: 0,
  maxSpeed: 4,
  accel: 0.15,
  friction: 0.05,
  turnSpeed: 0.04
};

// Draw the car
function drawCar() {
  ctx.save();
  ctx.translate(car.x, car.y);
  ctx.rotate(car.angle);

  // Car shadow
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(0, 10, car.width / 2 + 4, car.height / 2 + 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Car body (side)
  ctx.fillStyle = "#1565c0";
  ctx.fillRect(-car.width / 2, -car.height / 4 + 4, car.width, car.height / 2);

  // Car roof
  ctx.fillStyle = car.color;
  ctx.fillRect(-car.width / 4, -car.height / 2 + 4, car.width / 2, car.height / 2);

  // Windshield (angled)
  ctx.fillStyle = "#90caf9";
  ctx.beginPath();
  ctx.moveTo(-car.width / 4, -car.height / 2 + 4);
  ctx.lineTo(car.width / 4, -car.height / 2 + 4);
  ctx.lineTo(car.width / 6, -car.height / 4 + 4);
  ctx.lineTo(-car.width / 6, -car.height / 4 + 4);
  ctx.closePath();
  ctx.fill();

  // Hood
  ctx.fillStyle = "#1976d2";
  ctx.fillRect(-car.width / 4, car.height / 4, car.width / 2, car.height / 4);

  // Four wheels (ellipses for 3D effect)
  ctx.fillStyle = "#222";
  // Front left
  ctx.beginPath();
  ctx.ellipse(-car.width / 2 + 6, -car.height / 2 + 8, 4, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  // Front right
  ctx.beginPath();
  ctx.ellipse(car.width / 2 - 6, -car.height / 2 + 8, 4, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  // Rear left
  ctx.beginPath();
  ctx.ellipse(-car.width / 2 + 6, car.height / 2 - 8, 4, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  // Rear right
  ctx.beginPath();
  ctx.ellipse(car.width / 2 - 6, car.height / 2 - 8, 4, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Generate random parked cars in parking spots
const parkedCars = [];
const parkingSpots = [];

// Top row spots (head-in/reverse)
for (let i = 0; i < 10; i++) {
  parkingSpots.push({ x: 120 + i * 60 + 25, y: 60 + 50, angle: 0 }); // center of each spot
}
// Bottom row spots (head-in/reverse)
for (let i = 0; i < 10; i++) {
  parkingSpots.push({ x: 120 + i * 60 + 25, y: 340 + 50, angle: Math.PI }); // center, facing opposite
}

// Parallel parking spots (left edge, vertical orientation)
for (let i = 0; i < 2; i++) {
  parkingSpots.push({
    x: 110, // near the left edge
    y: 180 + i * 80,
    angle: -Math.PI / 2 // vertical, facing up
  });
}

// Pick 4 random unique spots for parked cars, with random reverse parking
const usedIndices = new Set();
while (parkedCars.length < 4) {
  const idx = Math.floor(Math.random() * parkingSpots.length);
  if (!usedIndices.has(idx)) {
    usedIndices.add(idx);
    // Randomly decide if the car is reverse parked
    let spot = parkingSpots[idx];
    let reverse = Math.random() < 0.5;
    let angle;
    if (spot.y < 200) { // Top row
      angle = reverse ? Math.PI : 0;
    } else { // Bottom row
      angle = reverse ? 0 : Math.PI;
    }
    parkedCars.push({
      x: spot.x,
      y: spot.y,
      angle: angle,
      width: 40,
      height: 20,
      color: '#b71c1c'
    });
  }
}

// Draw parked cars
function drawParkedCars() {
  parkedCars.forEach(carObj => {
    ctx.save();
    ctx.translate(carObj.x, carObj.y);
    ctx.rotate(carObj.angle);

    // Shadow
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.ellipse(0, 10, carObj.width / 2 + 4, carObj.height / 2 + 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Body (side)
    ctx.fillStyle = "#880808";
    ctx.fillRect(-carObj.width / 2, -carObj.height / 4 + 4, carObj.width, carObj.height / 2);

    // Roof
    ctx.fillStyle = carObj.color;
    ctx.fillRect(-carObj.width / 4, -carObj.height / 2 + 4, carObj.width / 2, carObj.height / 2);

    // Windshield
    ctx.fillStyle = "#90caf9";
    ctx.beginPath();
    ctx.moveTo(-carObj.width / 4, -carObj.height / 2 + 4);
    ctx.lineTo(carObj.width / 4, -carObj.height / 2 + 4);
    ctx.lineTo(carObj.width / 6, -carObj.height / 4 + 4);
    ctx.lineTo(-carObj.width / 6, -carObj.height / 4 + 4);
    ctx.closePath();
    ctx.fill();

    // Hood
    ctx.fillStyle = "#b71c1c";
    ctx.fillRect(-carObj.width / 4, carObj.height / 4, carObj.width / 2, carObj.height / 4);

    // Four wheels
    ctx.fillStyle = "#222";
    // Front left
    ctx.beginPath();
    ctx.ellipse(-carObj.width / 2 + 6, -carObj.height / 2 + 8, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Front right
    ctx.beginPath();
    ctx.ellipse(carObj.width / 2 - 6, -carObj.height / 2 + 8, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Rear left
    ctx.beginPath();
    ctx.ellipse(-carObj.width / 2 + 6, carObj.height / 2 - 8, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Rear right
    ctx.beginPath();
    ctx.ellipse(carObj.width / 2 - 6, carObj.height / 2 - 8, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
}

// Draw arrows and signs in the parking lot
function drawLaneArrowsAndSigns() {
  ctx.save();
  ctx.strokeStyle = "#fff";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 3;

  // Entrance/Exit signage
  ctx.font = "bold 20px Arial";
  ctx.fillStyle = "#1976d2";
  ctx.fillRect(100, 30, 80, 30); // Entrance sign background
  ctx.fillRect(620, 470, 80, 30); // Exit sign background
  ctx.fillStyle = "#fff";
  ctx.fillText("ENTRANCE", 105, 52);
  ctx.fillText("EXIT", 645, 492);

  ctx.restore();
}

// Handle keyboard input
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function updateCar() {
  // Forward/backward
  if (keys['ArrowUp']) car.speed = Math.min(car.speed + car.accel, car.maxSpeed);
  else if (keys['ArrowDown']) car.speed = Math.max(car.speed - car.accel, -car.maxSpeed / 2);
  else {
    // Friction
    if (car.speed > 0) car.speed = Math.max(car.speed - car.friction, 0);
    if (car.speed < 0) car.speed = Math.min(car.speed + car.friction, 0);
  }

  // Turning
  if (car.speed !== 0) {
    if (keys['ArrowLeft']) car.angle -= car.turnSpeed * (car.speed / car.maxSpeed);
    if (keys['ArrowRight']) car.angle += car.turnSpeed * (car.speed / car.maxSpeed);
  }

  // Move car
  car.x += Math.cos(car.angle) * car.speed;
  car.y += Math.sin(car.angle) * car.speed;

  // Keep car inside the parking lot area (100,50) to (700,450)
  const lotLeft = 100 + car.width / 2;
  const lotRight = 700 - car.width / 2;
  const lotTop = 50 + car.height / 2;
  const lotBottom = 450 - car.height / 2;

  car.x = Math.max(lotLeft, Math.min(lotRight, car.x));
  car.y = Math.max(lotTop, Math.min(lotBottom, car.y));
}

// Mouse: click to rotate car to face mouse position
canvas.addEventListener('mousedown', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  // Calculate angle from car to mouse
  const dx = mouseX - car.x;
  const dy = mouseY - car.y;
  car.angle = Math.atan2(dy, dx);
});

let collisionDetected = false;

function loop() {
  drawParkingLot();
  drawParkedCars();
  updateCar();

  // Check for collision with any parked car
  collisionDetected = false;
  for (const parked of parkedCars) {
    if (isColliding(car, parked)) {
      collisionDetected = true;
      break;
    }
  }

  drawCar();

  // Show collision effect
  if (collisionDetected) {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.strokeRect(car.x - car.width / 2, car.y - car.height / 2, car.width, car.height);
    ctx.restore();

    ctx.save();
    ctx.font = "bold 32px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Collision!", car.x - 60, car.y - 30);
    ctx.restore();

    car.speed = 0;
  }

  requestAnimationFrame(loop);
}

loop();

function isColliding(carA, carB) {
  // Axis-Aligned Bounding Box (AABB) collision (approximate, works for small angles)
  return (
    Math.abs(carA.x - carB.x) < (carA.width + carB.width) / 2 &&
    Math.abs(carA.y - carB.y) < (carA.height + carB.height) / 2
  );
}
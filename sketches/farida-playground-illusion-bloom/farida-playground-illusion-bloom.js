let ochre, poop, yellow, pink, brown;
let amount = 24;
let step = 360.0 / amount;
let radius = 260;

function setup() {
  createCanvas(1080, 1080, WEBGL);

  ochre  = color('#CFA10B');
  poop   = color('#806805');
  yellow = color('#FFFF64');
  pink   = color('#F174B0');
  brown  = color('#3F2600');
}

function boxH() {
  stroke(poop);
  strokeWeight(2);
  fill(yellow);
  box(60, 450, 120);
}

function boxV() {
  noStroke();
  fill(ochre);
  box(450, 60, 100);
}

function back() {
  noStroke();
  fill(poop);
  box(1800, 1800, 20);
}

function draw() {
  background(brown);
  translate(0, 0, -200);

  lights();
  // specular() and shininess() removed — not supported in p5.js
  // Use ambientLight() + directionalLight() for shading control instead
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);

  // Back wall
  push();
  translate(0, 0, -500);
  back();
  pop();

  let spin = (mouseX > 200 && mouseX < 600 && mouseY > 200 && mouseY < 400);

  for (let i = 0; i < amount; i++) {
    // H box
    push();
    rotateZ(radians(i * step));
    translate(radius, 0, 0);
    if (spin) {
      rotateX(frameCount * 0.02);
      rotateY(frameCount * 0.02);
      rotateZ(frameCount * 0.02);
    }
    boxH();
    pop();

    // V box
    push();
    rotateZ(radians(i * step));
    translate(radius, 0, 0);
    if (spin) {
      rotateX(frameCount * 0.02);
      rotateY(frameCount * 0.02);
      rotateZ(frameCount * 0.02);
    }
    boxV();
    pop();
  }
}
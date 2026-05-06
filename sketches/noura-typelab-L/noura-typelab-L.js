let t = 0;
let myFont;

function preload() {
  myFont = loadFont("ABCMaxiRound-Light-Trial.otf"); // same folder as sketch.js
}

function setup() {
  createCanvas(900, 900, WEBGL);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(0);

  let rotSpeed = map(mouseX, 0, width, 0.1, 2);
  let total = 150;
  let baseRadius = 180;
  let distortion = map(mouseY, 0, height, 10, 100);

  // 1st ring
  push();
  rotateY(radians(frameCount * rotSpeed));
  for (let i = 0; i < total; i++) {
    let angle = TWO_PI * i / total;
    let n = noise(i * 0.05, t);
    let pull = map(sin(t), -1, 1, 0.9, 1.1);
    let radius = (baseRadius * pull) + map(n, 0, 1, -distortion, distortion);
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    fill(map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255), 255);
    text("l", x, y);
  }
  pop();

  // 2nd ring
  let baseRadius2 = 260;
  push();
  rotateY(radians(-frameCount * rotSpeed * 1.5));
  for (let i = 0; i < total; i++) {
    let angle = TWO_PI * i / total;
    let n = noise(i * 0.05, t + 100);
    let radius = baseRadius2 + map(n, 0, 1, -distortion, distortion);
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    fill(100, 150, 255);
    text("L", x, y);
  }
  pop();

  // 3rd ring
  let baseRadius3 = 350;
  push();
  rotateY(radians(frameCount * rotSpeed * 2));
  for (let i = 0; i < total; i++) {
    let angle = TWO_PI * i / total;
    let n = noise(i * 0.05, t + 200);
    let radius = baseRadius3 + map(n, 0, 1, -distortion, distortion);
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    fill(255, 100, 150);
    text("l", x, y);
  }
  pop();

  t += 0.03;
}
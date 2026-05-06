// green  90, 190, 90
// blue   60, 120, 200
// yellow 255, 204, 0

let angle = 0;
let spinBoost = 0;

function setup() {
  createCanvas(800, 1000);
  background(60, 120, 200);
  frameRate(20);
}

function draw() {
  rectMode(CENTER);
  fill(60, 120, 200);
  rect(width / 2, height / 2, width, height);

  // BACKGROUND
  noStroke();
  fill(90, 190, 90);
  stroke(0);
  strokeWeight(5);
  ellipse(398, 100, 300, 390);
  noStroke();
  rectMode(CENTER);
  rect(600, 1080 / 2, 400, 1080);

  // RED BODY
  stroke(0);
  strokeWeight(25);
  fill(170, 0, 0);
  rect(400, 750, 350, 320, 40);
  rectMode(CENTER);
  ellipse(400, 640, 350, 500);
  noStroke();
  rect(400, 750, 325, 290, 40);

  // TRIANGLE
  stroke(0);
  strokeWeight(5);
  fill(255, 204, 0);
  triangle(300, 250, 600, 200, 450, 500);

  // lines by head
  strokeCap(PROJECT);
  strokeWeight(7);
  line(450, 495, 610, 180);

  // smaller triangle
  noStroke();
  fill(0);
  triangle(380, 380, 490, 410, 450, 500);

  // CURVE IN TRIANGLE
  noFill();
  stroke(0);
  strokeWeight(3);
  curve(300, 200, 450, 150, 340, 340, -90, -30);
  strokeCap(ROUND);

  // trapezoid on bottom
  fill(0);
  beginShape();
  vertex(270, 900);
  vertex(500, 900);
  vertex(550, 1000);
  vertex(250, 1000);
  endShape(CLOSE);

  // lines by trapezoid
  strokeWeight(20);
  line(550, 1000, 475, 850);
  line(250, 1000, 285, 850);
  noStroke();

  // dots by triangle
  fill(0);
  ellipse(525, 350, 30, 30);
  ellipse(370, 280, 15, 15);

  // lines by dots
  stroke(0);
  strokeWeight(3);
  line(370, 280, 450, 150);
  line(370, 350, 370, 320);
  line(96, 460, 96, 790);

  // STAR SHAPE
  stroke(255);
  strokeWeight(2);
  let cx = 170;
  let cy = 375;
  push();
  translate(cx, cy);
  rotate(radians(angle));
  line(0, -35, 0, 35);
  line(-20, -25, 20, 25);
  line(20, -25, -20, 25);
  line(30, 0, -30, 0);
  pop();
  angle += 2;
  angle += spinBoost;

  // CIRCLES
  let minSize = 35;
  let maxSize = mouseIsPressed ? 120 : 55; // mouseIsPressed in p5.js
  noStroke();
  fill(0);
  let d1 = map(cos(frameCount * 0.1), -1, 1, minSize, maxSize);
  ellipse(95, 450, d1, d1);
  let d2 = map(sin(frameCount * 0.1), -1, 1, minSize, maxSize);
  ellipse(95, 800, d2, d2);
  let d3 = map(cos(frameCount * 0.1), -1, 1, minSize, maxSize);
  ellipse(700, 600, d3, d3);

  if (mouseIsPressed) {
    filter(INVERT);
  }
}

function mousePressed() {
  spinBoost = 15;
}

function mouseReleased() {
  spinBoost = 0;
}
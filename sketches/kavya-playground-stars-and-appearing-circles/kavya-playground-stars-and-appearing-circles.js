function setup() {
  createCanvas(800, 800);
  background(0);
  frameRate(150);
}

function draw() {
  circle(random(width), random(height), random(8));
}

function mousePressed() {
  fill(random(256), random(256), random(256));
  noStroke();
  ellipse(mouseX, mouseY, random(100, 200), random(100, 400));
}
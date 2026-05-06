function setup() {
  createCanvas(1000, 1000);
  frameRate(60);
  background(0);
}

function draw() {
  for (let i = 0; i < 25; i++) {
    fill(random(256), random(256), random(256));
    circle(random(width), random(height), 30);
  }

  fill(0);
  circle(mouseX, mouseY, 30);
}

function mousePressed() {
  background(0);
}
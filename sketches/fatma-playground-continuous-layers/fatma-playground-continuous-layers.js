function setup() {
  createCanvas(500, 500);
  background(255);
  frameRate(20);
}

function draw() {
  stroke(0, 0, 256, random(50));
  strokeWeight(frameCount / 2);
  fill(255);
  rect(frameCount, frameCount, mouseX, mouseY);
}
function setup() {
  createCanvas(500, 500);
  background(255);
  frameRate(60);
}

function draw() {
  translate(width / 2, height / 2);
  rotate(frameCount * 0.1);

  stroke(180, 0, 0, 50);
  noFill();
  strokeWeight(2);
  ellipse(100, 0, 150, 150);

  if (frameCount > 200) {
    stroke(0, 0, 180, 50);
    strokeWeight(2);
    ellipse(100, 0, 150, 150);
  }
}
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  noFill();
  noStroke();
  ellipse(width / 2, height / 2, width, height);

  translate(width / 2, height / 2);
  rotate(radians(frameCount + mouseX));
  translate(mouseY / 2, 0);

  noFill();
  stroke(random(256), random(256), random(256));
  ellipse(0, 0, 100, 100);
}
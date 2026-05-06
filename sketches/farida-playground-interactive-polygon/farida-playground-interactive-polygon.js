function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(0);

  noFill();

  // In WEBGL mode, origin is already centered, so no translate needed
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));
  rotateZ(radians(frameCount));

  strokeWeight(2);
  stroke(255);

  // Conditional
  if (mouseX > 400 && mouseX < 600) {
    strokeWeight(random(1, 20));
    stroke(random(256), random(256), random(256));
    scale(1.2);
    sphere(250, 10, 10); // 10 detail equivalent
  } else {
    sphere(250, 4, 4); // 4 detail equivalent
  }
}
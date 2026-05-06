function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(0);

  rotateY(radians(frameCount));
  rotateX(radians(frameCount));

  noFill();
  stroke(255);
  sphere(180);

  for (let i = 0; i < 12; i++) {
    push();
    rotateY(radians(i * 360 / 12 + frameCount));
    translate(0, 0, 300);
    box(30, 30, 30);
    pop();
  }
}
function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(0);

  // In WEBGL mode, (0,0) is the center, so adjust mouse offset from center
  translate(mouseX - width / 2, mouseY - height / 2);

  for (let i = 0; i < 12; i++) {
    rotateY(radians(frameCount));
    rotateX(radians(frameCount));
    rotateZ(radians(frameCount));
    strokeWeight(2);
    stroke(0, 200, 255);
    fill(0);
    box(150);
  }
}
let amount = 24;
let step = 360 / amount;

function setup() {
  createCanvas(900, 900, WEBGL);
}

function draw() {
  background(0);

  // In WEBGL mode, origin is already centered, no translate needed

  // Conditional
  if (mouseX > 200 && mouseX < 600 &&
      mouseY > 200 && mouseY < 400) {
    rotateX(radians(frameCount));
    rotateY(radians(frameCount));
    rotateZ(radians(frameCount));
    strokeWeight(random(1, 20));
  }

  for (let i = 0; i < amount; i++) {
    push();
    stroke(57, 255, 20);
    noFill();
    rotate(radians(i * step));
    ellipse(300, 0, 70, 70);
    pop();
  }
}
var v = 0;

function setup() {
  // P3D becomes WEBGL in p5.js
  createCanvas(1000, 1000, WEBGL);
  frameRate(20);
}

function draw() {
  background(100, mouseX / 4, mouseY / 4);

  // In WEBGL mode, (0,0) is the center of the canvas.
  // To match Java's top-left origin behavior, we subtract half the width/height.
  push();
  translate(mouseX - width / 2, mouseY - height / 2, 0);
  
  strokeWeight(3);
  stroke(100, mouseX / 2, mouseY / 2);
  fill(155, (255 - (mouseX / 2)), (255 - (mouseY / 2)));
  
  var detail = floor(mouseY / 50);
  if (detail < 3) detail = 3; 

  // In p5.js, you can pass detail directly into the sphere function:
  // sphere(radius, detailX, detailY);
  sphere(mouseX / 2, detail, detail);
  pop();

  v += 10;
}
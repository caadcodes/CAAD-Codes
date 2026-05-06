function setup() {
  createCanvas(1080, 1350, WEBGL); 
}

function draw() {
  background("#FC6A03");

  lights(); 

  // box
  push();
  rotateY(radians(frameCount));
  rotateX(radians(frameCount));

  fill(255, 215, 0);
  stroke(0);
  box(160);
  pop();

  // sphere
  push();
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;

  translate(x, y, 0);
  rotateZ(radians(frameCount));

  fill(100, 150, 255);
  noStroke();
  sphere(50);
  pop();
}
function setup() {
  createCanvas(500, 500, WEBGL);
}

function draw() {
  background(30, 100, 250); 
  rotateZ(radians(mouseY));
  strokeWeight(0.5);
  stroke(180, 0, 0);
  fill(random(255), random(255), random(255), mouseX); 
  sphere(150);
}
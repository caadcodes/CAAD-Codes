function setup() {
  createCanvas(1000, 1000);
  background(200, 255, 40);
}

function draw() {
  fill(255, 250, 30); 
  circle(mouseX, mouseY, mouseX);
}
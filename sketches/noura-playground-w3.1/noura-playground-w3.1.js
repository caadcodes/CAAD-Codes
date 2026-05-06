function setup() {
  createCanvas(1000, 1000);
  fill(126);
  background(102);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(10);
    stroke(random(256), random(256), random(256));
  } else {
    fill(0);
    noStroke();
  }
  ellipse(mouseX, mouseY, mouseX / 5, 50);
}
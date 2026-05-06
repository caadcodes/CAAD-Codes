function setup() {
  createCanvas(800, 800);
  frameRate(30);
  background(0);
}

function draw() {
  translate(mouseX, mouseY);

  let n = frameCount % 100;
  noFill();
  stroke(random(256), random(256), random(256));

  for (let i = 0; i < n; i++) {
    ellipse(0, 0, i * 6, i * 6);
  }
}

function mousePressed() {
  background(0);
}
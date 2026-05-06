function setup() {
  createCanvas(1000, 1000);
  frameRate(25);
  background(100);
}

function draw() {
  background(100, 100, 100, 25); // ← fade effect

  translate(300, 300);
  ellipse(0, 0, 50, 50);
  rotate(radians(frameCount));
  ellipse(height / 2.5, width / 2.5, 200, 200);
  rotate(radians(frameCount));
  ellipse(height / 3, width / 3, 200, 150);
  rotate(radians(frameCount));
  ellipse(height / 4, width / 4, 200, 100);
  rotate(radians(frameCount));
  ellipse(height / 5, width / 5, 200, 50);
}
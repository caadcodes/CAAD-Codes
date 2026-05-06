function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  frameRate(60);
  background(0);
  translate(500, 500);

  for (let i = 5; i < frameCount % 60; i++) {
    stroke(random(256), random(256), random(256), 120);
    strokeWeight(5);
    rotate(radians(frameCount));
    line(900, 900, i, i);
  }
}
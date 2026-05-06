function setup() {
  createCanvas(500, 500); 
  frameRate(60);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0);
  for (let x = 0; x <= width; x += 40) {
    for (let y = 0; y <= height; y += 40) {

      let d = dist(x, y, mouseX, mouseY);
      let s = map(sin(d * 0.05 + frameCount * 0.05), -1, 1, 5, 30);

      fill(255);
      noStroke();
      ellipse(x, y, s, s);
    }
  }
}
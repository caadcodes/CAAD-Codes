let font;
let points = [];

function preload() {
  font = loadFont('Arial Black copy.ttf'); 
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  points = font.textToPoints('?', 0, 0, 400, {
    sampleFactor: 0.2,
    simplifyThreshold: 0
  });
}

function draw() {
  background(0);
  translate(width / 2 - 100, height / 2 + 150);

  let spikeLength = map(mouseX, 0, width, 0, 50);
  let h = map(mouseY, 0, height, 0, 360);
  
  stroke(h, 80, 100);
  strokeWeight(1);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let x = p.x + random(-2, 2);
    let y = p.y + random(-2, 2);

    let angle = i * 0.1;
    let endX = x + cos(angle) * spikeLength;
    let endY = y + sin(angle) * spikeLength;
    
    line(x, y, endX, endY);
  }
}
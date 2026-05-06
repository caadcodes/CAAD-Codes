let myFont;
let points = [];

function preload() {
  myFont = loadFont('Arial Black.ttf');
}

function setup() {
  createCanvas(700, 700);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  points = myFont.textToPoints('Q', 0, 0, 350, {
    sampleFactor: 0.1, 
    simplifyThreshold: 0
  });
}

function draw() {
  background(0);
  translate(width / 2 - 100, height / 2 + 100); 

  let mx = mouseX - (width / 2 - 100);
  let my = mouseY - (height / 2 + 100);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
 
    let d = dist(mx, my, p.x, p.y);
    let proximity = map(min(d, 150), 0, 150, 1, 0); 
    let sz = 3 + (proximity * 12); 
   
    let hue = 200 + (proximity * 120); 
    fill(hue, 80, 100);
    let offset = sin(frameCount * 0.1 + i) * (proximity * 5);
    
    ellipse(p.x + offset, p.y + offset, sz, sz);
  }
}
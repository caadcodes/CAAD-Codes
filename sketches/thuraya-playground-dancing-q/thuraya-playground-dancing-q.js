let myFont;
let points = [];
let xOff, yOff;

function preload() {
  myFont = loadFont('Arial Black.ttf');
}

function setup() {
  createCanvas(700, 700);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // Horizontal centering from the glyph's actual bbox — the previous
  // hard-coded -100 was a manual guess that ended up off-center.
  // Vertical offset (+100) is preserved exactly per spec.
  const bounds = myFont.textBounds('Q', 0, 0, 350);
  xOff = width / 2 - (bounds.x + bounds.w / 2);
  yOff = height / 2 + 100;

  points = myFont.textToPoints('Q', 0, 0, 350, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
}

function draw() {
  background(0);
  translate(xOff, yOff);

  let mx = mouseX - xOff;
  let my = mouseY - yOff;

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
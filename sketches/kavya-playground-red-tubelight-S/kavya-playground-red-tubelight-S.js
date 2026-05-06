let myFont;
let points = [];
let ogPoints = [];
let c1 = 0;
let c2 = 0;

function preload() {
  // Ensure the font file is in your assets
  myFont = loadFont("ABCDiatypeCompressed-Regular-Trial.otf");
}

function setup() {
  createCanvas(800, 800);

  // Extract points from the 'S'
  // sampleFactor: higher = more points (0.1 is usually plenty)
  let pts = myFont.textToPoints('S', 0, 0, 700, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });

  for (let i = 0; i < pts.length; i++) {
    points.push(createVector(pts[i].x, pts[i].y));
    ogPoints.push(createVector(pts[i].x, pts[i].y));
  }
  frameRate(100);
}

function draw() {
  background(0);
  
  // Center the letter
  translate(width / 2 - 100, height / 2 + 230);

  // Reset points to original positions each frame 
  // (since we aren't animating the position, just the style)
  for (let i = 0; i < points.length; i++) {
    points[i].x = ogPoints[i].x;
    points[i].y = ogPoints[i].y;
  }

  // Update noise counters
  c1 += 0.05;
  c2 += 0.05;
  
  // Calculate noise-based limits
  let noiseAmt1 = map(noise(c1), 0, 1, 0, 220);
  let noiseAmt2 = map(noise(c2), 0, 1, 0, 255);

  // Map mouseX to blend between hard-coded values and noise-driven values
  let l1 = map(mouseX, 0, width, 10, noiseAmt1);
  let l2 = map(mouseX, 0, width, 0, noiseAmt2);

  // Styling the shape
  // Note: fill(l2) creates a grayscale fill based on mouse/noise
  fill(l2);
  strokeWeight(30);
  
  // stroke(R, G, B, Alpha)
  // l1 controls the transparency of the thick red outline
  stroke(150, 0, 0, l1);

  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  // Using CLOSE ensures the 'S' outline is a complete loop
  endShape(CLOSE);
}
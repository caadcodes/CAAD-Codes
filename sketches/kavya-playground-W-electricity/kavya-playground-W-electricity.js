let myFont;
let points = [];
let ogPoints = [];

function preload() {
  // Ensure the font file is uploaded to your p5.js assets
  myFont = loadFont("DG Modal3at Med.ttf");
}

function setup() {
  createCanvas(800, 800);

  // Extract points from the letter "W"
  // sampleFactor: higher = more points (comparable to PolygonizerLength)
  let pts = myFont.textToPoints('W', 0, 0, 600, {
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });

  // Initialize the points and store a static copy for reference
  for (let i = 0; i < pts.length; i++) {
    points.push(createVector(pts[i].x, pts[i].y));
    ogPoints.push(createVector(pts[i].x, pts[i].y));
  }
}

function draw() {
  background(0);
  
  // Center the letter (adjusting based on your Java translation)
  translate(width / 2 - 240, height / 2 + 200);

  // Map mouseX/Y to control the visual properties
  // namt1: Controls transparency of the fill
  let namt1 = map(mouseX, 0, width, 100, 255);
  // namt2 & namt3: Control the intensity of the random jitter
  let namt2 = map(mouseX, 0, width, 0, 20);
  let namt3 = map(mouseY, 0, height, 0, 20);

  // Set colors: white fill (with alpha) and a gold/yellow stroke
  fill(255, 255, 255, namt1);
  strokeWeight(3);
  stroke(255, 220, 0);

  // Apply the jitter to every point
  for (let i = 0; i < points.length; i++) {
    let r1 = random(namt2);
    let r2 = random(namt3);
    
    // Always calculate relative to the original points (ogPoints) 
    // to prevent the letter from "drifting" away
    points[i].x = ogPoints[i].x + r1;
    points[i].y = ogPoints[i].y + r2;
  }

  // Draw the letter shape
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
}
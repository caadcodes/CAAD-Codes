let myFont;
let points = [];
let ogPoints = [];
let s = 0;

function preload() {
  // Ensure the font is in your sketch assets
  myFont = loadFont("ABCMarfaVariableVF-Trial.ttf");
}

function setup() {
  createCanvas(1000, 1000);
  background(0);
  
  // Extract points from the "#" character
  let pts = myFont.textToPoints('#', 0, 0, 600, {
    sampleFactor: 0.10,
    simplifyThreshold: 0
  });

  // Initialize points and their original reference positions
  for (let i = 0; i < pts.length; i++) {
    points.push(createVector(pts[i].x, pts[i].y));
    ogPoints.push(createVector(pts[i].x, pts[i].y));
  }

  frameRate(200);
  rectMode(CENTER);
}

function draw() {
  //background(0);
  
  // Center the character
  translate(width / 2 - 360, height / 2 + 100);

  // Update point positions with jitter and tangent waves
  for (let i = 0; i < points.length; i++) {
    let r = random(100, 110);
    let w = tan(radians(frameCount + i * 85));
    
    points[i].x = ogPoints[i].x + r + w;
    points[i].y = ogPoints[i].y + r + w;
  }

  // Calculate the drawing limit based on frameCount
  let limit = frameCount % points.length;

  // Draw the shapes
  for (let i = 0; i < limit; i += 2) {
    // Colors will cycle/shift as 's' increases
    fill((s * 5), (s * 15), (s * 25));
    noStroke();
    
    rect(points[i].x, points[i].y, 5, 5);
  }

  // Increment color variable
  s += 0.02;
}
let myFont;
let points = [];
let ogPoints = [];

function preload() {
  // Ensure the font is in your assets folder
  myFont = loadFont("23779851888.ttf");
}

function setup() {
  // P3D in Processing is WEBGL in p5.js
  createCanvas(800, 800, WEBGL);

  // Extract points from the 'W'
  let pts = myFont.textToPoints('W', 0, 0, 600, {
    sampleFactor: 0.3,
    simplifyThreshold: 0
  });

  for (let i = 0; i < pts.length; i++) {
    points.push(createVector(pts[i].x, pts[i].y));
    ogPoints.push(createVector(pts[i].x, pts[i].y));
  }

  rectMode(CENTER);
}

function draw() {
  background(0);

  // In WEBGL, (0,0) is the center, so we adjust our offsets accordingly
  // These values might need slight tweaking based on your specific font
  translate(-390, 200);

  fill(255);
  noStroke();

  // 1. Update point positions using Sine wave
  for (let i = 0; i < points.length; i++) {
    // i * frameCount creates a very fast, chaotic phase shift
    let wave = sin(radians(frameCount * i + 30)) * 5;
    points[i].x = ogPoints[i].x + wave;
    points[i].y = ogPoints[i].y + wave;
  }

  // 2. Draw the 3D Rectangles along those points
  for (let i = 0; i < points.length; i++) {
    push();
    
    // Calculate the Tangent wave for the rotation
    let waveT = tan(radians(frameCount * i + 30)) * 5;
    
    // Move to the specific point on the letter
    translate(points[i].x, points[i].y);
    
    // Apply 3D Rotations
    rotateX(radians(60));
    rotateZ(radians(waveT));
    stroke(0);
    // Draw the square
    rect(0, 0, 30, 30);
    
    pop();
  }
}
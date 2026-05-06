let myFont;
let points = [];
let ogPoints = [];

function preload() {
  // Ensure the font file is uploaded to your p5.js assets
  myFont = loadFont("ABCArizonaSerif-Bold-Trial.otf");
}

function setup() {
  createCanvas(800, 800);
  
  // Extract points from the letter "W"
  // sampleFactor: higher = more points. 0.1-0.2 is usually good for a 600pt font.
  let pts = myFont.textToPoints('W', 0, 0, 600, {
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });

  // Initialize point arrays
  for (let i = 0; i < pts.length; i++) {
    points.push(createVector(pts[i].x, pts[i].y));
    ogPoints.push(createVector(pts[i].x, pts[i].y));
  }

  frameRate(30);
  rectMode(CENTER);
}

function draw() {
  // Use console.log for debugging in p5.js
  // console.log(mouseX);
  
  background(0);
  
  // Move origin to center the letter
  translate(width / 2 - 420, height / 2 + 100);

  // Update points with a mix of random jitter and tangent waves
  // Using i += 5 helps performance, but we must check bounds in the loop
  for (let i = 0; i < points.length; i += 5) {
    let r = random(100, 105);
    let w = tan(radians(frameCount + i * 85));
    
    points[i].x = ogPoints[i].x + r + w;
    points[i].y = ogPoints[i].y + r + w;
  }

  // Map mouseX to the size of the rectangles
  let xSize = map(mouseX, 0, width, 0, 70);

  // Loop through points and draw rectangles
  // Note: We use the same increment (i += 10) as your Java code
  for (let i = 0; i < points.length; i += 10) {
    fill(random(256), random(256), random(256));
    noStroke();
    
    // Draw rect at the animated point position
    rect(points[i].x, points[i].y, xSize, xSize);
  }
}
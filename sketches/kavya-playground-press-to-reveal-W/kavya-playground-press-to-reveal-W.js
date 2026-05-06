let myFont;
let points = [];
let ogPoints = [];

function preload() {
  // Ensure the font is uploaded to your assets folder
  myFont = loadFont("ABCPareto-Circular-Trial.otf");
}

function setup() {
  createCanvas(800, 800);
  background(0); // Initial background
  
  // Extract points from the letter "W"
  // sampleFactor: higher = more points
  let pts = myFont.textToPoints('W', 0, 0, 600, {
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });

  // Initialize point arrays
  for (let i = 0; i < pts.length; i++) {
    points.push(createVector(pts[i].x, pts[i].y));
    ogPoints.push(createVector(pts[i].x, pts[i].y));
  }

  frameRate(100);
}

function draw() {
  // background(0); // Kept commented out to match your original "painting" effect

  // Move the origin to center the letter
  translate(width / 2 - 370, height / 2 + 200);

  // Apply a small horizontal jitter to the points
  for (let i = 0; i < points.length; i++) {
    let r = random(100, 110);
    points[i].x = ogPoints[i].x + r;
    points[i].y = ogPoints[i].y;
  }

  noFill();
  strokeWeight(3);

  if (mouseIsPressed) {
    // We use frameCount % points.length to loop the index back to 0 
    // once it exceeds the number of points available
    let limit = frameCount % points.length;

    // Draw circles at intervals of 5 points
    for (let i = 0; i <= limit; i += 5) {
      stroke(random(256), random(256), random(256));
      circle(points[i].x, points[i].y, 10);
    }
  }
}
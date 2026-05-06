let myFont;
let points = [];
let originalPoints = [];

function preload() {
  // Step 1: Load your font file
  myFont = loadFont("ABCMarfaVariableVF-Trial.ttf");
}

function setup() {
  createCanvas(800, 800);

  // Step 2: Extract points from the text
  // textToPoints(text, x, y, fontSize, options)
  // sampleFactor: density of points (higher = more points)
  let pts = myFont.textToPoints('S', -260, 0, 800, {
    sampleFactor: 0.7, // Adjust this to get more or fewer points
    simplifyThreshold: 0
  });

  // Step 3: Store points and create a backup of original positions
  for (let i = 0; i < pts.length; i++) {
    points.push(createVector(pts[i].x, pts[i].y));
    originalPoints.push(createVector(pts[i].x, pts[i].y));
  }
}

function draw() {
  background(0);
  
  // Move to center (values adjusted to match your Java translate)
  translate(width / 2 - 30, height / 2 + 280);

  // Animate each point
  for (let i = 0; i < points.length; i++) {
    // Using tan() like in your code creates that "explosive" stretching effect
    let wave = tan(radians(frameCount + i * mouseX));
    
    points[i].x = originalPoints[i].x + wave;
    points[i].y = originalPoints[i].y + wave;
  }

  // Draw the letter
  noFill();
  strokeWeight(3);
  // Strobing color effect
  stroke(random(255), random(255), random(255));

  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
}
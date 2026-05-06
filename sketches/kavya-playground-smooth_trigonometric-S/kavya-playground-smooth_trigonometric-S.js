let myFont;
let points = [];
let originalPoints = [];

function preload() {
  // Ensure the font file is uploaded to your p5.js sketch folder
  myFont = loadFont("ABCMarfaVariableVF-Trial.ttf");
}

function setup() {
  createCanvas(800, 800);

  // Extract points from the text 'S'
  // sampleFactor: lower is less points, higher is more (try 0.1 to 0.5)
  let pts = myFont.textToPoints('S', 0, 0, 800, {
    sampleFactor: 0.3, 
    simplifyThreshold: 0
  });

  // Store the points into two arrays: one for the live animation, one for the reference
  for (let i = 0; i < pts.length; i++) {
    points.push(createVector(pts[i].x, pts[i].y));
    originalPoints.push(createVector(pts[i].x, pts[i].y));
  }
}

function draw() {
  // Use console.log for p5.js instead of println
  // console.log(mouseX); 
  
  background(0);
  
  // Center the letter (matching your Java translation)
  translate(width / 2 - 280, height / 2 + 280);

  // Apply the tangent wave animation
  for (let i = 0; i < points.length; i++) {
    // Your specific logic: tan(radians(mouseY + i))
    let wave = tan(radians(mouseY + i * 1));
    
    // Offset the current point from its original stable position
    points[i].x = originalPoints[i].x + wave;
    points[i].y = originalPoints[i].y + wave;
  }

  // Visual Styling
  noFill();
  strokeWeight(3);
  
  // Create that strobe/flicker effect by picking a new random color every frame
  stroke(0, 0, random(255));

  // Render the points as a continuous shape
  beginShape();
  for (let i = 0; i < points.length; i+=10) {
    circle(points[i].x, points[i].y, 30);
  }
  endShape(CLOSE);
}
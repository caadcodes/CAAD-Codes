let myFont;
let points = [];
let len = 20;
let a, angle;

function preload() {
  myFont = loadFont("ABCMarfaVariableVF-Trial.ttf");
}

function setup() {
  createCanvas(1000, 1000);
  
  // Extract points from the letter "9"
  // sampleFactor 0.1 is roughly equivalent to PolygonizerLength 3
  points = myFont.textToPoints('9', 0, 0, 800, {
    sampleFactor: 0.3,
    simplifyThreshold: 0
  });

  frameRate(100);
}

function draw() {
  background(0);

  // Center the letter
  translate(width / 2 - 260, height / 2 + 270);

  // Map mouse positions to fractal parameters
  a = map(mouseX, 0, width, 0, 50); // Fractal spread
  angle = map(mouseY, height, 0, 0, TWO_PI); // Base rotation
  let c = map(mouseX, 0, width, 255, 0);

  noFill();
  stroke(c, 255, 100);
  strokeWeight(1);

  // Loop through points and grow a tree at each one
  // We use i += 7 to match your original step logic
  for (let i = 0; i < points.length; i += 7) {
    push();
    translate(points[i].x, points[i].y);
    rotate(angle);
    
    // Initial Trunk
    line(0, 0, 0, -len);
    translate(0, -len);
    
    // Start recursion
    branch(len);
    pop();
  }
}

function branch(l) {
  l = l * 0.66;

  if (l > 2) {
    // Right Branch
    push();
    rotate(radians(a));
    line(0, 0, 0, -l);
    translate(0, -l);
    branch(l);
    pop();

    // Left Branch
    push();
    rotate(radians(-a));
    line(0, 0, 0, -l);
    translate(0, -l);
    branch(l);
    pop();
  }
}
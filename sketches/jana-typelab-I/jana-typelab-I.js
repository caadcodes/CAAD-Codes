let font;
let points = [];
let morph = 0;

function preload() {
  font = loadFont('CreatesDistanceDemoRegular-yYlw2.ttf'); 
}

function setup() {
  createCanvas(1000, 1000);

  // get points from letter "I"
  points = font.textToPoints("I", 0, 0, 600, {
    sampleFactor: 0.25,
    simplifyThreshold: 0
  });

  // center using bounds 
  let bounds = font.textBounds("I", 0, 0, 600);

  for (let i = 0; i < points.length; i++) {
    points[i].x -= bounds.w / 2;
    points[i].y += bounds.h / 2;
  }

  background(0);
  smooth();
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  let target = mouseIsPressed ? 1 : 0;
  morph = lerp(morph, target, 0.08);

  let separation = lerp(5, 250, morph);

  // TOP eyelid
  push();
  translate(0, -separation);
  rotate(HALF_PI);
  drawI();
  pop();

  // BOTTOM eyelid
  push();
  translate(0, separation);
  scale(1, -1);
  rotate(HALF_PI);
  drawI();
  pop();

  // PUPIL
  let pupilAlpha = map(morph, 0, 1, 180, 0);
  let pulse = 6 + sin(frameCount * 0.02) * 40;

  noStroke();
  fill(255, pupilAlpha);
  ellipse(0, 0, pulse, pulse);
}

function drawI() {
  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;

    let d = abs(y);

    let stretch = map(d, 0, 200, 2.0, 0.5);

    // subtle pulsation
    stretch *= (1 + sin(frameCount * 0.05) * 0.15);

    // distortion
    let distortedX = x * stretch;
    let distortedY = y;

    // morph back
    let newX = lerp(distortedX, x, morph);
    let newY = lerp(distortedY, y, morph);

    stroke(255);
    point(newX, newY);
  }
}
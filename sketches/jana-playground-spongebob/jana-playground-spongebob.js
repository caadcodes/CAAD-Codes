let blink = 0;
let yOffset = 0;

function setup() {
  createCanvas(1000, 1000);
  frameRate(25);
}

function draw() {
  background(200, 230, 255);

  // bounce animation
  yOffset = sin(frameCount * 0.1) * 10;

  let cx = width / 2;
  let cy = height / 2 + yOffset;

  // BODY
  noStroke();
  fill(255, 215, 0);
  rectMode(CENTER);
  rect(cx, cy, 200, 200);

  // PANTS
  fill(255);
  rect(cx, cy + 115, 200, 30);

  fill(150, 100, 50);
  rect(cx, cy + 155, 200, 50);

  // TIE
  fill(255, 0, 0);
  triangle(cx - 10, cy + 100, cx + 10, cy + 100, cx, cy + 130);

  // EYES
  fill(255);
  ellipse(cx - 40, cy - 30, 50, 50);
  ellipse(cx + 40, cy - 30, 50, 50);

  // blinking animation
  let eyeHeight = abs(sin(frameCount * 0.2)) * 50;

  fill(0);
  ellipse(cx - 40, cy - 30, 20, eyeHeight);
  ellipse(cx + 40, cy - 30, 20, eyeHeight);

  // SMILE
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(cx, cy + 10, 80, 50, 0, PI);
}
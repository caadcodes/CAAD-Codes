// STARTING AND SETTLED STATE
let ordered = false;
let settle = 0.0;
let settleSpeed = 0.03;

// Circle (bindu) position
let cx = 300;
let cy = 170;
let cd = 160;

// CHAOS STATE
let chaosAmount = 55;
let wobbleAmount = 10;
let chaosSeed = 12345;

function setup() {
  createCanvas(600, 750);
  noStroke();
}

function draw() {
  let target;

  if (ordered === true) {
    target = 1.0;
  } else {
    target = 0.0;
  }

  // Animation toward target
  if (settle < target) settle = min(target, settle + settleSpeed);
  if (settle > target) settle = max(target, settle - settleSpeed);

  // BACKGROUND - big middle rect
  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(254, 209, 82);
  }
  rect(30, 30, 540, 690);

  // TRIANGLES AT THE BOTTOM

  // Bottom left 1/3
  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(37, 47, 96);
  }
  triangle(30, 720, 300, 720, 150, 573);

  // Bottom left 3/3
  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(63, 23, 7);
  }
  triangle(30, 458, 30, 720, 150, 573);

  // Bottom left 2/3
  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(26, 101, 162);
  }
  triangle(30, 573.5, 30, 720, 150, 573);

  // Bottom right 1/3
  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(26, 101, 162);
  }
  triangle(570, 720, 300, 720, 450, 573);

  // Bottom right 3/3
  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(234, 71, 18);
  }
  triangle(570, 458, 570, 720, 450, 573);

  // Bottom right 2/3
  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(36, 35, 53);
  }
  triangle(570, 573.5, 570, 720, 450, 573);

  // TRIANGLE LOOP
  push();
  translate(0, 280);

  let firstTipY = 440;
  let firstTopY = 110;
  let step = 40;
  let stripes = 10;

  // Make random stable per frame
  randomSeed(chaosSeed);

  // How much chaos is left right now?
  let chaosNow = chaosAmount * (1.0 - settle);

  for (let i = 0; i < stripes; i++) {
    let currentTipY = firstTipY - i * step;
    let currentTopY = firstTopY - i * step;

    // The colors
    if (i === 0) fill(149, 26, 23);
    else if (i === 1) fill(219, 86, 35);
    else if (i === 2) fill(0);
    else if (i === 3) fill(40, 70, 150);
    else if (i === 4) fill(30, 170, 170);
    else if (i === 5) fill(219, 86, 35);
    else if (i === 6) fill(224, 43, 36);
    else if (i === 7) fill(0);
    else if (i === 8) fill(40, 70, 150);
    else if (i === 9) fill(254, 209, 82);

    // TRIANGLE RANDOM OFFSETS
    let r1x = random(-5, 5) * chaosNow;
    let r1y = random(-5, 5) * chaosNow;
    let r2x = random(-5, 5) * chaosNow;
    let r2y = random(-5, 5) * chaosNow;
    let r3x = random(-5, 5) * chaosNow;
    let r3y = random(-5, 5) * chaosNow;

    // WAVE WOBBLE
    let wobble = sin(radians(frameCount * 2 + i * 25)) * wobbleAmount * (1.0 - settle);

    // Correct triangle coords (ordered)
    let x1 = 300;
    let y1 = currentTipY;

    let x2 = 650;
    let y2 = currentTopY;

    let x3 = -40;
    let y3 = currentTopY;

    // Apply chaos (0 when settle=1)
    triangle(
      x1 + r1x, y1 + r1y + wobble,
      x2 + r2x, y2 + r2y,
      x3 + r3x, y3 + r3y
    );
  }

  pop();

  // FRAMES

  // Top left
  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(219, 86, 35);
  }
  rect(0, 0, 30, 375);
  rect(0, 0, 300, 30);

  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(113, 42, 26);
  }
  rect(0, 375, 30, 375);
  rect(0, 720, 300, 30);

  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(183, 39, 30);
  }
  rect(300, 0, 300, 30);
  rect(570, 0, 30, 375);

  if (!ordered) {
    fill(random(256), random(256), random(256));
  } else {
    fill(66, 28, 9);
  }
  rect(570, 375, 30, 375);
  rect(300, 720, 300, 30);

  // PULSATING CIRCLE
  let pulse = (1.0 - settle) * (sin(radians(frameCount * 4)) * 4);
  fill(142, 35, 27);
  circle(cx, cy, cd + pulse);

  // RING AROUND CIRCLE
  if (!ordered) {
    noFill();
    stroke(254, 209, 82, 140);
    strokeWeight(3);
    circle(cx, cy, cd + 18 + pulse);
    noStroke();
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, cx, cy);
  if (d <= cd / 2) {
    ordered = !ordered;
  }
}

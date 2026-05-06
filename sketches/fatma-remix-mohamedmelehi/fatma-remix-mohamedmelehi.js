// top left
let redWave1;
let greenWave1;
let pinkWave1;
let greenWave2;
let pinkWave2;
let greenWave3;
let pinkWave3;

// bottom right
let redWave2;
let greenWave4;
let pinkWave4;
let greenWave5;
let pinkWave5;
let greenWave6;
let pinkWave6;

// ENTRANCE
let waveDuration = 60;
let waveDelay = 15;
let startingDist = 180;

// CONTINUOUS MOTION
let inOutTime = 30;
let inOutDistance = 10;
let startFrame = 0;

function preload() {
  redWave1 = loadImage("redWave1.svg");
  greenWave1 = loadImage("greenWave1.svg");
  pinkWave1 = loadImage("pinkWave1.svg");
  greenWave2 = loadImage("greenWave2.svg");
  pinkWave2 = loadImage("pinkWave2.svg");
  greenWave3 = loadImage("greenWave3.svg");
  pinkWave3 = loadImage("pinkWave3.svg");

  redWave2 = loadImage("redWave2.svg");
  greenWave4 = loadImage("greenWave4.svg");
  pinkWave4 = loadImage("pinkWave4.svg");
  greenWave5 = loadImage("greenWave5.svg");
  pinkWave5 = loadImage("pinkWave5.svg");
  greenWave6 = loadImage("greenWave6.svg");
  pinkWave6 = loadImage("pinkWave6.svg");
}

function setup() {
  createCanvas(700, 805);
  pixelDensity(1);
  frameRate(30);
}

function draw() {
  background(0);
  circles();

  let t = frameCount - startFrame;
  let totalPairs = 7;
  let entryEndT = (totalPairs - 1) * waveDelay + waveDuration;

  if (t < entryEndT) {
    drawEntrance(t);
  } else {
    drawInOutMotion(t - entryEndT);
  }
}

function drawEntrance(t) {
  for (let pair = 6; pair >= 0; pair--) {
    let startT = pair * waveDelay;
    let p = constrain((t - startT) / waveDuration, 0, 1);

    if (p <= 0) continue;

    let entranceProgress = 0.5 - 0.5 * cos(PI * p);

    drawWave(getTopWave(pair), entranceProgress, -startingDist, -startingDist);
    drawWave(getBottomWave(pair), entranceProgress, startingDist, startingDist);
  }
}

function drawInOutMotion(afterT) {
  let loop = (afterT % inOutTime) / inOutTime;
  let motionProgress = 0.5 - 0.5 * cos(PI * loop);
  let back = -inOutDistance * sin(PI * motionProgress);

  drawShiftedWave(redWave1, back, back);
  drawShiftedWave(greenWave1, back, back);
  drawShiftedWave(pinkWave1, back, back);
  drawShiftedWave(greenWave2, back, back);
  drawShiftedWave(pinkWave2, back, back);
  drawShiftedWave(greenWave3, back, back);
  drawShiftedWave(pinkWave3, back, back);

  drawShiftedWave(redWave2, -back, -back);
  drawShiftedWave(greenWave4, -back, -back);
  drawShiftedWave(pinkWave4, -back, -back);
  drawShiftedWave(greenWave5, -back, -back);
  drawShiftedWave(pinkWave5, -back, -back);
  drawShiftedWave(greenWave6, -back, -back);
  drawShiftedWave(pinkWave6, -back, -back);
}

function drawWave(waveShape, entranceProgress, startOffsetX, startOffsetY) {
  push();
  translate(
    lerp(startOffsetX, 0, entranceProgress),
    lerp(startOffsetY, 0, entranceProgress)
  );
  image(waveShape, 0, 0);
  pop();
}

function drawShiftedWave(waveShape, shiftX, shiftY) {
  push();
  translate(shiftX, shiftY);
  image(waveShape, 0, 0);
  pop();
}

function getTopWave(pair) {
  if (pair === 0) return redWave1;
  if (pair === 1) return greenWave1;
  if (pair === 2) return pinkWave1;
  if (pair === 3) return greenWave2;
  if (pair === 4) return pinkWave2;
  if (pair === 5) return greenWave3;
  return pinkWave3;
}

function getBottomWave(pair) {
  if (pair === 0) return redWave2;
  if (pair === 1) return greenWave4;
  if (pair === 2) return pinkWave4;
  if (pair === 3) return greenWave5;
  if (pair === 4) return pinkWave5;
  if (pair === 5) return greenWave6;
  return pinkWave6;
}

function circles() {
  push();
  noStroke();
  fill(255);
  translate(width / 2, height / 2);
  ellipse(0, 0, 690, 690);
  pop();

  push();
  noStroke();
  fill("#e8bd1f");
  translate(width / 2, height / 2);
  ellipse(0, 0, 615, 615);
  pop();

  push();
  noStroke();
  fill("#db9028");
  translate(width / 2, height / 2);
  ellipse(0, 0, 540, 540);
  pop();

  push();
  noStroke();
  fill("#da3832");
  translate(width / 2, height / 2);
  ellipse(0, 0, 470, 470);
  pop();

  push();
  noStroke();
  fill("#656f9d");
  translate(width / 2, height / 2);
  ellipse(0, 0, 395, 395);
  pop();
}

function mousePressed() {
  startFrame = frameCount;
}
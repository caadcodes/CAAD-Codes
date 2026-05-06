let letterPoints = [];
let originalPoints = [];
let currentDepth = 10, targetDepth = 20;
let currentSize = 20, targetSize = 20;
let waveAmount = 0;
let angleY = 0;
let col1, col2, currentFill, currentStroke;

function generateLetterPoints(fontSize) {
  letterPoints = [];
  originalPoints = [];
  let W = 800, H = 800;
  let pg = createGraphics(W, H);
  pg.pixelDensity(1);
  pg.background(0);
  pg.fill(255);
  pg.noStroke();
  pg.textSize(fontSize);
  pg.textAlign(CENTER, CENTER);
  pg.text('y', W / 2, H / 2 + 40);
  pg.loadPixels();
  let step = 10;
  for (let x = 0; x < W; x += step) {
    for (let y = 0; y < H; y += step) {
      let idx = (y * W + x) * 4;
      if (pg.pixels[idx] > 128) {
        let pt = { x: x - W / 2, y: y - H / 2 };
        letterPoints.push({ ...pt });
        originalPoints.push({ ...pt });
      }
    }
  }

}

function setup() {
  createCanvas(900, 900, WEBGL);
  col1 = color(84, 56, 220);
  col2 = color(242, 76, 0);
  currentFill = col1;
  currentStroke = col2;
  generateLetterPoints(600);
}

function draw() {
  background(0);
  lights();

  if (mouseIsPressed) {
    targetDepth = 500;
    waveAmount = lerp(waveAmount, 20, 0.05);
    currentFill = col2;
    currentStroke = col1;
  } else {
    targetDepth = 20;
    waveAmount = lerp(waveAmount, 0, 0.05);
    currentFill = col1;
    currentStroke = col2;
  }

  currentDepth = lerp(currentDepth, targetDepth, 0.05);
  currentSize = lerp(currentSize, targetSize, 0.05);

  angleY += 0.01;
  let angleX = sin(frameCount * 0.005) * 0.3;

  rotateY(angleY);
  rotateX(angleX);

  for (let i = 0; i < letterPoints.length; i++) {
    letterPoints[i].x = lerp(letterPoints[i].x, originalPoints[i].x, 0.3);
    letterPoints[i].y = lerp(letterPoints[i].y, originalPoints[i].y, 0.3);
  }

  strokeWeight(0.5);
  for (let i = 0; i < letterPoints.length; i += 2) {
    let wave = sin(frameCount * 0.04 + i * 1.5) * waveAmount;
    let waveX = sin(frameCount * 0.04 + letterPoints[i].y * 0.8) * waveAmount * 0.5;

    push();
    translate(letterPoints[i].x + waveX, letterPoints[i].y, wave);
    fill(currentFill);
    stroke(currentStroke);
    box(currentSize, currentSize, currentDepth);
    pop();
  }
}
/* COLORS */
let yellow, magenta, black, white, red, green, teal;

let cols = 12;
let rows = 16;
let cellW, cellH;
let img1, img2;

/* PALETTE */
let palette;

/* COLOR MATRIX */
let poster = [
  [0,0,0,0,0,0,0,0,0,0,0,0], // row 0
  [0,0,0,0,0,0,0,0,0,0,0,0], // row 1
  [0,0,0,0,0,0,0,0,0,0,0,0], // row 2
  [0,0,0,0,0,0,0,0,0,0,0,0], // row 3
  [0,0,0,0,0,0,0,0,0,0,0,0], // row 4
  [0,0,0,0,0,1,0,0,0,0,0,0], // row 5
  [0,0,0,0,4,1,0,3,0,0,0,0], // row 6
  [0,0,0,3,4,1,4,3,2,5,0,0], // row 7
  [1,1,1,2,1,3,6,5,1,5,1,1], // row 8
  [0,0,5,3,6,1,3,6,2,3,3,0], // row 9
  [6,6,6,2,3,2,6,3,1,6,6,0], // row 10
  [1,1,1,1,4,1,4,6,3,2,2,2], // row 11
  [0,0,0,2,0,3,5,0,1,0,0,0], // row 12
  [0,0,0,0,0,3,0,0,0,0,0,0], // row 13
  [0,0,0,0,0,0,0,0,0,0,0,0], // row 14
  [0,0,0,0,0,0,0,0,0,0,0,0], // row 15
];

/* DIAMOND MATRIX */
let diamonds = [
  [4, 8],
  [4, 11],
  [7, 11],
  [8, 9]
];

/* INTERACTION */
let randX, randY;
let settled = false;
let chaosSpeed = 6;

/* GRAIN AMOUNT */
let grainAmt = 12;

function preload() {
  img1 = loadImage('top.png');
  img2 = loadImage('bottom.png');
}

function setup() {
  createCanvas(720, 1000);
  pixelDensity(1);

  // Colors defined after createCanvas
  yellow  = color('#FFEF10');
  magenta = color('#CE187A');
  black   = color('#000000');
  white   = color('#FFFFFF');
  red     = color('#C5222D');
  green   = color('#087F45');
  teal    = color('#0092A0');

  // Palette — 0=white, 1=green, 2=teal, 3=yellow, 4=magenta, 5=red, 6=black
  palette = [white, green, teal, yellow, magenta, red, black];

  cellW = width / cols;
  cellH = height / rows;

  // Initialize random position arrays
  randX = Array.from({ length: rows }, () => new Array(cols).fill(0));
  randY = Array.from({ length: rows }, () => new Array(cols).fill(0));

  randomizePositions();
}

function draw() {
  background(white);
  image(img1, 0, 0, width, 5.2 * cellH);
  image(img2, 0, height - 3 * cellH, width, 3 * cellH);

  // If not settled and correct frame timing — randomize positions
  if (!settled && frameCount % chaosSpeed === 0) {
    randomizePositions();
  }

  // Draw matrix
  noStroke();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let value = poster[r][c];
      if (value === 0) continue;

      let x, y;
      if (settled) {
        x = c * cellW;
        y = r * cellH;
      } else {
        x = randX[r][c];
        y = randY[r][c];
      }

      fill(palette[value]);
      rect(x, y, cellW, cellH);
    }
  }

  drawDiamonds();
  addColorGrain(grainAmt);
}

/* DIAMONDS */
function drawDiamonds() {
  let margin = min(cellW, cellH) * 0.18;
  let d = min(cellW, cellH) - 2 * margin;

  noStroke();
  fill(255);
  rectMode(CENTER);

  for (let i = 0; i < diamonds.length; i++) {
    let c = diamonds[i][0];
    let r = diamonds[i][1];
    let cx, cy;

    if (settled) {
      cx = c * cellW + cellW * 0.5;
      cy = r * cellH + cellH * 0.5;
    } else {
      cx = randX[r][c] + cellW * 0.5;
      cy = randY[r][c] + cellH * 0.5;
    }

    push();
    translate(cx, cy);
    rotate(radians(45));
    rect(0, 0, d, d);
    pop();
  }

  rectMode(CORNER);
}

/* RANDOMIZE */
function randomizePositions() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      randX[r][c] = random(-cellW, width);
      randY[r][c] = random(-cellH, height);
    }
  }
}

/* TRIGGER */
function mousePressed() {
  settled = !settled;
  if (!settled) randomizePositions();
}

/* GRAIN */
function addColorGrain(amt) {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i]     = constrain(pixels[i]     + random(-amt, amt), 0, 255); // R
    pixels[i + 1] = constrain(pixels[i + 1] + random(-amt, amt), 0, 255); // G
    pixels[i + 2] = constrain(pixels[i + 2] + random(-amt, amt), 0, 255); // B
    // pixels[i + 3] is alpha — leave it alone
  }
  updatePixels();
}
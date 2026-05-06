let pg;
let letter = "G";
let fontSize = 620;

let step = 10;
let squareSize = 40;
let layers = 40;

let hSquares = [];
let vSquares = [];

let font;

function preload() {
  font = loadFont("PingAR+LT-Regular.otf");
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  pixelDensity(1);
  smooth();
  rectMode(CENTER);
  frameRate(60);

  pg = createGraphics(width, height);
  pg.pixelDensity(1);
  pg.background(0);
  pg.fill(255);
  pg.noStroke();
  pg.textAlign(CENTER, CENTER);
  pg.textFont(font);
  pg.textSize(fontSize);
  pg.text(letter, width / 2, height / 2 + 10);
  pg.loadPixels();

  for (let y = step; y < height - step; y += step) {
    for (let x = step; x < width - step; x += step) {
      if (bright(x, y)) {
        let h = sampleLine(x, y, true);
        let v = sampleLine(x, y, false);

        if (h > v) {
          hSquares.push(createVector(x - width / 2, y - height / 2));
        } else {
          vSquares.push(createVector(x - width / 2, y - height / 2));
        }
      }
    }
  }
}

function draw() {
  let f = millis() / 28;

  background(0);

  rotate(PI);
  rotateY(f * 0.01);
  rotateX(sin(f * 0.02) * 0.25);

  for (let i = 0; i < layers; i++) {
    push();

    translate(0, 0, map(i, 0, layers - 1, -220, 220));
    rotateZ(f * 0.01 + i * 0.08);
    scale(1.0 + sin(f * 0.05 + i * 0.3) * 0.08);

    drawLayer(i);

    pop();
  }
}

function drawLayer(li) {
  stroke(0);
  strokeWeight(1.5);

  let cA = color(0, 255, 80);
  let cB = color(60, 255, 220);

  for (let i = 0; i < hSquares.length; i++) {
    fill((i + li) % 2 === 0 ? cA : cB);
    let p = hSquares[i];
    rect(p.x, p.y, squareSize, squareSize);
  }

  for (let i = 0; i < vSquares.length; i++) {
    fill((i + li) % 2 === 0 ? cB : cA);
    let p = vSquares[i];
    rect(p.x, p.y, squareSize, squareSize);
  }
}

function bright(x, y) {
  let index = 4 * (x + y * width);
  return pg.pixels[index] > 10;
}

function sampleLine(cx, cy, horiz) {
  let count = 0;
  let total = 0;

  for (let d = -step; d <= step; d++) {
    let x = horiz ? cx + d : cx;
    let y = horiz ? cy : cy + d;

    if (x >= 0 && x < width && y >= 0 && y < height) {
      if (bright(x, y)) count++;
      total++;
    }
  }

  return total === 0 ? 0 : count / total;
}
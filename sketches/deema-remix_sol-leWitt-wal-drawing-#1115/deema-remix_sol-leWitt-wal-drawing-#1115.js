let unicorn = [
  [194, 29, 12],   // Red
  [203, 78, 39],   // Orange
  [238, 184, 46],  // Yellow
  [72, 148, 61],   // Green
  [15, 106, 169],  // Blue
  [105, 98, 148],  // Purple
  [14, 131, 37]    // Dark green
];

let amount = 24;
let step;
let rings = 70;

function setup() {
  createCanvas(1000, 1000);
  frameRate(15);
  rectMode(CENTER);
  step = 360 / amount;
  noStroke();
}

function draw() {
  background(14, 131, 37); // light background like paper

  // ---- GRID BACKGROUND ----
  let cols = 35;
  let rows = 20;

  let w = width / cols;
  let h = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let c = random(unicorn);
      fill(c[0], c[1], c[2]);

      rect(i * w, j * h, 30, random(30, 150));
    }
  }

  // ---- CONCENTRIC CIRCLES ----
  push();
  translate(width / 2, height / 2);

  for (let r = 0; r < rings; r++) {

    let radius = map(r, 0, rings, 10, 500);
    let size = map(r, 0, rings, 15, 80);

    for (let i = 0; i < 40; i++) {
      drawCircle(i, radius, size);
    }
  }

  pop();
}

// ---- DRAW SEGMENTS ----
function drawCircle(i, radius, size) {
  push();

  rotate(radians(i * step));

  let c = random(unicorn);
  fill(c[0], c[1], c[2]);

  rect(radius, 0, random(30, 90), size);

  pop();
}
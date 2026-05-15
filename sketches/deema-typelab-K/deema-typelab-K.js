let pg;
let font;

let cols = 100;
let rows = 100;

function preload() {
  font = loadFont("PTSerif-Regular.ttf");
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  frameRate(24);
  noStroke();

  // offscreen buffer
  pg = createGraphics(1000, 1000);
  pg.pixelDensity(1);

  pg.background(0);
  pg.fill(255);
  pg.textFont(font);
  pg.textSize(400);
  pg.textAlign(CENTER, CENTER);

  // draw letter
  pg.text("K", pg.width / 2, pg.height / 2);
}

function draw() {
  background(0);
  lights();
  translate(0, -height * 0.1, 0); // 10% of canvas height upward

  rotateY(frameCount * 0.01 + mouseX * 0.005);

  let tileW = width / cols;
  let tileH = height / rows;
  const SCALE = 1.82; // 1.4 × 1.3 (+30%)

  pg.loadPixels();

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      let px = floor(x * tileW);
      let py = floor(y * tileH);

      let c = pg.get(px, py);

      let b = (red(c) + green(c) + blue(c)) / 3;

      if (b > 100) {
        push();

        let posX = (x * tileW - width / 2) * SCALE;
        let posY = (y * tileH - height / 2) * SCALE;

        let z = cos(frameCount * 0.05 + (x + y) * 0.9) * 50 * SCALE;

        translate(posX, posY, z);

        // color varation
        fill(100 * tan(x * 0.9), y * 2, 170);

        let s = map(sin(frameCount * 0.05 + x), -1, 1, 2, 10);

        sphere(s * SCALE);

        rotateX(frameCount * 0.9);

        pop();
      }
    }
  }
}
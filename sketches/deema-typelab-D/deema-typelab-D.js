let pg; 
let font;

let rows = 150;
let cols = 150;

function preload() {
  font = loadFont("PTSerif-Italic.ttf");
}

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  noStroke();

  // create offscreen graphics
  pg = createGraphics(width, height);
  pg.pixelDensity(1);

  // draw big "D"
  pg.background(0);
  pg.fill(255);
  pg.textFont(font);
  pg.textSize(500);
  pg.textAlign(CENTER, CENTER);

  pg.push();
  pg.translate(width/2, height/2-50);
  pg.text("D", 0, 0);
  pg.pop();
}

function draw() {
  background(0);

  textFont(font);
  textSize(10);
  fill(255, 90);

  let tilesW = width / rows;
  let tilesH = height / cols;

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {

      let px = int(x * tilesW);
      let py = int(y * tilesH);

      let c = pg.get(px, py);

      let b = (red(c) + green(c) + blue(c)) / 3;

      if (b > 1) {

        push();

        translate(x * tilesW, y * tilesH);

        let angle = sin(frameCount * 0.08 + (x + y) * 0.2) * PI;
        rotate(angle);

        text("D", 0, 0);

        pop();
      }
    }
  }
}
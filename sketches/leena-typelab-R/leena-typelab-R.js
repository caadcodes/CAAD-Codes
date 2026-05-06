let pg;
let fonts = [];
let fontIndex = 0;

// Add your font files to the sketch's assets, then list them here
const fontURLs = [
  'TINY5x3-100.otf',
  'TINY5x3-120.otf',
  'TINY5x3-140.otf',
  'TINY5x3-160.otf',
  'TINY5x3-180.otf',
  'TINY5x3-200.otf',
];

function preload() {
  for (let i = 0; i < fontURLs.length; i++) {
    fonts[i] = loadFont(fontURLs[i]);
  }
}

function setup() {
  createCanvas(1000, 1000);
  pg = createGraphics(width, height);
  pg.noStroke();
}

function draw() {
  pg.fill(0, 20);
  pg.rect(0, 0, pg.width, pg.height);

  let r = 128 + sin(frameCount * 0.05) * 127;
  let g = 128 + sin(frameCount * 0.07) * 127;
  let b = 128 + sin(frameCount * 0.09) * 127;

  pg.fill(r, g, b);
  pg.textAlign(CENTER, CENTER);
  pg.textFont(fonts[fontIndex]);
  pg.textSize(1000);

let x = pg.width / 2 + tan(frameCount * 0.05) * 100;
let y = pg.height / 2 + tan(frameCount * 0.03) * 50;

  pg.text("R", x, y);

  image(pg, 0, 0);
}

function mousePressed() {
  fontIndex = (fontIndex + 1) % fonts.length;
}
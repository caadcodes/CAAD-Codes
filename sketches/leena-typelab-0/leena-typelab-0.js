let pg;
let font;

function setup() {
  createCanvas(1000, 1000);
  pg = createGraphics(800, 800);
  pixelDensity(1);
  font = loadFont("Roboto-Bold.ttf");
  frameRate(30);
}

function draw() {
  background(0);

  pg.background(0);
  pg.fill(255);
  pg.textFont(font);
  pg.textSize(800);
  pg.push();
  pg.translate(pg.width / 2, pg.height / 2);
  pg.textAlign(CENTER, CENTER);
  pg.text("0", 0, 0);
  pg.pop();

  image(pg, 100, 0);

  let tilesX = 100;
  let tilesY = 100;
  let tileW = width / tilesX;
  let tileH = height / tilesY;

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      let wave = int(
        sin(frameCount * 0.05 + (x / 3 + y / 3) * 0.07) * 20 *
        sin(frameCount * 0.1 + (x / 3 - y / 3) * 0.07)
      );

      let sx = x / tileW - wave;
      let sy = y * tileH;
      let sw = tileW;
      let sh = tileH;

      let dx = x * tileW;
      let dy = y * tileH;
      let dw = tileW;
      let dh = tileH;

      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
}
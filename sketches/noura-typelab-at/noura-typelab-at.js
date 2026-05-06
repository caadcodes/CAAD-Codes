let pg;
let myFont;
let cols = 80;
let rows = 80;

function preload() {
  myFont = loadFont("TickingTimebombBB_ital.ttf");
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  frameRate(24);

  pg = createGraphics(1000, 1000);
  pg.pixelDensity(1); // important — prevents retina scaling issues
  pg.background(0);
  pg.fill(255);
  pg.noStroke();
  pg.textFont(myFont);
  pg.textSize(400);
  pg.textAlign(CENTER, CENTER);
  pg.text("@", 500, 500);
  pg.loadPixels();
}

function getBrightness(x, y) {
  let index = (x + y * 1000) * 4;
  return pg.pixels[index]; // just red channel is enough
}

function draw() {
  background(0);
  lights();
  blendMode(ADD);

  let tileW = width / cols;
  let tileH = height / rows;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let px = int(x * tileW);
      let py = int(y * tileH);
      let bright = getBrightness(px, py);

      if (bright > 100) {
        push();
        let posX = x * tileW - width / 2;
        let posY = y * tileH - height / 2;
        let z = (frameCount * 5 + y * 10) % 200 - 100;
        translate(posX, posY, z);

        let d = dist(
          mouseX - width / 2,
          mouseY - height / 2,
          posX, posY
        );

        if (d < 80) {
          noStroke();
          fill(0, 255, 120);
          textFont(myFont);
          textSize(15);
          textAlign(CENTER, CENTER);
          let chars = "0@";
          let c = chars.charAt(int(random(chars.length)));
          text(c, 0, 0);
        } else {
          noFill();
          stroke(0, 255, 120);
          strokeWeight(1.5);
          let barLength = map(sin(frameCount * 0.05 + x), -1, 1, 10, 40);
          if (random(1) > 0.1) {
            line(0, 0, 0, 0, 0, z + barLength);
          }
        }
        pop();
      }
    }
  }
}
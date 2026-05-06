let font;
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let rain = [];

let seaLevel = 0;
let ampersandScale = 1.0;

let maskGraphics;

function preload() {
  font = loadFont('HelloChristmas-1Ge70.ttf');
}

function setup() {
  createCanvas(1000, 1000);
  textAlign(CENTER, CENTER);

  // offscreen mask
  maskGraphics = createGraphics(width, height);
  maskGraphics.pixelDensity(1);
  maskGraphics.textAlign(CENTER, CENTER);
  maskGraphics.textFont(font);

  // create rain
  for (let i = 0; i < 200; i++) {
    rain.push(new Raindrop());
  }
}

function draw() {
  background(5, 10, 20);

  // update logic
  if (!mouseIsPressed) {
    if (seaLevel < height) {
      seaLevel += 3.5;
      ampersandScale = map(seaLevel, 0, height, 0.7, 2.5);
    }

    for (let d of rain) {
      d.fall();
    }
  }
  
  maskGraphics.clear();
  maskGraphics.background(0);
  maskGraphics.fill(255);
  maskGraphics.noStroke();
  maskGraphics.textSize(600 * ampersandScale);
  maskGraphics.text("&", width / 2, height / 2 + 350);

  // draw rain (behind)
  for (let d of rain) {
    d.display();
  }

  let spacing = 15;

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {

      // check mask pixel
      let cMask = maskGraphics.get(x, y);
      let insideAmpersand = cMask[0] > 128;

      let insideSea = y > (height - seaLevel);

      let c = random(chars);

      if (insideAmpersand) {
        textSize(18);
        fill(173, 216, 230);
        text(c, x, y);
      } 
      else if (insideSea) {
        let ripple = 0;
        if (!mouseIsPressed) {
          ripple = sin(frameCount * 0.05 + x * 0.1) * 4;
        }

        textSize(10);
        fill(40, 90, 255, 180);
        text(c, x, y + ripple);
      }
    }
  }
}

// rain system
class Raindrop {
  constructor() {
    this.init();
  }

  init() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = random(7, 15);
    this.c = random(chars);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height - seaLevel) {
      this.init();
    }
  }

  display() {
    fill(180, 210, 255, 150);
    textSize(14);
    text(this.c, this.x, this.y);
  }
}

// reset
function keyPressed() {
  if (key === 'r' || key === 'R') {
    seaLevel = 0;
  }
}
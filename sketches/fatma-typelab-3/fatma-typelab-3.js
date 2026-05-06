let pg;
let font;
let dots = [];

let loopFrames = 240;

let cC;
let cTR;
let cBL;

function preload() {
  font = loadFont("SoftcoreTRIAL-Medium.otf");
}

function setup() {
  createCanvas(1000, 1000);
  pixelDensity(1);
  frameRate(30);
  smooth();

  cC = color("#FF8B8D");
  cTR = color("#FFB640");
  cBL = color("#5A61FF");

  pg = createGraphics(width, height);
  pg.pixelDensity(1);

  pg.background(255);
  pg.fill(0);
  pg.noStroke();
  pg.textFont(font);
  pg.textSize(800);
  pg.textAlign(CENTER, CENTER);

  pg.push();
  pg.translate(pg.width / 2, pg.height / 2 - 90);
  pg.text("3", 0, 0);
  pg.pop();

  pg.loadPixels();

  for (let y = 0; y < pg.height; y += 14) {
    for (let x = 0; x < pg.width; x += 14) {
      let loc = 4 * (x + y * pg.width);

      if (loc < pg.pixels.length) {
        let r = pg.pixels[loc];
        let g = pg.pixels[loc + 1];
        let b = pg.pixels[loc + 2];

        let bright = (r + g + b) / 3;

        if (bright < 200) {
          dots.push(
            new DotTriple(
              x + random(-2.2, 2.2),
              y + random(-2.2, 2.2)
            )
          );
        }
      }
    }
  }
}

function draw() {
  background(0);

  let t = (frameCount % int(loopFrames)) / loopFrames;

  let sep;
  let exp;

  if (t < 0.18) {
    sep = 0;
    exp = 0;
  } else if (t < 0.45) {
    sep = ease(map(t, 0.18, 0.45, 0, 1));
    exp = 0;
  } else if (t < 0.75) {
    sep = 1;
    exp = ease(map(t, 0.45, 0.75, 0, 1));
  } else {
    sep = ease(map(t, 0.75, 1, 1, 0));
    exp = ease(map(t, 0.75, 1, 1, 0));
  }

  for (let d of dots) {
    d.update(sep, exp);
    d.display();
  }
}

function ease(t) {
  return t * t * (3 - 2 * t);
}

class DotTriple {
  constructor(x, y) {
    this.hC = createVector(x, y);
    this.hTR = this.hC.copy();
    this.hBL = this.hC.copy();

    this.pC = this.hC.copy();
    this.pTR = this.hC.copy();
    this.pBL = this.hC.copy();

    this.rx = map(x, 0, width, -1, 1);
    this.ry = map(y, 0, height, -1, 1);

    this.sTR = createVector(
      38 + random(-10, 10),
      -38 + random(-10, 10)
    );

    this.sBL = createVector(
      -38 + random(-10, 10),
      38 + random(-10, 10)
    );

    this.sC = createVector(
      random(-10, 10),
      random(-10, 10)
    );

    this.no = random(1000);
  }

  update(sep, exp) {
    let t = frameCount * 0.16;
    let bm = 0.28 + 0.72 * max(sep, exp);

    let w1 = sin(t + this.no);
    let w2 = cos(t * 1.2 + this.no);
    let w3 = sin(t * 1.5 + this.no * 0.7);

    let fc = p5.Vector.sub(
      this.hC,
      createVector(width / 2, height / 2)
    );

    if (fc.mag() > 0) {
      fc.normalize();
    }

    let extras = [
      createVector(w1 * 16 + this.rx * 10, -w2 * 14 + this.ry * 5),
      createVector(-w2 * 16 + this.rx * 6, w3 * 14 - this.ry * 10),
      createVector(
        cos(t * 1.4 + this.no) * 16 + this.rx * 8,
        sin(t * 1.1 + this.no) * 14 - this.ry * 8
      )
    ];

    let seps = [this.sTR, this.sBL, this.sC];
    let homes = [this.hTR, this.hBL, this.hC];
    let pos = [this.pTR, this.pBL, this.pC];

    for (let i = 0; i < 3; i++) {
      extras[i].add(p5.Vector.mult(fc, 16 * exp));

      let target = p5.Vector.add(
        homes[i],
        p5.Vector.mult(seps[i], sep)
      );

      target.add(p5.Vector.mult(extras[i], bm));
      pos[i].set(target);
    }
  }

  display() {
    stroke(0);
    strokeWeight(1);

    let cols = [cBL, cTR, cC];
    let pos = [this.pBL, this.pTR, this.pC];

    for (let i = 0; i < 3; i++) {
      fill(cols[i]);
      ellipse(pos[i].x, pos[i].y, 11, 11);
    }
  }
}
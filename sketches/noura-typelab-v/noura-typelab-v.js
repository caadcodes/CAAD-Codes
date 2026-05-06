let pg;
let flipped = false;
let invert = false;
let t = 0;

function setup() {
  createCanvas(850, 850, WEBGL);
  frameRate(5);
  pg = createGraphics(850, 850);
  pg.pixelDensity(1);
}

function draw() {
  t += 0.1;

  // draw directly to pg — no beginDraw/endDraw needed
  pg.textSize(200);
  pg.textAlign(CENTER, CENTER);

  if (invert) {
    pg.background(random(100), random(200), random(200));
    pg.fill(0);
  } else {
    pg.background(0);
    pg.fill(255);
  }

  let shift = invert ? sin(t) * 20 : 0;

  if (!flipped) {
    pg.push();
    pg.translate(200 + shift, 500 + shift);
    pg.rotate(-HALF_PI);
    pg.text("V", 0, 0);
    pg.pop();

    pg.push();
    pg.translate(350 - shift, 650 + shift);
    pg.text("V", 0, 0);
    pg.pop();

    pg.push();
    pg.translate(500 + shift, 650 - shift);
    pg.text("V", 0, 0);
    pg.pop();

    pg.push();
    pg.translate(650 - shift, 500 - shift);
    pg.rotate(HALF_PI);
    pg.text("V", 0, 0);
    pg.pop();

  } else {
    pg.push();
    pg.translate(200 - shift, 500 - shift);
    pg.rotate(HALF_PI);
    pg.text("V", 0, 0);
    pg.pop();

    pg.push();
    pg.translate(350 + shift, 650 - shift);
    pg.text("V", 0, 0);
    pg.pop();

    pg.push();
    pg.translate(500 - shift, 650 + shift);
    pg.text("V", 0, 0);
    pg.pop();

    pg.push();
    pg.translate(650 + shift, 500 + shift);
    pg.rotate(-HALF_PI);
    pg.text("V", 0, 0);
    pg.pop();
  }

  image(pg, -width / 2, -height / 2);
}

function mousePressed() {
  flipped = !flipped;
  invert = !invert;
}
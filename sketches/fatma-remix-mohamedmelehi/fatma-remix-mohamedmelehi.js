/* p5.js port of Fatma's Mohamed Melehi remix.

   p5 has no equivalent of Processing's loadShape() / shape() for SVGs,
   so we fetch each SVG as text, inject explicit width/height matching
   the file's own viewBox, and feed the result to loadImage() through a
   Blob URL. The two groups of waves are authored at DIFFERENT sizes
   (top-left waves at their natural shape size 153–693 × 204–435;
   bottom-right waves at the full canvas 700×805 with the wave already
   positioned inside) — so we draw each at its NATIVE size and let
   translate() handle every offset. Forcing both to 700×805 made the
   small top-left SVGs stretch up by ~4× and overwhelm the canvas.

   Timing runs off elapsed milliseconds rather than frameCount so
   Chrome (rAF often at 60+ Hz) and Safari stay in lockstep —
   frameRate(30) only caps draws, it doesn't guarantee one tick per
   advance. */

const TOP_NAMES = [
  'redWave1', 'greenWave1', 'pinkWave1',
  'greenWave2', 'pinkWave2',
  'greenWave3', 'pinkWave3',
];
const BOT_NAMES = [
  'redWave2', 'greenWave4', 'pinkWave4',
  'greenWave5', 'pinkWave5',
  'greenWave6', 'pinkWave6',
];

const waves = {};   // name → p5.Image
let svgReady = false;

// ENTRANCE
const waveDuration = 120;   // frames each pair takes to slide in
const waveDelay    = 30;    // frame gap between consecutive pair starts
const startingDist = 180;   // diagonal offset (pixels) waves begin at
const totalPairs   = 7;

// CONTINUOUS MOTION
const inOutTime     = 30;
const inOutDistance = 10;

let startMillis = 0;

function preload() {
  /* Empty — SVG loading is async (fetch + Blob + loadImage callback) and
     happens in setup(); we gate the animation behind svgReady. */
}

function setup() {
  createCanvas(700, 805);
  pixelDensity(1);
  frameRate(30);

  loadAllWaves().then(() => {
    svgReady = true;
    startMillis = millis();
  });
}

async function loadAllWaves() {
  const allNames = [...TOP_NAMES, ...BOT_NAMES];

  await Promise.all(allNames.map(async (name) => {
    const text = await fetch(`${name}.svg`).then(r => r.text());

    /* Pull the viewBox dimensions out of the root <svg> tag and inject
       matching width/height so the browser rasterises at the artwork's
       authored size. Without explicit width/height, browsers default to
       300×150 — which is too small for the larger SVGs in this set and
       blurs them when drawn. With viewBox-matched dimensions every SVG
       renders crisply at its natural shape size. */
    const vb = (text.match(/viewBox\s*=\s*"\s*[\d.\-]+\s+[\d.\-]+\s+([\d.\-]+)\s+([\d.\-]+)/i) || []);
    const vbW = parseFloat(vb[1]) || 700;
    const vbH = parseFloat(vb[2]) || 805;

    const enriched = text.replace(
      /<svg\b([^>]*)>/i,
      `<svg$1 width="${vbW}" height="${vbH}">`
    );

    const blob = new Blob([enriched], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);

    await new Promise((resolve, reject) => {
      waves[name] = loadImage(
        url,
        () => { URL.revokeObjectURL(url); resolve(); },
        (err) => { URL.revokeObjectURL(url); reject(err); }
      );
    });
  }));
}

function draw() {
  background(0);
  circles();

  if (!svgReady) return;

  /* Elapsed time → 30fps virtual frames, so the entrance/motion
     constants below keep their original numeric meaning. */
  const t = (millis() - startMillis) * 30 / 1000;
  const entryEndT = (totalPairs - 1) * waveDelay + waveDuration;

  if (t < entryEndT) {
    drawEntrance(t);
  } else {
    drawInOutMotion(t - entryEndT);
  }
}

function drawEntrance(t) {
  /* Walk pairs from 6 → 0 so later pairs render on top of earlier ones
     — same back-to-front order as the Processing source. */
  for (let pair = 6; pair >= 0; pair--) {
    const startT = pair * waveDelay;
    const p = constrain((t - startT) / waveDuration, 0, 1);
    if (p <= 0) continue;

    const ease = 0.5 - 0.5 * cos(PI * p);   // cosine ease-in-out

    drawWave(getTopWave(pair),    ease, -startingDist, -startingDist);
    drawWave(getBottomWave(pair), ease,  startingDist,  startingDist);
  }
}

function drawInOutMotion(afterT) {
  const loop           = (afterT % inOutTime) / inOutTime;
  const motionProgress = 0.5 - 0.5 * cos(PI * loop);
  const back           = -inOutDistance * sin(PI * motionProgress);

  for (const name of TOP_NAMES) drawShiftedWave(waves[name],  back,  back);
  for (const name of BOT_NAMES) drawShiftedWave(waves[name], -back, -back);
}

function drawWave(waveImg, ease, startOffsetX, startOffsetY) {
  push();
  translate(
    lerp(startOffsetX, 0, ease),
    lerp(startOffsetY, 0, ease)
  );
  /* Draw at each SVG's NATIVE rasterised size. Top-left waves are small
     and sit at the canvas top-left; bottom-right waves are full-canvas
     with the wave positioned internally. translate() handles every
     positional offset, identical to the Processing original. */
  image(waveImg, 0, 0);
  pop();
}

function drawShiftedWave(waveImg, shiftX, shiftY) {
  push();
  translate(shiftX, shiftY);
  image(waveImg, 0, 0);
  pop();
}

function getTopWave(pair) {
  return waves[TOP_NAMES[pair]];
}

function getBottomWave(pair) {
  return waves[BOT_NAMES[pair]];
}

function circles() {
  push();
  translate(width / 2, height / 2);
  noStroke();

  fill(255);       ellipse(0, 0, 690, 690);
  fill('#e8bd1f'); ellipse(0, 0, 615, 615);
  fill('#db9028'); ellipse(0, 0, 540, 540);
  fill('#da3832'); ellipse(0, 0, 470, 470);
  fill('#656f9d'); ellipse(0, 0, 395, 395);
  pop();
}

function mousePressed() {
  startMillis = millis();
}

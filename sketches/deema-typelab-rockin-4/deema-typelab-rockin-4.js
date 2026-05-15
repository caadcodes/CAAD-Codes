/* p5.js port of Processing + Geomerative + processing.sound (P3D → WEBGL)
   for "Rockin' 4" — mic-reactive FFT sketch, three layers (bass / treble /
   mids) drawn over the glyph contour of the digit "4".

   Centring (WEBGL):
     - In WEBGL the origin is already at the canvas centre.
     - opentype.js gives glyph points with the baseline at y=0 and the body
       extending into negative y; the bbox is NOT centred at (0, 0).
     - We compute glyphCenterX / glyphCenterY from the sampled bbox and
       fold them into the per-layer translate, which centres the glyph at
       the WEBGL origin with a +200 downward bias:
           all layers:     translate(-glyphCenterX, -glyphCenterY + 200)

   Sampling:
     - SVGPathElement.getPointAtLength at 1-unit spacing (POLY=1, tighter
       than RG.setPolygonizerLength(2) in the source) so the bbox catches
       every extremity of the "4" outline, including the bottom curve.

   Audio:
     - p5.AudioIn → p5.FFT, started on first click via userStartAudio().
     - fft.analyze() returns 0-255; Processing's processing.sound.FFT
       returned 0-1, so we normalise (÷ 255) and the source's
       bass *= 10 / treb / mids *= 200 constants stay meaningful.
     - Per-layer caps and tight tan-constrains keep the visuals tight to
       the letter outline so the form stays recognisable. */

let font = null;
let points = [];
let glyphCenterX = 0;
let glyphCenterY = 0;

let mic = null;
let fft = null;
let micStarted = false;
const FFT_BINS = 256; // analyze() returns 128 amplitude values

let blue, red;

function preload() {
  opentype.load('Arial Black.ttf', (err, f) => {
    if (err) { console.error('Font load failed:', err); return; }
    font = f;
    buildPoints();
  });
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  pixelDensity(1);

  blue = [
    color(127, 166, 214),
    color( 74, 111, 165),
    color( 31,  58,  95),
  ];
  red = [
    color(225,   6,   0),
    color(180,   0,   0),
  ];
}

function buildPoints() {
  const otPath = font.getPath('4', 0, 0, 700);

  /* Split commands by moveTo; rebuild each contour as an SVG path string
     so we can use SVGPathElement.getPointAtLength for arc-length sampling. */
  const contourDs = [];
  let current = '';
  for (const cmd of otPath.commands) {
    if (cmd.type === 'M') {
      if (current) contourDs.push(current);
      current = `M ${cmd.x} ${cmd.y}`;
    } else if (cmd.type === 'L') {
      current += ` L ${cmd.x} ${cmd.y}`;
    } else if (cmd.type === 'C') {
      current += ` C ${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`;
    } else if (cmd.type === 'Q') {
      current += ` Q ${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`;
    } else if (cmd.type === 'Z') {
      current += ' Z';
    }
  }
  if (current) contourDs.push(current);

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const POLY = 1; // 1-unit step — denser than RG.setPolygonizerLength(2)
  const SVG = document.createElementNS.bind(document);

  for (const d of contourDs) {
    const svgPath = SVG(SVG_NS, 'path');
    svgPath.setAttribute('d', d);
    const total = svgPath.getTotalLength();
    if (total === 0) continue;
    const n = max(2, floor(total / POLY));
    for (let i = 0; i < n; i++) {
      const pt = svgPath.getPointAtLength((i / n) * total);
      points.push({ x: pt.x, y: pt.y });
    }
  }

  /* Bbox of all sampled points → glyph centre. Folded into the per-layer
     translate below; the points themselves stay in raw opentype coords. */
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  glyphCenterX = (minX + maxX) / 2;
  glyphCenterY = (minY + maxY) / 2;
}

function draw() {
  background(0);
  if (points.length === 0) return;

  /* Resting state — bass-layer outline with no animation and no z. Black
     fill so the inner triangle of the "4" reads correctly through the
     contour-bridge artefact. */
  if (!micStarted) {
    push();
    translate(-glyphCenterX, -glyphCenterY + 50);
    stroke(127, 166, 214);
    strokeWeight(1.5);
    fill(0, 0, 0);
    beginShape();
    for (const p of points) vertex(p.x, p.y, 0);
    endShape(CLOSE);
    pop();
    return;
  }

  /* Normalise raw 0-255 amplitudes to 0-1 so the Processing-side constants
     scale the same way they did in the .pde source. */
  const raw = fft.analyze();
  const spectrum = new Array(raw.length);
  for (let i = 0; i < raw.length; i++) spectrum[i] = raw[i] / 255;

  // ---- BASS (blue contour, z-jittered vertices) ----
  push();
  let bass = 0;
  for (let i = 0; i < 10; i++) bass += spectrum[i];
  bass *= 10;

  translate(-glyphCenterX, -glyphCenterY + 50);
  stroke(blue[int(random(blue.length))]);
  strokeWeight(map(bass, 0, 5, 1, 4, true));
  noFill();

  beginShape();
  for (let i = 0; i < points.length; i++) {
    const x = points[i].x;
    const y = points[i].y;
    /* tan() with a tight [-1.5, 1.5] clamp brings back the sharp jagged
       character of the Processing source. The tighter clamp (vs the
       source's [-3, 3]) plus the smaller multiplier keeps the asymptote
       jumps contained so vertices stay on-screen. */
    const t = constrain(tan(frameCount * 0.02 + i * 0.1), -1.5, 1.5);
    const z = t * bass * 2;
    vertex(x, y, z);
  }
  endShape(CLOSE);
  pop();

  // ---- TREBLE (red radial lines, dense hatching) ----
  push();
  translate(-glyphCenterX, -glyphCenterY + 50);

  let treb = spectrum[50] * 200;
  if (treb > 6) treb = 6;   // dense hatching — radial lines extend ≤6px outward

  for (let i = 0; i < points.length; i++) {
    const x = points[i].x;
    const y = points[i].y;
    /* Origin-relative direction needs a non-zero source; skip exactly-zero
       points so dir.normalize() can't divide by zero. */
    if (x === 0 && y === 0) continue;

    const dir = createVector(x, y);
    dir.normalize();
    const x2 = x + dir.x * treb;
    const y2 = y + dir.y * treb;

    stroke(red[int(random(red.length))]);
    /* strokeWeight not scaled by treb — keeps the shimmer subtle
       regardless of how loud the treble peak is. */
    strokeWeight(random(0.5, 1));
    noFill();
    line(x, y, x2, y2);
  }
  pop();

  // ---- MIDS (yellow contour, xy-offset and z-jittered) ----
  push();
  let mids = 0;
  for (let i = 0; i < 10; i++) mids += spectrum[i];
  mids *= 200;
  if (mids > 50) mids = 50;   // safety cap

  translate(-glyphCenterX, -glyphCenterY + 50);
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    const x = points[i].x;
    const y = points[i].y;

    const txy = constrain(tan(frameCount * 0.05 + i * 0.01), -1.5, 1.5);
    const offsetX = txy * mids * 0.02;
    const offsetY = txy * mids * 0.02;

    const alpha = map(abs(txy), 0, 2, 100, 255);
    stroke(255, 220, 0, alpha);

    const tz = constrain(tan(frameCount * 0.03 + i * 0.01), -2, 2);
    const z  = tz * mids * 2;

    vertex(x + offsetX, y + offsetY, z);
  }
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  if (micStarted) return;
  /* AudioContext resume must come from a user gesture; mic start must
     finish before FFT.setInput is called against it. */
  userStartAudio().then(() => {
    mic = new p5.AudioIn();
    mic.start(
      () => {
        fft = new p5.FFT(0.8, FFT_BINS);
        fft.setInput(mic);
        micStarted = true;
      },
      (err) => { console.warn('Mic permission denied:', err); }
    );
  });
}

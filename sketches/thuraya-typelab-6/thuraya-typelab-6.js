/* p5.js port of the Processing + Geomerative + processing.sound version
   of "6". Same conversion patterns as elsewhere in this project:
     - opentype.load gets us an opentype.Font; we walk path commands and
       split a contour at every moveTo, mirroring RShape.getPointsInPaths().
     - Each contour is rebuilt as an SVG path string and sampled with
       getTotalLength / getPointAtLength at ≈15-unit spacing — the direct
       equivalent of RG.setPolygonizerLength(15).
     - opentype.js already emits commands in canvas convention (y down,
       glyph body above baseline → negative y), so we draw the points
       as-is without any y-flip. Adding a negation here would render
       the "6" upside-down.
     - bbox centre is folded into the per-frame translate, so the original
       translate(width/2, height/2 + 100) carries over verbatim.
   Audio uses p5.AudioIn / p5.Amplitude. Browsers require a user gesture
   to start mic capture, so a "Click to enable microphone" splash takes the
   first click and only then begins the sketch. */

let font = null;
let pts = [];        // pts[contour][i]   = {x, y}
let seeds = [];      // seeds[contour][i] = random(1000)
let glyphCx = 0, glyphCy = 0;

let mic = null;
let amp = null;
let micStarted = false;

let smoothVol = 0;
let peakVol   = 0;
let t = 0;

function preload() {
  /* opentype.load is async; preload doesn't block on it. setup() and the
     splash screen run in parallel — pts only become non-empty once
     buildPoints() finishes, and draw() guards on that. */
  opentype.load('KalashRegular.ttf', (err, f) => {
    if (err) { console.error('Font load failed:', err); return; }
    font = f;
    buildPoints();
  });
}

function setup() {
  createCanvas(800, 800);
  noStroke();
  /* mic / amp are constructed inside the click handler (mousePressed)
     so the entire audio graph is built in response to a user gesture —
     this is the most reliable shape for getUserMedia across browsers. */
}

function buildPoints() {
  /* Split the glyph outline into one SVG path per contour, then sample
     each contour at uniform arc-length. RShape.getPointsInPaths() returns
     a 2D array (one row per sub-path); we mirror that with a 2D pts[][]. */
  const otPath = font.getPath('6', 0, 0, 400);

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
  const POLY = 15; // RG.setPolygonizerLength(15)

  for (const d of contourDs) {
    const svgPath = document.createElementNS(SVG_NS, 'path');
    svgPath.setAttribute('d', d);
    const total = svgPath.getTotalLength();
    if (total === 0) continue;
    const n = max(2, floor(total / POLY));
    const contour = [];
    const seedRow = [];
    for (let i = 0; i < n; i++) {
      const pt = svgPath.getPointAtLength((i / n) * total);
      contour.push({ x: pt.x, y: pt.y });
      seedRow.push(random(1000));
    }
    pts.push(contour);
    seeds.push(seedRow);
  }

  /* Bbox centre — Geomerative's CENTER alignment in one shot. We fold
     this into the translate rather than mutating points, so the original
     coordinate values stay untouched. */
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const c of pts) {
    for (const q of c) {
      if (q.x < minX) minX = q.x;
      if (q.x > maxX) maxX = q.x;
      if (q.y < minY) minY = q.y;
      if (q.y > maxY) maxY = q.y;
    }
  }
  glyphCx = (minX + maxX) / 2;
  glyphCy = (minY + maxY) / 2;
}

function draw() {
  /* Resting state — once the font is parsed, render the "6" as static
     squares at each sampled point so the card preview has something to
     show before the mic is activated. Size 8 matches the constant in
     the animation's s = 8 + e * 80 + ... formula at zero volume. */
  if (!micStarted) {
    background(0);
    if (pts.length > 0) {
      noStroke();
      fill(255, 150);
      translate(width / 2 - glyphCx, height / 2 + 100 - glyphCy);
      for (let i = 0; i < pts.length; i++) {
        for (let j = 0; j < pts[i].length; j++) {
          rect(pts[i][j].x, pts[i][j].y, 8, 8);
        }
      }
    }
    return;
  }

  /* Mic is running — but the font might still be loading. Hold a black
     frame until pts is populated so we don't flash an unrelated state. */
  if (pts.length === 0) {
    background(0);
    return;
  }

  /* Background fade — alpha tied to volume, exactly as in the original. */
  fill(0, int(map(smoothVol, 0, 0.3, 60, 10)));
  noStroke();
  rect(0, 0, width, height);

  /* Original Processing has translate(width/2, height/2 + 100) on a
     CENTER-aligned RShape (bbox already centred). Our points are still in
     raw glyph coords, so we subtract the bbox centre here to get the same
     net positioning. */
  translate(width / 2 - glyphCx, height / 2 + 100 - glyphCy);

  smoothVol = lerp(smoothVol, amp.getLevel(), 0.3);
  peakVol   = max(peakVol * 0.9, smoothVol);
  t += 0.15 + smoothVol * 2;

  const e = map(smoothVol, 0, 0.15, 0, 1);
  const p = map(peakVol,   0, 0.15, 0, 9);

  for (let i = 0; i < pts.length; i++) {
    for (let j = 0; j < pts[i].length; j++) {
      const x  = pts[i][j].x;
      const y  = pts[i][j].y;
      const sd = seeds[i][j];

      const wave = sin(frameCount * 0.2 + j) * e * 80;
      const nx   = (noise(sd,       t * 0.5) - 0.5) * e * 350 + cos(t + sd) * p * 120 + sin(sd) * p * 500;
      const ny   = (noise(sd + 100, t * 0.5) - 0.5) * e * 350 + sin(t + sd) * p * 120 + cos(sd) * p * 500;
      const s    = 8 + e * 80 + p * 60 + noise(sd + 200, t * 0.3) * e * 50;

      if (e > 0.7 && random(1) < e * 0.4) continue;

      fill(map(e, 0, 1, 180, 255), 200 + e * 55);
      rect(x + wave + nx, y + wave + ny, s, s);
    }
  }
}

function mousePressed() {
  if (micStarted) return;
  /* Order: resume AudioContext first (Chrome / Safari autoplay policy),
     THEN construct the mic and call .start() inside its callback so
     amp is wired up only after the mic is confirmed running. */
  userStartAudio().then(() => {
    mic = new p5.AudioIn();
    mic.start(
      () => {
        amp = new p5.Amplitude();
        amp.setInput(mic);
        micStarted = true;
        console.log('[caad] microphone started successfully');
      },
      (err) => { console.warn('Mic permission denied:', err); }
    );
  });
}

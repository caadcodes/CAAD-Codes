// ─────────────────────────────────────────────────────────────────
//  p5.js conversion of sketch_260328_Assignment_2_C.pde
//
//  Original used the Geomerative library to extract outline points
//  from a glyph. This version uses opentype.js to do the same.
//
//  REQUIREMENTS:
//    • opentype.js loaded in your HTML (see index.html below)
//    • Your font file: ABCMarfaMonoVariable-Trial.ttf in the same folder
//
//  HOW IT WORKS:
//    1. opentype.js loads the .ttf and extracts the vector path of "C"
//    2. The path is sampled into evenly-spaced points
//    3. Each point gets a circle whose size is driven by mouseY
//    4. mousePressed → finer/coarser point sampling (like RG.setPolygonizerLength)
// ─────────────────────────────────────────────────────────────────

let points = [];
let font;
let p;
let sampleStep = 4; // distance between sampled points along the glyph path

function preload() {
  // opentype.js is loaded globally via the <script> tag in index.html
  // We load the font here synchronously via a promise bridged into p5's preload
  opentype.load('ABCMarfaVariableVF-Trial.ttf', (err, f) => {
    if (err) {
      console.error('Font could not be loaded:', err);
    } else {
      font = f;
    }
  });
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(20);
}

function draw() {
  background(0);
  noStroke();
  translate(width / 2 - 30, height / 2 + 170);

  // Circle size mapped from mouseY — matches original map(mouseY, 0, height, 10, 900)
  p = map(mouseY, 0, height, 10, 900);

  // Adjust sampling density on mouse press
  // Matches RG.setPolygonizerLength(map(mouseY, 0, height-100, 300, 1))
  // Higher length → fewer points (coarser); lower → more points (finer)
  // We invert: higher mouseY → larger sampleStep (coarser)
  if (mouseIsPressed) {
    sampleStep = map(mouseY, 0, height - 100, 300, 0.3);
    sampleStep = constrain(sampleStep, 0.3, 300);
    points = getGlyphPoints('C', sampleStep);
  }

  // Draw the glyph outline points
  if (points.length > 0) {
    fill(0);
    stroke(255, 200, 240);
    strokeWeight(3);
    for (let i = 0; i < points.length; i++) {
      circle(points[i].x, points[i].y, p);
    }
  }
}

// Called once font is ready; also re-called when sampleStep changes
function getGlyphPoints(char, step) {
  if (!font) return [];

  const fontSize = 550;
  // getPath(char, x, y, fontSize) — x/y is baseline origin
  // We pass 0,0 because translate() handles centering
  const path = font.getPath(char, 0, 0, fontSize);

  return sampleOpenTypePath(path, step);
}

// Sample points along an opentype.js path by stepping through each command
function sampleOpenTypePath(path, step) {
  const pts = [];
  let cx = 0, cy = 0; // current pen position
  let sx = 0, sy = 0; // start of current subpath (for Z closepath)

  for (const cmd of path.commands) {
    switch (cmd.type) {
      case 'M':
        cx = cmd.x; cy = cmd.y;
        sx = cx;    sy = cy;
        pts.push({ x: cx, y: cy });
        break;

      case 'L':
        sampleLine(cx, cy, cmd.x, cmd.y, step, pts);
        cx = cmd.x; cy = cmd.y;
        break;

      case 'C': // cubic bezier
        sampleCubic(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y, step, pts);
        cx = cmd.x; cy = cmd.y;
        break;

      case 'Q': // quadratic bezier
        sampleQuadratic(cx, cy, cmd.x1, cmd.y1, cmd.x, cmd.y, step, pts);
        cx = cmd.x; cy = cmd.y;
        break;

      case 'Z':
        sampleLine(cx, cy, sx, sy, step, pts);
        cx = sx; cy = sy;
        break;
    }
  }
  return pts;
}

function sampleLine(x0, y0, x1, y1, step, pts) {
  const d = dist(x0, y0, x1, y1);
  const n = max(1, floor(d / step));
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    pts.push({ x: lerp(x0, x1, t), y: lerp(y0, y1, t) });
  }
}

function sampleCubic(x0, y0, x1, y1, x2, y2, x3, y3, step, pts) {
  // Estimate arc length via subdivisions, then sample evenly
  const N = 100;
  let arcLen = 0;
  let prev = { x: x0, y: y0 };
  const tbl = [{ t: 0, len: 0, x: x0, y: y0 }];

  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const mt = 1 - t;
    const px = mt*mt*mt*x0 + 3*mt*mt*t*x1 + 3*mt*t*t*x2 + t*t*t*x3;
    const py = mt*mt*mt*y0 + 3*mt*mt*t*y1 + 3*mt*t*t*y2 + t*t*t*y3;
    arcLen += dist(prev.x, prev.y, px, py);
    tbl.push({ t, len: arcLen, x: px, y: py });
    prev = { x: px, y: py };
  }

  const numPts = max(1, floor(arcLen / step));
  for (let i = 1; i <= numPts; i++) {
    const target = (i / numPts) * arcLen;
    // Find the segment in tbl
    for (let j = 1; j < tbl.length; j++) {
      if (tbl[j].len >= target) {
        const frac = (target - tbl[j-1].len) / (tbl[j].len - tbl[j-1].len);
        pts.push({
          x: lerp(tbl[j-1].x, tbl[j].x, frac),
          y: lerp(tbl[j-1].y, tbl[j].y, frac)
        });
        break;
      }
    }
  }
}

function sampleQuadratic(x0, y0, x1, y1, x2, y2, step, pts) {
  // Convert quadratic to cubic and reuse
  const cx1 = x0 + (2/3) * (x1 - x0);
  const cy1 = y0 + (2/3) * (y1 - y0);
  const cx2 = x2 + (2/3) * (x1 - x2);
  const cy2 = y2 + (2/3) * (y1 - y2);
  sampleCubic(x0, y0, cx1, cy1, cx2, cy2, x2, y2, step, pts);
}

// ── Initial point generation once font is ready ──────────────────
// opentype.load is async; we poll until font is available
function waitForFontAndSample() {
  if (font) {
    points = getGlyphPoints('C', sampleStep);
  } else {
    setTimeout(waitForFontAndSample, 100);
  }
}

// Kick off waiting after p5 starts
window.addEventListener('load', () => {
  waitForFontAndSample();
});
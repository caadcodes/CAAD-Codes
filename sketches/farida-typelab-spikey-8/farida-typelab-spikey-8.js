/* Spikey 8 — p5.js + opentype.js conversion of the original
   Processing + Geomerative sketch. The conversion follows the
   Geomerative→opentype.js patterns:
     - load the font in preload() with p5's loadFont(),
     - reach the underlying opentype Font via .font for path data,
     - walk path commands, splitting contours at every M (moveTo)
       so inner counters stay separate from the outer outline,
     - sample beziers at uniform ~12-unit spacing along each segment
       (the direct equivalent of RG.setPolygonizerLength(12)),
     - negate y because canvas-y points down,
     - re-centre every sampled point around (0, 0) — Geomerative
       does this automatically with the CENTER alignment flag,
       opentype.js does not.
   With those points centred on the origin, the draw-time translate
   is verbatim from the Processing original. */

let myFont;
let allPoints = [];     // array of contours, each contour is array of {x, y}
let dir = 1;

function preload() {
  myFont = loadFont('Monoton-Regular.ttf');
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(60);
  colorMode(HSB, 360, 100, 100);

  // p5.Font wraps an opentype.Font; .font exposes it for direct path access.
  const path = myFont.font.getPath('8', 0, 0, 600);

  /* Polygonizer-length-style sampling: every line, quadratic, and cubic
     Bezier is split into ⌈segmentLength / POLY⌉ steps, so points are
     spaced ≈ POLY units apart along the curve. Long sweeping curves end
     up with many samples (matching the dense feathering of the Processing
     original); short segments stay short. */
  const POLY = 12;
  let contour = [];
  let px = 0, py = 0;

  function pushPt(x, y) { contour.push({ x: x, y: -y }); }   // y flip

  for (const cmd of path.commands) {
    if (cmd.type === 'M') {
      if (contour.length > 0) allPoints.push(contour);
      contour = [];
      pushPt(cmd.x, cmd.y);
      px = cmd.x; py = cmd.y;

    } else if (cmd.type === 'L') {
      const segLen = dist(px, py, cmd.x, cmd.y);
      const n = max(1, ceil(segLen / POLY));
      for (let s = 1; s <= n; s++) {
        const t = s / n;
        pushPt(lerp(px, cmd.x, t), lerp(py, cmd.y, t));
      }
      px = cmd.x; py = cmd.y;

    } else if (cmd.type === 'C') {
      // step count from the control-polygon length (a tight upper bound on
      // the actual arc length — close enough for uniform spacing)
      const approx = dist(px, py, cmd.x1, cmd.y1) +
                     dist(cmd.x1, cmd.y1, cmd.x2, cmd.y2) +
                     dist(cmd.x2, cmd.y2, cmd.x, cmd.y);
      const n = max(2, ceil(approx / POLY));
      for (let s = 1; s <= n; s++) {
        const t = s / n, u = 1 - t;
        const x = u*u*u*px      + 3*u*u*t*cmd.x1 + 3*u*t*t*cmd.x2 + t*t*t*cmd.x;
        const y = u*u*u*py      + 3*u*u*t*cmd.y1 + 3*u*t*t*cmd.y2 + t*t*t*cmd.y;
        pushPt(x, y);
      }
      px = cmd.x; py = cmd.y;

    } else if (cmd.type === 'Q') {
      const approx = dist(px, py, cmd.x1, cmd.y1) + dist(cmd.x1, cmd.y1, cmd.x, cmd.y);
      const n = max(2, ceil(approx / POLY));
      for (let s = 1; s <= n; s++) {
        const t = s / n, u = 1 - t;
        const x = u*u*px + 2*u*t*cmd.x1 + t*t*cmd.x;
        const y = u*u*py + 2*u*t*cmd.y1 + t*t*cmd.y;
        pushPt(x, y);
      }
      px = cmd.x; py = cmd.y;

    } else if (cmd.type === 'Z') {
      if (contour.length > 0) { allPoints.push(contour); contour = []; }
    }
  }
  if (contour.length > 0) allPoints.push(contour);

  /* Geomerative-CENTER equivalent: shift every point so the glyph's
     bbox centre lands at (0, 0). After this the translate in draw() is
     identical to the Processing original. */
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const c of allPoints) {
    for (const p of c) {
      if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
    }
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  for (const c of allPoints) {
    for (const p of c) { p.x -= cx; p.y -= cy; }
  }
}

function draw() {
  background(0);
  /* Verbatim translate from the Processing original — possible because
     the points are now Geomerative-CENTER-equivalent (anchored at 0,0). */
  translate(width / 2 - 30, height / 2 + 20);

  const speed    = map(mouseX, 0, width,  0.01, 0.12);
  const spikeLen = map(mouseY, 0, height, 5,    40);

  for (let i = 0; i < allPoints.length; i++) {
    for (let j = 0; j < allPoints[i].length; j++) {
      const x = allPoints[i][j].x;
      const y = allPoints[i][j].y;
      const hue = (frameCount * 1.5 + j * 5) % 360;

      push();
      translate(x, y);
      rotate(frameCount * speed * dir + j * 0.1);

      for (let k = 0; k < 3; k++) {
        const angle = k * TWO_PI / 3;
        const hk    = (hue + k * 40) % 360;
        stroke(hk, 90, 100);
        strokeWeight(0.8);
        line(0, 0, cos(angle) * spikeLen, sin(angle) * spikeLen);
      }
      pop();
    }
  }
}

function mousePressed() {
  dir *= -1;
}

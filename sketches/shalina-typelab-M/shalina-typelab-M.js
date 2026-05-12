/* p5.js port of Shalina's "m" (originally Processing + Geomerative).

   Original Processing reference:
     RG.setPolygonizerLength(1);
     letterShape = RG.getText("m", "Sandra.ttf", 200, CENTER);
     points = letterShape.getPoints();
     // on press → spreadAmount lerps toward 10, on release toward 0
     // angle = i * 50;  target = original + (cos, sin) * spread
     // points[i] = lerp(points[i], target, 0.2);
     translate(width/2, height/2 + 60);
     fill(#F62DAE); sphere(2) at each point

   Conversion notes:
     - opentype.load gives an opentype.Font; we walk its path commands and
       split a new contour at every moveTo, then rebuild each contour as an
       SVG `d` string sampled with SVGPathElement.getPointAtLength at
       1-unit spacing — the direct equivalent of RG.setPolygonizerLength(1).
     - Sampled points are bbox-centred so the glyph sits at the WEBGL
       origin; the per-frame translate(0, 60) then matches Processing's
       translate(width/2, height/2 + 60) (in WEBGL the origin is already
       the canvas centre, so width/2, height/2 collapses to 0, 0). */

let font = null;
let pts = [];          // mutable points {x, y} — animated each frame
let originalPts = [];  // immutable copies for the spread origin
let spreadAmount = 0;

function preload() {
  opentype.load('Sandra.ttf', (err, f) => {
    if (err) { console.error('Font load failed:', err); return; }
    font = f;
    buildPoints();
  });
}

function setup() {
  createCanvas(800, 600, WEBGL);
  noStroke();
}

function buildPoints() {
  /* Sample the "m" glyph at size 240 (200 × 1.2 — enlarged by 20%). */
  const otPath = font.getPath('m', 0, 0, 240);

  /* Split commands by moveTo; rebuild each contour as an SVG path string. */
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
  const POLY = 1; // RG.setPolygonizerLength(1) — sample every ~1 unit
  const sampled = [];

  for (const d of contourDs) {
    const svgPath = document.createElementNS(SVG_NS, 'path');
    svgPath.setAttribute('d', d);
    const total = svgPath.getTotalLength();
    if (total === 0) continue;
    const n = max(2, floor(total / POLY));
    for (let i = 0; i < n; i++) {
      const pt = svgPath.getPointAtLength((i / n) * total);
      sampled.push({ x: pt.x, y: pt.y });
    }
  }

  /* Bbox-centre so the glyph sits at (0, 0) in WEBGL coords — matches
     Geomerative's CENTER alignment. */
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of sampled) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  for (const p of sampled) {
    const x = p.x - cx;
    const y = p.y - cy;
    pts.push({ x, y });
    originalPts.push({ x, y });
  }
}

function draw() {
  background(0);
  lights();

  /* Hold a black frame until the font has been parsed. */
  if (pts.length === 0) return;

  /* spreadAmount lerps toward 10 while pressed, toward 0 otherwise. */
  spreadAmount = lerp(spreadAmount, mouseIsPressed ? 10 : 0, 0.07);

  /* Each point eases toward originalPoint + (cos(angle), sin(angle)) * spread.
     angle = i * 50 in radians — large multiples → effectively scattered. */
  for (let i = 0; i < pts.length; i++) {
    const angle = i * 50;
    const targetX = originalPts[i].x + cos(angle) * spreadAmount;
    const targetY = originalPts[i].y + sin(angle) * spreadAmount;
    pts[i].x = lerp(pts[i].x, targetX, 0.2);
    pts[i].y = lerp(pts[i].y, targetY, 0.2);
  }

  /* WEBGL origin is the canvas centre. Was translate(0, 60) to match the
     Processing source; the user pulled the glyph up by 10% of canvas
     height (= 60px), so the +60 cancels and we sit at the origin. */
  translate(0, 0);
  noStroke();
  fill('#F62DAE');

  for (let i = 0; i < pts.length; i++) {
    push();
    translate(pts[i].x, pts[i].y, 0);
    sphere(2.4, 8, 6); // 2 × 1.2 — dot radius scales with the 20% enlargement
    pop();
  }
}

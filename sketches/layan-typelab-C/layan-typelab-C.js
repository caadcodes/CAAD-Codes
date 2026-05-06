/* p5.js port of the Processing + Geomerative sketch_260328_C.pde.
   Sampling pattern follows the other Geomerative conversions in this
   project: load the font in preload() (p5.loadFont uses opentype.js
   internally), reach the underlying opentype.Font via .font for
   path data, sample the outline at uniform spacing using the SVG
   DOM's getTotalLength / getPointAtLength, negate y, and re-centre
   every sample around (0, 0) so a single translate(width/2, height/2)
   puts the glyph dead-centre. */

let myFont;
let points = [];
let p;

function preload() {
  myFont = loadFont('ABCMarfaVariableVF-Trial.ttf');
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(20);
  points = sampleGlyph('C', 550, 4);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  p = map(mouseY, 0, height, 10, 900);

  fill(0);
  stroke(255, 200, 240);
  strokeWeight(3);
  for (let i = 0; i < points.length; i++) {
    circle(points[i].x, points[i].y, p);
  }
}

function mousePressed() {
  /* Equivalent of RG.setPolygonizerLength(map(mouseY, 0, height-100, 300, 1))
     — smaller step length → more points → finer sampling. Higher mouseY
     therefore gives a denser outline. */
  const step = constrain(map(mouseY, 0, height - 100, 300, 1), 1, 300);
  points = sampleGlyph('C', 550, step);
}

/* Sample the glyph outline at uniform arc-length spacing.
   We borrow the SVG DOM's path APIs (getTotalLength / getPointAtLength)
   because they're far more accurate than hand-sampling each Bezier
   segment — the same trick the project uses elsewhere for Geomerative
   ports. */
function sampleGlyph(ch, fontSize, step) {
  const otPath = myFont.font.getPath(ch, 0, 0, fontSize);
  const d = otPath.toPathData(2);

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const svgPath = document.createElementNS(SVG_NS, 'path');
  svgPath.setAttribute('d', d);

  const totalLen = svgPath.getTotalLength();
  const n = max(2, floor(totalLen / step));
  const pts = [];
  for (let i = 0; i < n; i++) {
    const pt = svgPath.getPointAtLength((i / n) * totalLen);
    pts.push({ x: pt.x, y: -pt.y });
  }

  /* Bbox-centre at (0,0) — equivalent to Geomerative's CENTER alignment. */
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const q of pts) {
    if (q.x < minX) minX = q.x;
    if (q.x > maxX) maxX = q.x;
    if (q.y < minY) minY = q.y;
    if (q.y > maxY) maxY = q.y;
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  for (const q of pts) {
    q.x -= cx;
    q.y -= cy;
  }
  return pts;
}

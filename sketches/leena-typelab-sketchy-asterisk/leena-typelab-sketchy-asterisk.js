/* p5.js port of the Processing + Geomerative + processing.sound version
   of "Sketchy Asterisk".
     - opentype.load gets us the font; the glyph path is split at every
       moveTo into per-contour SVG `d` strings, then sampled at uniform
       arc-length with SVGPathElement.getPointAtLength. POLY=5 mirrors
       RG.setPolygonizerLength(5).
     - opentype.js already emits commands in canvas convention (glyph
       body above baseline → negative y); drawing as-is renders upright.
     - Audio uses p5.AudioIn / p5.Amplitude. Browsers gate mic access on
       a user gesture, so the first mousePressed sets up the audio graph;
       before that we render a static asterisk so the card has something
       to show. */

let font = null;
let pts = [];
let glyphCx = 0, glyphCy = 0;

let mic = null, amp = null, micStarted = false;
let smoothVol = 0;
let t = 0;

function preload() {
  opentype.load('Arial Black.ttf', (err, f) => {
    if (err) { console.error('Font load failed:', err); return; }
    font = f;
    buildPoints();
  });
}

function setup() {
  createCanvas(1000, 1000);
  noStroke();
}

function buildPoints() {
  const otPath = font.getPath('*', 0, 0, 1200);

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
  const POLY = 5;
  for (const d of contourDs) {
    const svgPath = document.createElementNS(SVG_NS, 'path');
    svgPath.setAttribute('d', d);
    const total = svgPath.getTotalLength();
    if (total === 0) continue;
    const n = max(2, floor(total / POLY));
    for (let i = 0; i < n; i++) {
      const pt = svgPath.getPointAtLength((i / n) * total);
      pts.push({ x: pt.x, y: pt.y });
    }
  }

  /* Bbox centre — Geomerative's CENTER alignment in one shot. Folded into
     the per-frame translate so the glyph coords themselves stay untouched. */
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of pts) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  glyphCx = (minX + maxX) / 2;
  glyphCy = (minY + maxY) / 2;
}

function draw() {
  background(0);
  if (pts.length === 0) return;

  noStroke();
  fill(255, 90);
  /* Centre the asterisk's sampled-bbox at (width/2, height/2). The
     original Processing translate(width/2.5, height + 150) pushed it
     into the lower-right and below the canvas — that crop was masking
     most of the form on both desktop and mobile. After this translate,
     a point at glyph coords (glyphCx, glyphCy) (the bbox centre) lands
     at the canvas centre, with the rest of the points falling around it. */
  translate(width / 2 - glyphCx, height / 2 - glyphCy);

  if (!micStarted) {
    /* Pre-mic resting state — static asterisk so the card preview has
       something to show before the user clicks. */
    for (const p of pts) rect(p.x, p.y, 25, 25);
    return;
  }

  t += 0.05;

  const vol = amp.getLevel();
  const diameter = map(vol, 0, 0.5, 50, 800);
  smoothVol = lerp(smoothVol, vol, 0.05);

  for (const p of pts) {
    const wave = sin(diameter) * sin(p.x * 0.05 * t) * 20;
    rect(p.x, p.y + wave, 25, 25);
  }
}

function mousePressed() {
  if (micStarted) return;
  /* Order: resume AudioContext first (Chrome / Safari autoplay policy),
     THEN start mic and wire amp inside its callback so amp is connected
     only after the mic is confirmed running. */
  userStartAudio().then(() => {
    mic = new p5.AudioIn();
    mic.start(
      () => {
        amp = new p5.Amplitude();
        amp.setInput(mic);
        micStarted = true;
      },
      (err) => { console.warn('Mic permission denied:', err); }
    );
  });
}

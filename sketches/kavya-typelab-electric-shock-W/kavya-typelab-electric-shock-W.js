/* p5.js port of Processing + Geomerative (P3D → WEBGL).
   Activation is now cursor-hover-based: when the cursor is over the
   canvas, the electric-shock state runs at full intensity (yellow stroke,
   scrambled rect sizes, fast per-point phase). When the cursor leaves,
   the form settles into the cyan idle state with a slow wave.

   The original used a microphone-cued eletricity.mp3 + a central-zone
   cursor check. The central-zone check is gone; the .mp3 is now tied
   to canvas hover — it starts on cursor-over and stops on cursor-out.

   Gallery preview note: the gallery iframe sets `pointer-events: none`
   on previews, so the canvas DOM mouseOver/mouseOut callbacks don't
   fire there. cursorOver defaults to `false` so previews show the
   resting cyan W; the shock state is reserved for the fullscreen
   overlay where real hover events fire. */

let font = null;
let song = null;
let points = [];
let ogPoints = [];
let angle = 2;
let s = 50;
let cursorOver = false; // see comment above — default to idle/resting state

function preload() {
  song = loadSound('eletricity.mp3');
  opentype.load('DG Modal3at Med.ttf', (err, f) => {
    if (err) { console.error('Font load failed:', err); return; }
    font = f;
    buildPoints();
  });
}

function setup() {
  const cnv = createCanvas(1000, 1000, WEBGL);
  /* p5 canvas wrappers expose .mouseOver / .mouseOut — reliable across
     2D and WEBGL modes, unlike checking mouseX/mouseY bounds (which
     freeze at the last-known value when the cursor leaves the canvas). */
  cnv.mouseOver(() => {
    cursorOver = true;
    /* userStartAudio() resumes the AudioContext (autoplay-policy gate);
       guard with cursorOver in case the user already left during the
       async wait, and !isPlaying so re-entry doesn't restart playback. */
    userStartAudio().then(() => {
      if (cursorOver && song && !song.isPlaying()) song.loop();
    });
  });
  cnv.mouseOut(() => {
    cursorOver = false;
    if (song && song.isPlaying()) song.stop();
  });
  rectMode(CENTER);
}

function buildPoints() {
  const otPath = font.getPath('W', 0, 0, 800);

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
  const POLY = 3;
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

  /* Centre at origin (Geomerative CENTER alignment). */
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
    points.push({ x, y });
    ogPoints.push({ x, y });
  }
}

function draw() {
  background(0);
  if (points.length === 0) return;

  translate(-10, 20);

  if (cursorOver) {
    /* SHOCK — cursor is over the canvas. */
    fill(0);
    stroke(255, 255, 0);
    angle = 179.64;
    s = int(random(50, 70));

    /* Restore each point to its original position before the wave below
       so consecutive frames don't compound the offset. */
    for (let i = 0; i < points.length; i++) {
      points[i].x = ogPoints[i].x;
      points[i].y = ogPoints[i].y;
    }

    push();
    fill(255);
    noStroke();
    beginShape();
    for (const p of points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  } else {
    /* IDLE — cursor has left the canvas. */
    fill(0, 200, 255);
    stroke(0);
    angle = 2;
    s = 50;
  }

  for (let i = 0; i < points.length; i++) {
    const wave = sin(radians(frameCount * 5 + i * angle)) * 3;
    points[i].x = ogPoints[i].x + wave;
    points[i].y = ogPoints[i].y + wave;
  }

  for (const p of points) {
    push();
    const wave = sin(radians(frameCount * 5 * angle)) * 3;
    translate(p.x, p.y);
    rect(0, 0, s, s);
    rotateZ(radians(wave));
    pop();
  }
}

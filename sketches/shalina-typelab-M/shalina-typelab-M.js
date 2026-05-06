let letterPoints = [];
let originalPoints = [];
let spreadAmount = 0;
let myFont;

function preload() {
  myFont = loadFont('Sandra.ttf', () => {
    extractPoints("m", 500);
  });
}

function setup() {
  createCanvas(800, 600, WEBGL);
}

function draw() {
  background(0);
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);

  // slower reaction
  let targetSpread = mouseIsPressed ? 40 : 0;
  spreadAmount = lerp(spreadAmount, targetSpread, 0.02);

  // freeze when fully reached target
  let freeze = abs(spreadAmount - targetSpread) < 0.5;

  let t = spreadAmount;

  for (let i = 0; i < letterPoints.length; i++) {
    let angle = i * 50;

    let spreadX = cos(angle) * spreadAmount;
    let spreadY = sin(angle) * spreadAmount;

    let phase = i * 2.3;

    let loopX = cos(t * 0.15 + phase) * spreadAmount * 0.5;
    let loopY = sin(t * 0.15 + phase) * spreadAmount * 0.5;

    let targetX = originalPoints[i].x + spreadX + loopX;
    let targetY = originalPoints[i].y + spreadY + loopY;

    // stop movement when frozen
    if (!freeze) {
      letterPoints[i].x = lerp(letterPoints[i].x, targetX, 0.03);
      letterPoints[i].y = lerp(letterPoints[i].y, targetY, 0.03);
    }
  }

  translate(0, 0, 0);
  noStroke();
  fill('#F62DAE');

  for (let i = 0; i < letterPoints.length; i++) {
    push();
    translate(letterPoints[i].x, letterPoints[i].y, 0);
    sphere(2, 6, 6);
    pop();
  }
}

function extractPoints(letter, fontSize) {
  let w = 800, h = 600;
  let offscreen = document.createElement('canvas');
  offscreen.width = w;
  offscreen.height = h;
  let ctx = offscreen.getContext('2d');

  ctx.font = `${fontSize}px Sandra`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText(letter, w / 2, h / 2);

  let imageData = ctx.getImageData(0, 0, w, h);
  let data = imageData.data;

  function isLit(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return false;
    return data[(y * w + x) * 4] > 128;
  }

  function isEdge(x, y) {
    if (!isLit(x, y)) return false;
    return !isLit(x + 1, y) || !isLit(x - 1, y) ||
           !isLit(x, y + 1) || !isLit(x, y - 1);
  }

  const dx8 = [1, 1, 0, -1, -1, -1, 0, 1];
  const dy8 = [0, 1, 1, 1, 0, -1, -1, -1];

  let visited = new Set();
  let allContours = [];

  function findNextStart() {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!visited.has(y * w + x) && isEdge(x, y)) {
          return { x, y };
        }
      }
    }
    return null;
  }

  function traceContour(startX, startY) {
    let contour = [];
    let cx = startX, cy = startY;
    let prevDir = 0;

    for (let iter = 0; iter < 100000; iter++) {
      let key = cy * w + cx;

      if (contour.length > 2 && cx === startX && cy === startY) break;

      if (!visited.has(key)) {
        visited.add(key);
        contour.push({ x: cx, y: cy });
      }

      let found = false;
      let startDir = (prevDir + 5) % 8;

      for (let d = 0; d < 8; d++) {
        let dir = (startDir + d) % 8;
        let nx = cx + dx8[dir];
        let ny = cy + dy8[dir];

        if (isEdge(nx, ny) && !visited.has(ny * w + nx)) {
          prevDir = dir;
          cx = nx;
          cy = ny;
          found = true;
          break;
        }
      }

      if (!found) break;
    }

    return contour;
  }

  let start;
  while ((start = findNextStart()) !== null) {
    let contour = traceContour(start.x, start.y);
    if (contour.length > 10) allContours.push(contour);
  }

  let allPoints = [];
  for (let contour of allContours) {
    for (let p of contour) {
      allPoints.push(p);
    }
  }

  let minX = w, maxX = 0, minY = h, maxY = 0;

  for (let p of allPoints) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  let centerX = (minX + maxX) / 2;
  let centerY = (minY + maxY) / 2;

  letterPoints = [];
  originalPoints = [];

  let skip = 1;

  for (let i = 0; i < allPoints.length; i += skip) {
    letterPoints.push({
      x: allPoints[i].x - centerX,
      y: allPoints[i].y - centerY
    });

    originalPoints.push({
      x: allPoints[i].x - centerX,
      y: allPoints[i].y - centerY
    });
  }
}
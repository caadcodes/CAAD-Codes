let cx = [], cy = [], hx = [], hy = [];
let font;
let fontBytes;
const LETTER = "N";
const FONT_SIZE = 420;
const SAMPLE_DIST = 7;

function preload() {
  fontBytes = loadBytes("Arial Bold.ttf"); // p5 waits for this
}

function setup() {
  createCanvas(500, 500);

  // Parse the font synchronously from the loaded bytes
  let buffer = fontBytes.bytes.buffer;
  font = opentype.parse(buffer);

  let path = font.getPath(LETTER, 0, 0, FONT_SIZE);
  let rawPts = samplePath(path, SAMPLE_DIST);
  let bbox = getBBox(rawPts);
  let offX = width / 2 - (bbox.minX + bbox.maxX) / 2;
  let offY = height / 2 - (bbox.minY + bbox.maxY) / 2;

  for (let pt of rawPts) {
    let px = pt.x + offX;
    let py = pt.y + offY;
    hx.push(px); hy.push(py);
    cx.push(px); cy.push(py);
  }
}


function draw() {
  background(0);
  for (let i = 0; i < cx.length; i++) {
    let dx = cx[i] - mouseX;
    let dy = cy[i] - mouseY;
    let d = sqrt(dx * dx + dy * dy);

    if (d < 70) {
      let force = (70 - d) * 0.4;
      cx[i] += cos(atan2(dy, dx)) * force;
      cy[i] += sin(atan2(dy, dx)) * force;
    } else {
      cx[i] += (hx[i] - cx[i]) * 0.05;
      cy[i] += (hy[i] - cy[i]) * 0.05;
    }

    let displace = dist(cx[i], cy[i], hx[i], hy[i]);
    let t = constrain(displace / 100.0, 0, 1);
    let c1 = color(255, 120, 255);
    let c2 = color(200, 255, 100);

    strokeWeight(2);
    stroke(lerpColor(c2, c1, t));
    noFill();
    circle(cx[i], cy[i], 5 + 30 * t);
  }
}

function getBBox(pts) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let p of pts) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, minY, maxX, maxY };
}

function samplePath(path, spacing) {
  let points = [];
  let cmds = path.commands;
  let curX = 0, curY = 0, startX = 0, startY = 0;

  for (let cmd of cmds) {
    if (cmd.type === "M") {
      curX = cmd.x; curY = cmd.y;
      startX = curX; startY = curY;
    } else if (cmd.type === "L") {
      sampleLine(curX, curY, cmd.x, cmd.y, spacing, points);
      curX = cmd.x; curY = cmd.y;
    } else if (cmd.type === "C") {
      sampleCubic(curX, curY, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y, spacing, points);
      curX = cmd.x; curY = cmd.y;
    } else if (cmd.type === "Q") {
      sampleQuad(curX, curY, cmd.x1, cmd.y1, cmd.x, cmd.y, spacing, points);
      curX = cmd.x; curY = cmd.y;
    } else if (cmd.type === "Z") {
      sampleLine(curX, curY, startX, startY, spacing, points);
      curX = startX; curY = startY;
    }
  }
  return points;
}

function sampleLine(x0, y0, x1, y1, spacing, pts) {
  let dx = x1 - x0, dy = y1 - y0;
  let len = Math.sqrt(dx * dx + dy * dy);
  let steps = Math.max(1, Math.floor(len / spacing));
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    pts.push({ x: x0 + dx * t, y: y0 + dy * t });
  }
}

function sampleCubic(x0, y0, x1, y1, x2, y2, x3, y3, spacing, pts) {
  let steps = 10;
  let prev = null;
  let acc = 0;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let u = 1 - t;
    let x = u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3;
    let y = u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3;
    if (prev) {
      acc += Math.sqrt((x - prev.x) ** 2 + (y - prev.y) ** 2);
      if (acc >= spacing) { pts.push({ x, y }); acc = 0; }
    }
    prev = { x, y };
  }
}

function sampleQuad(x0, y0, x1, y1, x2, y2, spacing, pts) {
  let steps = 30;
  let prev = null;
  let acc = 0;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let u = 1 - t;
    let x = u*u*x0 + 2*u*t*x1 + t*t*x2;
    let y = u*u*y0 + 2*u*t*y1 + t*t*y2;
    if (prev) {
      acc += Math.sqrt((x - prev.x) ** 2 + (y - prev.y) ** 2);
      if (acc >= spacing) { pts.push({ x, y }); acc = 0; }
    }
    prev = { x, y };
  }
}
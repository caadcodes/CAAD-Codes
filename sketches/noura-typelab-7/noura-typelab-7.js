let allPoints = [];
let fontLoaded = false;
let offsetX, offsetY;

function setup() {
  createCanvas(800, 800);
  opentype.load("Arial Black.ttf", function(err, font) {
    if (err) { console.log("font error:", err); return; }
    let path = font.getPath("7", 0, 0, 500);
    allPoints = samplePath(path, 5);

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    for (let pt of allPoints) {
      minX = min(minX, pt.x);
      maxX = max(maxX, pt.x);
      minY = min(minY, pt.y);
      maxY = max(maxY, pt.y);
    }
    offsetX = (minX + maxX) / 2;
    offsetY = (minY + maxY) / 2;

    fontLoaded = true;
  });
}

function samplePath(path, spacing) {
  let points = [];
  let cmds = path.commands;
  let x = 0, y = 0;
  for (let cmd of cmds) {
    if (cmd.type === "M") {
      x = cmd.x; y = cmd.y;
    } else if (cmd.type === "L") {
      let dx = cmd.x - x, dy = cmd.y - y;
      let dist = sqrt(dx * dx + dy * dy);
      let steps = max(1, floor(dist / spacing));
      for (let s = 0; s <= steps; s++) {
        points.push({ x: x + dx * s / steps, y: y + dy * s / steps });
      }
      x = cmd.x; y = cmd.y;
    } else if (cmd.type === "C") {
      let steps = 40;
      for (let s = 0; s <= steps; s++) {
        let tt = s / steps;
        let bx = cubicBezier(tt, x, cmd.x1, cmd.x2, cmd.x);
        let by = cubicBezier(tt, y, cmd.y1, cmd.y2, cmd.y);
        points.push({ x: bx, y: by });
      }
      x = cmd.x; y = cmd.y;
    } else if (cmd.type === "Q") {
      let steps = 20;
      for (let s = 0; s <= steps; s++) {
        let tt = s / steps;
        let bx = quadBezier(tt, x, cmd.x1, cmd.x);
        let by = quadBezier(tt, y, cmd.y1, cmd.y);
        points.push({ x: bx, y: by });
      }
      x = cmd.x; y = cmd.y;
    }
  }
  return points;
}

function cubicBezier(t, p0, p1, p2, p3) {
  return pow(1-t,3)*p0 + 3*pow(1-t,2)*t*p1 + 3*(1-t)*t*t*p2 + pow(t,3)*p3;
}

function quadBezier(t, p0, p1, p2) {
  return pow(1-t,2)*p0 + 2*(1-t)*t*p1 + pow(t,2)*p2;
}

function draw() {
  background(0);
  if (!fontLoaded) return;

  translate(width / 2, height / 2);

  let stretch = map(mouseX, 0, width, 0.5, 1.5);
  let waveAmount = map(mouseY, 0, height, 0, 40);

  fill(255);
  noStroke();
  for (let pt of allPoints) {
    let x = pt.x - offsetX;
    let y = pt.y - offsetY;
    let wave = tan(radians(x + frameCount * 2)) * waveAmount;
    let newX = x * stretch;
    let newY = y + wave;
    ellipse(newX, newY, 4, 4);
  }
}
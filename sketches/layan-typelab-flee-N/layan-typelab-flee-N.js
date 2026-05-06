let pos = [], vel = [], origin = [];
let fontBytes;
let letterCmds;
const COUNT = 600;

function preload() {
  fontBytes = loadBytes("HeadlineA.ttf");
}

function setup() {
  createCanvas(600, 600);
  let font = opentype.parse(fontBytes.bytes.buffer);
  letterCmds = font.getPath('"', 0, 0, 850).commands;

  // spawn particles inside letter
  let attempts = 0;
  while (pos.length < COUNT && attempts < 100000) {
    attempts++;
 let x = random(-150, 300);
let y = random(-600, 50);
    if (containsPoint(letterCmds, x, y)) {
      pos.push(createVector(x, y));
      vel.push(createVector(0, 0));
      origin.push(createVector(x, y));
    }
  }
  background(0);
}

function draw() {
  noStroke();
  fill(0, 15);
  rect(0, 0, width, height);

  let c1 = color(80, 180, 255);
  let c2 = color(80, 255, 180);
  strokeWeight(3);
  stroke(lerpColor(c1, c2, noise(frameCount / 10)));

  translate(width / 2 - 180, height / 2 + 480 );

  for (let i = 0; i < pos.length; i++) {
    let angle = noise(pos[i].x * 0.005, pos[i].y * 0.005, frameCount * 0.01) * TWO_PI * 2;
    vel[i].x += sin(angle);
    vel[i].y += cos(angle);

    let attract = p5.Vector.sub(origin[i], pos[i]);
    attract.mult(0.02);
    vel[i].add(attract);
    vel[i].mult(0.95);

    let next = p5.Vector.add(pos[i], vel[i]);
    if (containsPoint(letterCmds, next.x, next.y)) {
      pos[i] = next;
    }

    point(pos[i].x, pos[i].y);
  }
}

// Ray casting — counts how many times a ray from (px,py) rightward crosses the path
function containsPoint(cmds, px, py) {
  let crossings = 0;
  let curX = 0, curY = 0, startX = 0, startY = 0;

  function rayCrossesSegment(ax, ay, bx, by) {
    if ((ay > py) === (by > py)) return false;
    let t = (py - ay) / (by - ay);
    return ax + t * (bx - ax) > px;
  }

  function rayCrossesCubic(x0, y0, x1, y1, x2, y2, x3, y3) {
    let steps = 20;
    let prevX = x0, prevY = y0;
    for (let i = 1; i <= steps; i++) {
      let t = i / steps, u = 1 - t;
      let x = u**3*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t**3*x3;
      let y = u**3*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t**3*y3;
      if (rayCrossesSegment(prevX, prevY, x, y)) crossings++;
      prevX = x; prevY = y;
    }
  }

  function rayCrossesQuad(x0, y0, x1, y1, x2, y2) {
    let steps = 10;
    let prevX = x0, prevY = y0;
    for (let i = 1; i <= steps; i++) {
      let t = i / steps, u = 1 - t;
      let x = u*u*x0 + 2*u*t*x1 + t*t*x2;
      let y = u*u*y0 + 2*u*t*y1 + t*t*y2;
      if (rayCrossesSegment(prevX, prevY, x, y)) crossings++;
      prevX = x; prevY = y;
    }
  }

  for (let c of cmds) {
    if (c.type === "M") { curX = startX = c.x; curY = startY = c.y; }
    else if (c.type === "L") {
      if (rayCrossesSegment(curX, curY, c.x, c.y)) crossings++;
      curX = c.x; curY = c.y;
    } else if (c.type === "C") {
      rayCrossesCubic(curX, curY, c.x1, c.y1, c.x2, c.y2, c.x, c.y);
      curX = c.x; curY = c.y;
    } else if (c.type === "Q") {
      rayCrossesQuad(curX, curY, c.x1, c.y1, c.x, c.y);
      curX = c.x; curY = c.y;
    } else if (c.type === "Z") {
      if (rayCrossesSegment(curX, curY, startX, startY)) crossings++;
      curX = startX; curY = startY;
    }
  }

  return crossings % 2 === 1;
}
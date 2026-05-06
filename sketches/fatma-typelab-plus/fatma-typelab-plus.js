let pts = [];

let cx, cy;
let armLength = 260;
let thickness = 140;
let spacing = 8;
let baseSize = 20;

let growStart = 40;
let growStep = 30;
let cycleFrames = 120;

let c1, c2;

function setup() {
  createCanvas(1000, 1000);
  smooth();

  c1 = color(72, 72, 240);
  c2 = color(130, 210, 65);

  cx = width / 2;
  cy = height / 2;

  let h = thickness / 2;
  let ext = armLength + h;

  let corners = [
    createVector(cx - h, cy - ext), createVector(cx + h, cy - ext),
    createVector(cx + h, cy - h),   createVector(cx + ext, cy - h),
    createVector(cx + ext, cy + h), createVector(cx + h, cy + h),
    createVector(cx + h, cy + ext), createVector(cx - h, cy + ext),
    createVector(cx - h, cy + h),   createVector(cx - ext, cy + h),
    createVector(cx - ext, cy - h), createVector(cx - h, cy - h)
  ];

  for (let i = 0; i < corners.length; i++) {
    let a = corners[i];
    let b = corners[(i + 1) % corners.length];

    let steps = max(1, round(dist(a.x, a.y, b.x, b.y) / spacing));

    for (let j = 0; j < steps; j++) {
      let amt = j / steps;
      pts.push(p5.Vector.lerp(a, b, amt));
    }
  }

  let offset = floor(pts.length / 2) + 11;
  let r = [];

  for (let i = 0; i < pts.length; i++) {
    r.push(pts[(i + offset) % pts.length].copy());
  }

  pts = r;

  for (let i = 0; i < 8; i++) {
    pts.push(pts[i].copy());
  }
}

function draw() {
  background(0);
  stroke(255);

  let ci = floor(frameCount / cycleFrames);

  let t = (frameCount % cycleFrames) / cycleFrames;
  let pulse = sin(t * PI);

  let s = baseSize + pulse * (growStart + ci * growStep);

  for (let i = 0; i < pts.length; i++) {
    if (i % 2 === 0) {
      fill(c1);
    } else {
      fill(c2);
    }

    let p = pts[i];
    ellipse(p.x, p.y, s, s);
  }
}
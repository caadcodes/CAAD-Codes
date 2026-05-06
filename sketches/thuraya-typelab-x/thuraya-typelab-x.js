let myFont;
let points = [];
let homes = [];
let spinAngles = [];
let spinSpeeds = [];
let orbitAngles = [];
let orbitRadii = [];

function preload() {
  myFont = loadFont('ABCMaxiRoundMonoVariable-Trial.ttf');
}

function setup() {
  createCanvas(700, 700);
  colorMode(HSB, 360, 100, 100);
  let pts = myFont.textToPoints('x', -100, 100, 350, {
    sampleFactor: 0.1, 
    simplifyThreshold: 0
  });

  for (let i = 0; i < pts.length; i++) {
    points[i] = createVector(pts[i].x, pts[i].y);
    homes[i] = createVector(pts[i].x, pts[i].y);
    spinAngles[i] = random(TWO_PI);
    spinSpeeds[i] = random(0.008, 0.025);
    orbitAngles[i] = random(TWO_PI);
    orbitRadii[i] = 0;
  }
}

function draw() {
  fill(0, 0, 0, 0.15); 
  rect(0, 0, width, height);

  translate(width / 2, height / 2);
  
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  for (let i = 0; i < points.length; i++) {
    let d = dist(mx, my, points[i].x, points[i].y);

    if (mouseIsPressed && d < 220) {
      let targetRadius = map(d, 0, 220, 8, 60);
      orbitRadii[i] = lerp(orbitRadii[i], targetRadius, 0.05);
      
      let orbitSpeed = map(d, 0, 220, 0.12, 0.03);
      orbitAngles[i] += orbitSpeed;

      let tx = mx + cos(orbitAngles[i]) * orbitRadii[i];
      let ty = my + sin(orbitAngles[i]) * orbitRadii[i];
      
      points[i].x = lerp(points[i].x, tx, 0.08);
      points[i].y = lerp(points[i].y, ty, 0.08);

      spinAngles[i] += 0.2;
    } else {
      points[i].x = lerp(points[i].x, homes[i].x, 0.1);
      points[i].y = lerp(points[i].y, homes[i].y, 0.1);
    }

    let distFromHome = dist(points[i].x, points[i].y, homes[i].x, homes[i].y);
    let hue = map(distFromHome, 0, 150, 80, 165);
    let sz = map(distFromHome, 0, 150, 5, 13);

    spinAngles[i] += spinSpeeds[i] + distFromHome * 0.0015;

    fill(hue, 80, 100);
    noStroke();
    drawCrescent(points[i].x, points[i].y, sz, spinAngles[i]);
  }
}

function drawCrescent(x, y, r, angle) {
  push();
  translate(x, y);
  rotate(angle);
  
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.15) {
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);
 
  let offset = r * 0.45;
  let innerR = r * 0.78;
  fill(0);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.15) {
    vertex(offset + cos(a) * innerR, sin(a) * innerR);
  }
  endShape(CLOSE);
  pop();
}
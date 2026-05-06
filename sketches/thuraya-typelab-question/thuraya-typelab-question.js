
let font;
let points = [];
let targets = [];
let seeds = [];

function preload() {
  font = loadFont('flowerthin.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  
  initializePoints();
}

function initializePoints() {
  points = [];
  targets = [];
  seeds = [];
  let fontSize = 500;
  let options = {
    sampleFactor: 0.1, 
    simplifyThreshold: 0
  };
  
  let pts = font.textToPoints('A', 0, 0, fontSize, options);
  let bounds = font.textBounds('A', 0, 0, fontSize);
  
  for (let i = 0; i < pts.length; i++) {
    let px = pts[i].x - bounds.w / 2;
    let py = pts[i].y + bounds.h / 2;
    
    points.push(createVector(px, py));
    targets.push(createVector(px, py));
    seeds.push(random(1000));
  }
}

function draw() {
  background(0, 0.15); 
  translate(width / 2, height / 2);
  
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let t = frameCount * 0.01;

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let tar = targets[i];
    
    let d = dist(mx, my, p.x, p.y);
    let proximity = map(min(d, 200), 0, 200, 1, 0);
    let nx = (noise(seeds[i], t) - 0.5) * 15; 
    let ny = (noise(seeds[i] + 100, t) - 0.5) * 15;

    if (d < 150) { 
      let angle = atan2(p.y - my, p.x - mx);
      let push = map(d, 0, 150, 20, 0);
      p.x += cos(angle) * push;
      p.y += sin(angle) * push;
    }
    
    p.x = lerp(p.x, tar.x + nx, 0.1);
    p.y = lerp(p.y, tar.y + ny, 0.1);

    let hueValue = (340 + proximity * 40) % 360;
    stroke(hueValue, 80, 100, 0.6);
    strokeWeight(2 + proximity * 6);
    line(p.x, p.y, tar.x, tar.y);

  
    let pulse = 3 + noise(seeds[i] + 200, t) * (4 + proximity * 10);
    fill(hueValue, 60, 100);
    noStroke();
    ellipse(p.x, p.y, pulse, pulse);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializePoints();
}
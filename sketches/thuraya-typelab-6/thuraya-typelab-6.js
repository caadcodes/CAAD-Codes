
let mic, amp;
let font;
let points = [];
let seeds = [];
let smoothVol = 0;
let peakVol = 0;
let t = 0;

function preload() {
  // Ensure the .ttf file is in your project folder
  font = loadFont('KalashRegular.ttf');
}

function setup() {
  createCanvas(800, 800);
  
  // Setup Audio Input
  mic = new p5.AudioIn();
  mic.start();
  
  // Setup Amplitude analyzer
  amp = new p5.Amplitude();
  amp.setInput(mic);

  // textToPoints(text, x, y, fontSize, options)
  // sampleFactor relates to Geomerative's PolygonizerLength
  let options = {
    sampleFactor: 0.1, 
    simplifyThreshold: 0
  };
  
  let pts = font.textToPoints('6', 0, 0, 400, options);
  
  // Get bounds to center the text manually
  let bounds = font.textBounds('6', 0, 0, 400);
  
  for (let i = 0; i < pts.length; i++) {
    // Offset for centering
    let px = pts[i].x - bounds.w / 2;
    let py = pts[i].y + bounds.h / 2;
    
    points.push(createVector(px, py));
    seeds.push(random(1000));
  }
  
  rectMode(CENTER);
}

function draw() {
  // Volume analysis
  let currentVol = amp.getLevel();
  smoothVol = lerp(smoothVol, currentVol, 0.3);
  peakVol = max(peakVol * 0.9, smoothVol);
  t += 0.15 + smoothVol * 2;

  // Background fade effect based on volume
  let bgAlpha = map(smoothVol, 0, 0.3, 60, 10);
  fill(0, bgAlpha);
  noStroke();
  rect(width/2, height/2, width, height);

  translate(width / 2, height / 2 + 100);

  let e = map(smoothVol, 0, 0.15, 0, 1, true);
  let p = map(peakVol, 0, 0.15, 0, 9, true);

  for (let i = 0; i < points.length; i++) {
    let pVec = points[i];
    let sd = seeds[i];

    // Horizontal wave movement
    let wave = sin(frameCount * 0.2 + i) * e * 80;
    
    // Perlin noise and peak movement logic (nx/ny)
    let nx = (noise(sd, t * 0.5) - 0.5) * e * 350 + cos(t + sd) * p * 120 + sin(sd) * p * 500;
    let ny = (noise(sd + 100, t * 0.5) - 0.5) * e * 350 + sin(t + sd) * p * 120 + cos(sd) * p * 500;
    
    // Dot size logic
    let s = 8 + e * 80 + p * 60 + noise(sd + 200, t * 0.3) * e * 50;

    // Disintegration effect on high volume
    if (e > 0.7 && random(1) < e * 0.4) continue;

    // Color: Shifts towards white as volume increases
    let fillCol = map(e, 0, 1, 180, 255);
    fill(fillCol, 200 + e * 55);
    
    rect(pVec.x + wave + nx, pVec.y + wave + ny, s, s);
  }
}

// Browsers require a user gesture to start audio
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
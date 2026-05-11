let mic, fft;
let origin = [];
let font;
const bros = 64;

function preload() {
  font = loadFont('Arial Black.ttf'); 
}

function setup() {
  createCanvas(800, 600);
  
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT(0.8, bros);
  fft.setInput(mic);

  // Increase sampleFactor to 0.2 or 0.3 to get a smoother line
  let pts = font.textToPoints('U', -150, 150, 400, {
    sampleFactor: 0.2, 
    simplifyThreshold: 0
  });

  for (let i = 0; i < pts.length; i++) {
    origin.push(createVector(pts[i].x, pts[i].y));
  }
}

function draw() {
  background(0, 50); 
  
  let spectrum = fft.analyze();
  
  let bass = (spectrum[1] / 255.0) * 1250;     
  let mids = (spectrum[30] / 255.0) * 1250;
  let treb = (spectrum[50] / 255.0) * 9000;
  
  let move = map(mouseX, 0, width, 0, 0.04); 
  
  noFill();
  stroke(255);
  strokeWeight(1);
  
  push();
  translate(width/2, height/2 - 20);
  
  beginShape();
  for (let i = 0; i < origin.length; i++) {
    let x = origin[i].x;
    let y = origin[i].y;
    
    let waveX = sin(i * 0.7 + frameCount * 0.02) * bass * move;
    let waveY = cos(i * 0.7 + frameCount * 0.02) * mids * move;
 
    x += waveX;
    y += waveY;
  
    x += random(-treb, treb) * move * 0.01;
    y += random(treb, -treb) * move * 0.01;
    
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
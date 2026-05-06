let swirlies;
let waves;

function preload() {
  swirlies = loadImage("Swirlies.svg"); 
  soundFormats('mp3', 'wav');
  waves = loadSound("waves.mp3");
}

function setup() {
  createCanvas(570, 650);
  noStroke();
}

function draw() {
  background("#e97325");

  let cx = width / 2;
  let cy = height / 2;

  let alpha = (sin(frameCount * 0.02) + 1) * 127.5;

  let scaleFactor = 1.5;

  fill(0, alpha);           
  circle(cx, cy, 430 * scaleFactor);
  
  fill(25, 100, 209, alpha);  
  circle(cx, cy, 360 * scaleFactor);
  
  fill(181, 8, 29, alpha);   
  circle(cx, cy, 300 * scaleFactor);
   
  fill(244, 125, 45, alpha);  
  circle(cx, cy, 240 * scaleFactor);
  
  fill(255, 176, 71, alpha); 
  circle(cx, cy, 180 * scaleFactor);
   
  fill(87, 181, 74, alpha);  
  circle(cx, cy, 110 * scaleFactor);

  let angle = sin(frameCount * 0.03) * radians(10);

  push();
  translate(cx, cy);
  rotate(angle);
  scale(scaleFactor);

  imageMode(CENTER);
  image(swirlies, 0, 0, width, height);

  pop();
}

function mousePressed() {
  if (!waves.isPlaying()) {
    waves.loop();
    waves.setVolume(0.8);
  }
}
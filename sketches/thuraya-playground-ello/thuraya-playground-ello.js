let t;

function preload() {
  t = loadFont('CONTRAIL.ttf');
}

function setup() {
  createCanvas(700, 700);
}

function draw() { 
  textFont(t);
  textSize(50); 
  fill(random(255), random(255), random(255));
  text("elloo", mouseX, mouseY);
}
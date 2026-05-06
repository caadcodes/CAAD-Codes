let calm;
let scream;

function preload() {
  calm = loadFont('Georgia Italic.ttf');
  scream = loadFont('CONTRAIL.ttf');
}

function setup() {
  createCanvas(700, 700);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (mouseIsPressed) {
    background(random(255), random(255), random(255));
    fill(255, 0, 100);
    textFont(scream);
    textSize(250);
    text("AHHH", width / 2 + random(-10, 10), height / 2 + random(-10, 10));
    
  } else {
    background(255);
    fill(0, 0, 255);
    textFont(calm);
    textSize(50);
    text("Press here", width / 2, height / 2);
  }
}
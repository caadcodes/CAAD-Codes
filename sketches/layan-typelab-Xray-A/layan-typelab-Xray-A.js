let imgA, imgB;
const RW = 180;
const RH = 150;

function preload() {
  imgA = loadImage('imageA.png');
  imgB = loadImage('imageB.png');
}

function setup() {
  createCanvas(1000, 1000);
  pixelDensity(1);
  imageMode(CORNER);
  rectMode(CENTER);
}

function draw() {
  background(0);

  image(imgA, 0, 0, width, height);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(mouseX - RW / 2, mouseY - RH / 2, RW, RH);
  drawingContext.clip();
  image(imgB, 0, 0, width, height);
  drawingContext.restore();

  noFill();
  stroke(255);
  strokeWeight(10);
  rect(mouseX, mouseY, RW, RH);
}
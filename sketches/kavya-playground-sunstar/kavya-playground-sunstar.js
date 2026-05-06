var r = 5;
var c1 = 0;
var c2 = 255;
var c3 = 20;

function setup() {
  createCanvas(1000, 1000);
  background(0);
  frameRate(10);
}

function draw() {
  strokeWeight(3);
  translate(width/2, height/2);
  noFill();
  stroke(c1, c2, c3);
  rotate(radians(r));
  ellipse(0, 0, 800, 100);
  r += 5;
  c1 += 10;
  c2 -= 10;
  c3 += 5;
  if (r > 180){
    noLoop();
  }
}
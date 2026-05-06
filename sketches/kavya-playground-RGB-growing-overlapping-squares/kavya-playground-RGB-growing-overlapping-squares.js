var a1 = 0;
var a2 = 0;
var a3 = 0;
var s = 0;

function setup() {
  createCanvas(1000, 1000);
  rectMode(CENTER);
  frameRate(100)
}

function draw() {
  background(255);

  push();
  translate(0, 0);
  
  noStroke();
  fill(255, 0, 0, 80);
  rotate(radians(a1));
  scale(s);
  rect(0, 0, 100, 100);
  
  a1 += 1;
  pop();
  
  push();
  translate(1000, 1000);
  
  noStroke();
  fill(0, 0, 255, 80);
  scale(s);
  rotate(radians(a3));
  rect(0, 0, 100, 100);

  s += 0.05;
  a3 += 1;
  pop();
  
  push();
  translate(500, 500);
  
  noStroke();
  fill(0, 255, 0, 90);
  rotate(radians(a2));
  rect(0, 0, 100, 100);

  a2 -= 1;
  pop();
}
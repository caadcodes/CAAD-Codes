var s = 0;
var si = 150;

function setup() {
  createCanvas(1000, 1000, WEBGL); 
  frameRate(30);
  rectMode(CENTER);
}

function draw() {
  background(0);
  
  noFill();
  stroke(random(256), random(256), random(256));
  strokeWeight(random(1, 20));
  
  scale(s);
  
  push();
  rotateZ(radians(frameCount));
  rect(0, 0, si, si);
  pop();
  
  push();
  rotateZ(radians(-frameCount));
  rect(0, 0, si, si);
  pop();
  
  push();
  translate(200, 0);
  rotateY(radians(frameCount));
  rect(0, 0, si, si);
  pop();
  
  push();
  translate(-200, 0);
  rotateY(radians(-frameCount));
  rect(0, 0, si, si);
  pop();
  
  push();
  translate(0, 200);
  rotateX(radians(frameCount));
  rect(0, 0, si, si);
  pop();
  
  push();
  translate(0, -200);
  rotateX(radians(-frameCount));
  rect(0, 0, si, si);
  pop();
  
  push();
  rotateZ(radians(frameCount));
  rect(0, 400, si, si);
  pop();
  
  push();
  rotateZ(radians(-frameCount));
  rect(0, 400, si, si);
  pop();
  
  push();
  rotateZ(radians(frameCount));
  rect(0, -400, si, si);
  pop();
  
  push();
  rotateZ(radians(-frameCount));
  rect(0, -400, si, si);
  pop();
  
  push();
  rotateZ(radians(-frameCount));
  rect(400, 0, si, si);
  pop();
  
  push();
  rotateZ(radians(frameCount));
  rect(400, 0, si, si);
  pop();
  
  push();
  rotateZ(radians(-frameCount));
  rect(-400, 0, si, si);
  pop();
  
  push();
  rotateZ(radians(frameCount));
  rect(-400, 0, si, si);
  pop();
  
  s += 0.01;
}
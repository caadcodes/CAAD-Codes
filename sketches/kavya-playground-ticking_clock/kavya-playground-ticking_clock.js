var r1 = 0;
var r2 = -30;
var b = 0;

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(b);
  translate(width/2, height/2);
  
  noStroke();
  fill(0, 100, 255);
  circle(0, 0, 900);
  
  push();

  if (r1%360 == 0) {
    r2 += 30;
    strokeWeight(10);
    stroke(255);
    rotate(radians(r2));
    line(0, 0, 0, -200);
    
  } else{
    strokeWeight(10);
    stroke(255);
    rotate(radians(r2));
    line(0, 0, 0, -200);
  }
  
  pop();

  push();
  
  strokeWeight(6);
  stroke(0);
  rotate(radians(r1));
  line(0, 0, 0, -400);
  
  r1 += 30;
  pop();
  
  frameRate(2);
  
  if (b == 0){
    b = 255;
  }else{
    b = 0;
  }
}
//really slow
var r = 10;
var r1 = 0;
var s = 10;

function setup() {
  createCanvas(1000, 1000);
  background(0, 0, 255);
  rectMode(CENTER);
  frameRate(1000);
}

function draw() {
  noStroke();
  fill(255, 0, 0);
  if (r == 900){
    fill(255, 0, 0);
    circle(width/2, height/2, 900);
    fill(0, 0, 255);
    square(width/2, height/2, s);
    s += 2;
  }else if (s == 638){
    fill(255, 0, 0);
    circle(width/2, height/2, 900);
    fill(0, 0, 255);
    square(width/2, height/2, 638);
    r = 901;
  }else{
    circle(width/2, height/2, r);
    r += 2;
  }
  if (s > 638){
    fill(255, 0, 0);
    circle(width/2, height/2, 900);
    fill(0, 0, 255);
    square(width/2, height/2, 638);
    fill(0, 255, 0);
    circle(width/2, height/2, r1);
    r1 += 2;
  }
  if (r1 == 638){
    noLoop();
  }
}
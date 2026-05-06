var x = 100;
var y = 100;
var c = 0;
var c1 = 255;

function setup() {
  createCanvas(1000, 1000);
  //background(0); // for squares next to each other, gradient
  frameRate(30);
  rectMode(CENTER);
  
}

function draw() {
  background(0, 0, c); // for moving square
  noStroke();
  fill(c1, 255, c1); // fill(0, 0, c) for black
  square(x, y, 100);
  if (x == 900){
    x = 100;
    y += 100;
  }else{
    x += 100;
  }
  if (y == 1000){
    noLoop();
  }
  c += 3; // for black
  c1 -= 3;
}
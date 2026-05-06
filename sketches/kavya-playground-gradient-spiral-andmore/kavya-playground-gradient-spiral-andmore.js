var r = 0.5;
var x = 0;
var y = 0;
var c = 0;
var s = 5;

function setup() {
  createCanvas(1000, 1000);
  background(0); // pattern
  frameRate(30);
  rectMode(CENTER);
}

function draw() {
  fill(255, c, x*2);
  translate(width/2, height/2); // translate(width/2, height2); for rotate around center
  //background(0); // moving
  noStroke();
  rotate(r);
  square(x+8, y+8, s); // to make pattern
  //circle(x+5, y+5, s); // to make pattern
  x += 1;
  y += 1;
  r += 0.25; // for spiral
  //r += 1; //for cool thing
  c += 0.7;
  s += 0.1;
}
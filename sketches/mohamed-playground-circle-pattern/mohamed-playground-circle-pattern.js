var c1, c2, c3, c4, c5;
var rw = 150;
var rh = 150;

function setup () {
  createCanvas (1000, 1000);
  c1 = color(random(256), random(256), random(256), 50);
  c2 = color(random(256), random(256), random(256), 50);
  c3 = color(random(256), random(256), random(256), 50);
  c4 = color(random(256), random(256), random(256), 50);
  c5 = color(random(256), random(256), random(256), 50);
  frameRate(20);
  background(255);
}

function draw () {
  translate(500, 500);
  rotate(random(PI*2))
  fill(c4);
  ellipse(500, 500, rw, rh);
  fill(c3);
  ellipse(437.5, 437.5, rw, rh);
  fill(c2);
  ellipse(375, 375, rw, rh);
  fill(c1);
  ellipse(312.5, 312.5, rw, rh);
  fill(c5);
  ellipse(250, 250, rw, rh);
  fill(c4);
  ellipse(187.5, 187.5, rw, rh);
  fill(c3);
  ellipse(125, 125, rw, rh);
  fill(c2);
  ellipse(62.5, 62.5, rw, rh);
  fill(c1);
  ellipse(0, 0, rw, rh);
}

function mousePressed () {
  background (random(256), random(256), random(256));
}
var  c1, c2

var  rw = 150;
var  rh = 150;

function setup () {
  createCanvas (1000,1000);
  c1 = color(random(256), random(256), random(256), 50);
  c2 = color(random(256), random(256), random(256), 50);
    
}

function draw () {
  translate (500, 500);
  
  
  if (mouseX > width/2){
    rotate (random(PI*2));
    
    fill (c1);
  ellipse (300, 300, rw, rh);
  
  } else {
    rotate (random(PI*2));
    fill (c2);
    rect (0, 0, rw, rh);
  
  }
  frameRate (20);
}

function mousePressed () {
  background (random(256), random(256), random(256));
}
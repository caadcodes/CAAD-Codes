var ju = 1;

function setup () {
  createCanvas (1024, 1024, WEBGL);
}

function draw () {
  background (0);
  frameRate(10);
  
  push();
  rotateY(ju);
  ju = ju +1;
  box (100, 200, 400);
  pop();
}
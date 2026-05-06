var amount = 48;
var step = (360/amount);

function setup () {
  createCanvas (1024, 1024);
}

function draw () {
  translate (512, 512);
  background(0);
  for (var i=0; i<frameCount%192; i++){
    frameRate(16);
  push();
  rotate(radians(i*step));
  fill(random(256), random(256), random(100));
  rect (0, i*5+10, 70, 200);
  pop();
  
  }
}
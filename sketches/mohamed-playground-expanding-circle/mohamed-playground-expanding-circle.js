function setup () {
  createCanvas (1024, 1024);
}

function draw () {
  background(0);
  for(var i=0; i<frameCount%150; i++) {
  ellipse ((width/2), (height/2), i*10, i*10);
  fill (random(256), random(256), 77, 100);
  frameRate (10);
  }
}
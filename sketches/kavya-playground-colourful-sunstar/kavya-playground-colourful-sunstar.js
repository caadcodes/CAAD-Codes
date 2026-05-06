function setup() {
  createCanvas(1000, 1000);
  background(0);
  frameRate(10);
}

function draw() {
  translate(width/2, height/2);
  strokeWeight(1.5);
  stroke(255);
  noFill();
  for (var i = 0; i < 18; i = i+1) {
    stroke(random(256), random(256), random(256));
    rotate(radians(10));
    ellipse(0, 0, 500, 50);
  }
}

function mousePressed(){
  noLoop();
}
function setup() {
  createCanvas(800, 800);
  background(0);
}

function draw() {
  translate(width/2, height/2);
  noFill();
  stroke(255, 0, 0);
  strokeWeight(random(5));
  rotate(random(PI*2));
  ellipse(0, 0, random(600), random(600));
  
  stroke(0, 255, 0);
  rect(300, 100, random(80), random(80));
  
  stroke(0, 0, 255);
  rect(300, 300, random(200), random(200));
}
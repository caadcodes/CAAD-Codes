function setup () {
  createCanvas (1000, 1000);
}
function draw () {
  
  noStroke ();
  ellipse (mouseX, mouseY, 100, 100);
  fill(random(256), random(256), random(256), 100);
  
  frameRate(30);
}

function mousePressed () {
  
  noStroke ();
  rect (0, 0, 333, 333);
  fill(random(256), random(256), random(256), 100);
  rect (0, 333, 333, 334);
  fill(random(256), random(256), random(256), 100);
  rect (0, 667, 333, 333);
  fill(random(256), random(256), random(256), 100);
  rect (333, 0, 333, 333);
  fill(random(256), random(256), random(256), 100);
  rect (333, 333, 333, 334);
  fill(random(256), random(256), random(256), 100);
  rect (333, 667, 334, 333);
  fill(random(256), random(256), random(256), 100);
  rect (667, 0, 334, 333);
  fill(random(256), random(256), random(256), 100);
  rect (667, 333, 334, 334);
  fill(random(256), random(256), random(256), 100);
  rect (667, 667, 333, 333);
  fill(random(256), random(256), random(256), 100);
}
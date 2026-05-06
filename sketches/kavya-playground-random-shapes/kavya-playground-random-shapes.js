function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  frameRate(10);
}

function draw() {
  strokeWeight(0);
  background(0);
  fill(random(256), random(256), random(256));
  var x = random(50, 100);
  var y = random(200, 400);
  
  if ((mouseX < width/2) && (mouseY < height/2)){
    ellipse(width/4, height/4, x, y);
  }else if ((mouseX > width/2) && (mouseY < height/2)){
    square(width*3/4, height/4, y);
  }else if ((mouseX < width/2) && (mouseY > height/2)){
    circle(width/4, height*3/4, y);
  }else{
     rect(width*3/4, height*3/4, x, y);
  }
}
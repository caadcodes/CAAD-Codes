function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  ellipseMode(CENTER);
  //background(70, 40, 100);
}

function draw() {
  background(100, mouseX/2, mouseY/2);
  // ellipse(width/2, height/2, 150, 150);
  // ellipse(width/4, height/4, 100, 100);
  // rect(250, 250, 100, 100);
  
  fill(155, (256-(mouseX/2)), (256-(mouseY/2)));
  stroke(255);
  strokeWeight(3);
  translate(mouseX, mouseY); // changes origin of canvas
  rotate(radians(mouseX*0.25));
  
  beginShape();
    vertex(0-(mouseX/2), 0-(mouseY/2));
    vertex(0-(mouseX/2), 0+(mouseY/2));
    vertex(0+(mouseX/2), 0+(mouseY/2));
    vertex(0+(mouseX/2), 0-(mouseY/2));
    vertex(0-(mouseX/2), 0-(mouseY/2));
  beginContour();
    vertex(0-30, 0-30);
    vertex(0+30, 0-30);
    vertex(0+30, 0+30);
    vertex(0-30, 0+30);
  endContour();
  endShape(CLOSE);
}
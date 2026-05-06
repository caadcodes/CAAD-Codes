function setup() {
  createCanvas(1000, 1000, WEBGL);
  colorMode(HSB); 
}

function draw() {
  background(0);
  rotateX(radians(mouseY));
  rotateY(radians(mouseX));

  if (mouseIsPressed) {
    strokeWeight(5);
    stroke(random(255), random(255), random(255)); 
  } else {
    strokeWeight(2);
    stroke(100, 150, 200); 
  }

  for (let i = 0; i < 300; i++) {
    point(random(-150, 150), random(-150, 150), random(-150, 150));
  }
}
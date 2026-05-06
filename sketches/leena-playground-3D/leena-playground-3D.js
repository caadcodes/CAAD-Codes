function setup() {
  createCanvas(1000, 1000, WEBGL);
  frameRate(25);
  rectMode(CENTER);
}

function draw() {
  background(0);

  if (mouseIsPressed) {

    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
    rotateY(radians(frameCount));
    rotateX(radians(20));
    translate(0, -20, 0); 
    sphere(380, 17, 17);
    pop();


    noFill();
    stroke(random(255), random(255), random(255));
    strokeWeight(5);
    rotateX(radians(mouseX));
    rect(0, -10, 500, 500);

    noFill();
    stroke(255);
    strokeWeight(random(1, 20));
    rotateY(radians(mouseY));
    rect(0, -10, 500, 500);

  } else {

    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(6);
    rotateY(radians(mouseX));
    rotateX(radians(mouseY));
    translate(0, -20, 0); 
    sphere(380, 3, 2);
    pop();

    noFill();
    stroke(random(255), random(255), random(255));
    strokeWeight(5);
    rotateX(radians(frameCount));
    rect(0, -10, 500, 500);

    noFill();
    stroke(255);
    strokeWeight(random(1, 20));
    rotateY(radians(frameCount));
    rect(0, -10, 500, 500);

  }
}
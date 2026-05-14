function setup() {

  createCanvas(900, 900, WEBGL);

  background(200, 60, 70);

  frameRate(30);
}

function draw() {

  // ---------------- BACKGROUND ELLIPSES ----------------

  push();

  translate(-width / 2, -height / 2);

  for (let i = 0; i < frameCount % 60; i++) {

    fill(random(255));

    noStroke();

    ellipse(
      random(width),
      random(height),
      i,
      i
    );
  }

  pop();

  // --------------------- SPHERE ------------------------
push();

noFill();

stroke(random(255));

rotateX(radians(frameCount));

rotateY(radians(frameCount));

sphere(frameCount, 4, 4);

pop();
}

//mouse pressed 

function mousePressed() {

  background(200, 60, 70);
}
function halfCircles() {
  fill(230);
  arc(0, 0, 600, 600, radians(90), radians(270), PIE); // white

  fill(110, 120, 220);
  arc(0, 0, 600, 600, radians(270), radians(450), PIE); // blue

  fill(50);
  arc(0, 0, 400, 400, radians(90), radians(270), PIE); // black

  fill(210, 200, 100);
  arc(0, 0, 400, 400, radians(270), radians(450), PIE); // yellow

  fill(210, 140, 150);
  arc(0, 0, 200, 200, radians(270), radians(450), PIE); // red
}

function halfCirclesBW() {
  background(170, 80, 70);

  fill(50);
  arc(0, 0, 600, 600, radians(90), radians(270), PIE);

  fill(230);
  arc(0, 0, 600, 600, radians(270), radians(450), PIE);
}

function setup() {
  createCanvas(900, 900);
  background(170, 80, 70);
  frameRate(24);
  noStroke();
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > width / 2) {
    rotate(radians(mouseX));
    let s = -0.8 + sin(frameCount * 0.3) * 0.5;
    scale(s);
    halfCircles();
  } else {
    rotate(-radians(mouseX));
    let s = -0.8 + sin(frameCount * 0.03) * 0.3;
    scale(s);
    halfCirclesBW();
  }

  fill(50);
  triangle(0, -10, 0, 10, 10, 10);

  fill(255, 140, 150);
  triangle(0, -10, -10, 10, 0, 10);
}

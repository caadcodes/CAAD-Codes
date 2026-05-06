let sizeVal = 0; // renamed to avoid conflict with size()

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0, 40);
  noFill();

  stroke(255);
  ellipse(width / 2, height / 2, sizeVal, sizeVal);

  stroke(255, 0, 0);
  ellipse(
    width / 2,
    height / 2,
    sizeVal - mouseY / 4,
    sizeVal - mouseY / 4
  );

  stroke(0, 0, 255);
  ellipse(
    width / 2,
    height / 2,
    sizeVal - mouseY / 2,
    sizeVal - mouseY / 2
  );

  sizeVal = sizeVal + 1 + mouseX / 80;

  if (sizeVal > 800) {
    sizeVal = 0;
  }
}
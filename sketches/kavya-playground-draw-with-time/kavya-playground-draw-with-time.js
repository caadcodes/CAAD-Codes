let t;

function setup() {
  createCanvas(1000, 1000);
  background(0);
  // Monospace fonts work best for clocks so the numbers don't jump around
  textFont('Courier New');
  textSize(7);
}

function draw() {
  // background(0); // Keeping this commented out as per your original code
  
  rectMode(CENTER);

  // Update the time string every frame so the clock actually moves
  t = hour() + " : " + nf(minute(), 2) + " : " + nf(second(), 2);

  push();
  fill(255);
  // Drawing the text at mouse position
  text(t, mouseX, mouseY);
  pop();
}

function mousePressed() {
  background(0);
}
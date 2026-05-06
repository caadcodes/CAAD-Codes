let amount = 14;         // number of elements to distribute
let step = 360 / amount; // each element's rotation slice

function setup() {
  createCanvas(900, 900);
}

function draw() {
  fill(20, 10);
  noStroke();
  rect(0, 0, width, height);

  translate(width / 2, height / 2); // center the sketch
  // translate(mouseX, mouseY);
  rotate(radians(frameCount * 0.5));

  for (let i = 0; i < amount; i++) {
    noStroke();
    fill(255, 20);
    push(); // isolate each rotation
    rotate(radians(i * step));
    rect(0, 300, 20, -500);
    pop();
  }
}
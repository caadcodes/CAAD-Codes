let n = 24;

let yellow = "#FFFF00";
let red = "#FF0000";

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  let motion = sin(radians(frameCount)) * mouseY;
  // mouseY controls how far circles move in/out

  for (let i = 0; i < n; i++) {
    if (i % 3 === 0) {
      stroke(255);
    } else if (i % 2 === 0) {
      stroke(yellow);
    } else {
      stroke(red);
    }

    noFill();

    push();
    rotate(radians(i * 360 / n + frameCount + mouseX));
    // mouseX controls rotation speed
    translate(100 + motion, 10);
    ellipse(0, 0, 30, 30);
    pop();
  }
}
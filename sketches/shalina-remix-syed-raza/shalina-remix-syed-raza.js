let x = 0;
let y = 0;
let midcircle = 30;

let bg2;

function preload() {
  bg2 = loadImage("bg2.png");
}

function setup() {
  createCanvas(1200, 1200);
    image(bg2, 0, 0, 1200, 1200);

}

function draw() {
  stroke(255);
  noFill();


  // rects
  rect(20, 20, 580, 580);
  rect(600, 20, 580, 580);
  rect(20, 600, 580, 580);
  rect(600, 600, 580, 580);

  // LOOP 1
  let start = frameCount % 3;

  for (let i = start; i < 20; i++) {
    stroke(255);
    strokeWeight(random(2, 5));
    noFill();
    ellipse(width / 2, height / 2 + y, i * 60, i * 60);
  }

  // middle circle
  fill(0);
  stroke(255);
  strokeWeight(random(2, 10));
  ellipse(width / 2, height / 2, midcircle, midcircle);

  // LOOP 2
  for (let i = start; i < 20; i++) {
    stroke(0);
    strokeWeight(random(1, 2));
    noFill();
    ellipse(width / 2, height / 2 + x, i * 50, i * 50);
  }

  // motion
  if (keyIsPressed) {
    x += 1;
    y -= 1;

    if (abs(x) > 80) {
      midcircle += 1;
    }
  }
}
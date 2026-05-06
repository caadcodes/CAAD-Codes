function setup() {
  createCanvas(500, 500);
  frameRate(30);
}

function draw() {
  rectMode(CENTER);
  background(255);
  translate(width / 2, height / 2);

  // mouseX controls number of rectangles (1–8 looping)
  let count = (mouseX % 8) + 1;
  // mouseY controls rotation speed
  let speed = mouseY / 20;

  for (let i = 0; i < count; i++) {
    // rotation with offset per rectangle
    rotate(radians(frameCount * speed + i * 20));
    noFill();
    stroke(random(256), random(256), random(256));

    // rectangles shrink progressively
    rect(0, 0, 180 - i * 20, 180 - i * 20);
  }
}
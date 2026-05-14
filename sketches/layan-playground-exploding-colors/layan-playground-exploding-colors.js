function setup() {
  createCanvas(1000, 1000, WEBGL);
  colorMode(HSB);
  noFill();
  frameRate(60);
}

function draw() {
  background(0);

  let c1 = color(0, 200, 255);
  let c2 = color(150, 200, 200);

  if (mouseIsPressed) {
    for (let i = 0; i < 10; i++) {
      push();
      rotateY(frameCount * 0.01 + i * 0.2);
      let amt = map(i, 0, 9, 0, 1);
      stroke(lerpColor(c1, c2, amt));
      strokeWeight(mouseX / 2 * i);
      circle(0, 5 * i, 200 + i * 20);
      pop();
    }
  } else {
    for (let i = 0; i < 10; i++) {
      push();
      rotateY(frameCount * 0.01 + i * 0.2);
      let amt = map(i, 0, 9, 0, 1);
      stroke(lerpColor(c1, c2, amt));
      strokeWeight(mouseX / 2 * i);
      circle(0, 0, 200 + i * 20);
      pop();
    }
  }
}
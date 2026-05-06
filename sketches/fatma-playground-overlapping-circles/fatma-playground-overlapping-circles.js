function setup() {
  createCanvas(1000, 500);
}

function draw() {
  background(0);

  let trail = floor(mouseX / 60);        // mouseX controls number of circles
  let spacing = 20 + mouseY / 20;        // mouseY controls spacing

  let colorChange = floor(frameCount / 20) % 3;

  for (let i = 0; i < trail; i++) {
    if (colorChange === 0) fill(255, 180 - i * 10);
    if (colorChange === 1) fill("#DBD556" + hex(180 - i * 10, 2));
    if (colorChange === 2) fill("#567ADB" + hex(180 - i * 10, 2));

    let size = 120 - i * 8;

    ellipse(width / 2 - i * spacing, height / 2, size, size);
    ellipse(width / 2 + i * spacing, height / 2, size, size);
  }
}
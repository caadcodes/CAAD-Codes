let font;

function preload() {
  font = loadFont("FLArtGrotesk-DEMO-Regular.otf");
}

function setup() {
  createCanvas(800, 800, WEBGL);

  textFont(font);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  rotate(PI);

  rotateY(frameCount * 0.01);
  rotateX(sin(frameCount * 0.02) * 0.25);

  for (let i = 0; i < 40; i++) {
    push();

    let z = map(i, 0, 40, -220, 220);
    let sizeChange = sin(frameCount * 0.05 + i * 0.3) * 20;

    translate(0, 0, z);
    rotateZ(frameCount * 0.01 + i * 0.08);

    if (i % 3 === 0) {
      fill("#FF7003");
    } else if (i % 3 === 1) {
      fill("#FF8103");
    } else {
      fill("#FFB003");
    }

    noStroke();
    textSize(300 + sizeChange);
    text("G", 0, 0);

    pop();
  }
}
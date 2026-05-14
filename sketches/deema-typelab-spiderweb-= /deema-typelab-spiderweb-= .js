let font;
let points = [];

function preload() {
  font = loadFont("Arial Black.ttf");
}

function setup() {

  createCanvas(800, 1000, WEBGL);

  frameRate(26);

  // replaces Geomerative
  points = font.textToPoints(
    "=",
    -250,
    200,
    600,
    {
      sampleFactor: 0.5,
      simplifyThreshold: 0
    }
  );

  stroke(255);
  noFill();
}

function draw() {

  background(0);

  // match Processing translate
  translate(50, 50);

  // match original rotation
  rotateY(frameCount * 0.01);

  strokeWeight(random(0, 5));

  for (let i = 0; i < points.length; i++) {

    // random point
    let randIndex = floor(random(points.length));

    let x1 = points[i].x - 100;
    let y1 = points[i].y - 100;

    let x2 = points[randIndex].x - 100;
    let y2 = points[randIndex].y - 100;

    // same depth animation
    let z = sin(frameCount * 0.05 + i * 0.1) * 100;

    // equivalent PVector
    let dir = createVector(randIndex * x1, y1, z);

    if (random(1) < 0.8) {

      // 2D line
      line(x1, y1, dir.x, dir.y);

    } else {

      // 3D line
      line(x1, y1, z, x2, y2, z);

    }
  }
}
let font;
let points = [];
let morph = 0;

function preload() {
  font = loadFont('Karowi-KVoVZ.ttf'); 
}

function setup() {
  createCanvas(1000, 1000);

  // get points
  points = font.textToPoints("E", 0, 0, 1000, {
    sampleFactor: 0.2,
    simplifyThreshold: 0
  });

  // center the letter properly
  let bounds = font.textBounds("E", 0, 0, 1000);
  for (let i = 0; i < points.length; i++) {
    points[i].x -= bounds.w / 2;
    points[i].y += bounds.h / 2;
  }

  colorMode(HSB, 360, 255, 255);
  background(0);
  smooth();
}

function draw() {
  // fade trail — lower alpha lets strokes accumulate longer for a brighter image
  noStroke();
  fill(0, 12);
  rect(0, 0, width, height);
  strokeWeight(3); // thicker points so each stroke deposits more light

  // center canvas
  translate(width / 2, height / 2);

  let target = mouseIsPressed ? 1 : 0;
  morph = lerp(morph, target, 0.08);

  let t = frameCount * 0.03;

  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;

    // distortion
    let angle = atan2(y, x) + sin(t + i * 0.01) * 0.5;
    let radius = dist(0, 0, x, y);

    let distortedX = cos(angle) * radius;
    let distortedY = sin(angle) * radius;

    // morph
    let newX = lerp(distortedX, x, morph);
    let newY = lerp(distortedY, y, morph);

    // blur layers
    let layers = int(lerp(3, 1, morph));

    for (let k = 0; k < layers; k++) {
      let offset = k * 15;

      let hue = map(sin(frameCount * 0.02 + i * 0.01), -1, 1, 180, 300);
      stroke(hue, 100, 255); // lower saturation pushes colors toward white = brighter

      point(newX + offset, newY + offset);
    }
  }
}
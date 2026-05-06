let font;
let points = [];

let zMove = 0;
let speed = 2;

function preload() {
  font = loadFont('Tecodeko-7OlOw.ttf'); 
}

function setup() {
  createCanvas(1000, 1000, WEBGL);

  // get points of "O"
  points = font.textToPoints("O", 0, 0, 400, {
    sampleFactor: 0.25,
    simplifyThreshold: 0
  });

  // center using bounds 
  let bounds = font.textBounds("O", 0, 0, 400);

  for (let i = 0; i < points.length; i++) {
    points[i].x -= bounds.w / 2;
    points[i].y += bounds.h / 2;
  }

  strokeWeight(2);
  background(0);
}

function draw() {
  background(0);

  // center scene 
  translate(0, 0, -500);

  // smooth speed change
  let target = mouseIsPressed ? 20 : 2;
  speed = lerp(speed, target, 0.1);
  zMove += speed;

  // draw tunnel
  for (let z = 0; z < 20; z++) {
    let zPos = (z * 120 + zMove) % 2000;

    push();
    translate(0, 0, zPos);

    stroke(255, map(zPos, 0, 2000, 255, 30));

    for (let i = 0; i < points.length; i++) {
      point(points[i].x, points[i].y);
    }

    pop();
  }
}
// ---------------------- COLORS -----------------------

let unicorn = [
  [255, 10, 10],
  [255, 120, 30],
  [255, 255, 30],
  [30, 255, 30],
  [30, 30, 255],
  [100, 30, 130],
  [150, 30, 200]
];


// ---------------------- GLOBALS ----------------------

let rings = 90;
let amount = 20;

let step;

function setup() {

  createCanvas(1000, 1000, WEBGL);

  noStroke();

  // distributes around circle
  step = 360 / amount;
}

function draw() {

  background(0);

  translate(0, 0);

  for (let r = 0; r < rings; r++) {

    let radius = map(
      r,
      0,
      rings - 3,
      width * 0.50,
      30
    );


    let size = map(
      r,
      0,
      90,
      15,
      80
    );

    for (let i = 0; i < amount; i++) {

      drawCircle(i, radius, size, r);

    }
  }
}


// -------------------- DRAW RING ----------------------

function drawCircle(i, radius, size, ring) {

  push();

  // EXACT Processing rotations
  rotateX(radians(frameCount));
  rotateY(radians(frameCount));
  rotateZ(radians(mouseX));


  let c = unicorn[floor(random(unicorn.length))];

  fill(c[0], c[1], c[2]);


  box(radius, 0, size * 1.2);

  pop();
}
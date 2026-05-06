let total = 900;

let x = new Array(total);
let y = new Array(total);

let startX = new Array(total);
let startY = new Array(total);

let targetX = new Array(total);
let targetY = new Array(total);

let endX = new Array(total);
let endY = new Array(total);

function setup() {
  createCanvas(500, 500);

  let centerX = width / 2;
  let centerY = height / 2;

  let hHeight = 320;
  let leftStemX = centerX - 95;
  let rightStemX = centerX + 95;
  let stemThickness = 46;

  let crossbarY = centerY;
  let crossbarThickness = 42;
  let crossbarWidth = 190;

  for (let i = 0; i < total; i++) {
    startX[i] = random(-300, -80);
    startY[i] = random(height);

    endX[i] = random(width + 80, width + 300);
    endY[i] = random(height);

    let r = random(1);

    if (r < 0.36) {
      targetX[i] = random(leftStemX - stemThickness / 2, leftStemX + stemThickness / 2);
      targetY[i] = random(centerY - hHeight / 2, centerY + hHeight / 2);

    } else if (r < 0.72) {
      targetX[i] = random(rightStemX - stemThickness / 2, rightStemX + stemThickness / 2);
      targetY[i] = random(centerY - hHeight / 2, centerY + hHeight / 2);

    } else {
      targetX[i] = random(centerX - crossbarWidth / 2, centerX + crossbarWidth / 2);
      targetY[i] = random(crossbarY - crossbarThickness / 2, crossbarY + crossbarThickness / 2);
    }
  }
}

function draw() {
  background(0);

  let t = (frameCount % 360) / 360.0;

  noStroke();

  for (let i = 0; i < total; i++) {
    if (t < 0.5) {
      let tt = map(t, 0, 0.5, 0, 1);
      x[i] = lerp(startX[i], targetX[i], tt);
      y[i] = lerp(startY[i], targetY[i], tt);
    } else {
      let tt = map(t, 0.5, 1.0, 0, 1);
      x[i] = lerp(targetX[i], endX[i], tt);
      y[i] = lerp(targetY[i], endY[i], tt);
    }

    if (i % 3 === 0) {
      fill("#AFFFFA");
    } else if (i % 3 === 1) {
      fill("#03FFF0");
    } else {
      fill("#00AAA0");
    }

    ellipse(x[i], y[i], 4, 4);
  }
}
let count = 50;

let x = new Array(count);
let y = new Array(count);

let sizeArr = new Array(count); // 
let type = new Array(count);
let rot = new Array(count);

function setup() {
  createCanvas(1000, 1000);

  for (let i = 0; i < count; i++) {
    x[i] = random(width);
    y[i] = random(height);

    sizeArr[i] = random(40, 120);
    type[i] = floor(random(3)); // int → floor
    rot[i] = random(-0.2, 0.2);
  }
}

function draw() {
  background(0);
  stroke(255, 150);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < count; i++) {
    let s = sizeArr[i];

    push();
    translate(x[i], y[i]);
    rotate(rot[i]);

    // I
    if (type[i] === 0) {
      line(random(-3, 3), -s, random(-3, 3), s);
    }

    // E
    if (type[i] === 1) {
      line(0, -s, 0, s);

      line(0, -s, s/2 + random(-10, 10), -s + random(-5, 5));
      line(0, 0, s/2 + random(-10, 10), random(-5, 5));
      line(0, s, s/2 + random(-10, 10), s + random(-5, 5));
    }

    // O
    if (type[i] === 2) {
      let w = s + random(-15, 15);
      let h = s + random(-15, 15);
      ellipse(0, 0, w, h);
    }

    pop();

    // FLOAT
    x[i] += random(-0.5, 0.5);
    y[i] += random(-0.3, 0.3);
  }

  // &
  fill(255);
  noStroke();
  textSize(60);
  textAlign(CENTER, CENTER);
  text("&", mouseX, mouseY);
}
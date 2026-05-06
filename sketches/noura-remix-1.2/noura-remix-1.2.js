let colArray;
let r = 40;
let cols = 6;
let rows = 6;
let cellW, cellH;
let margin = 150;

function setup() {
  createCanvas(1000, 1000);
  background(0);
  frameRate(5);

  colArray = [
    color(255),           // white
    color(200, 0, 20),    // red
    color(55, 250, 25),   // green
    color(15, 25, 250),   // blue
    color(125, 235, 250), // light blue
    color(240, 245, 15),  // yellow
    color(160, 60, 235)   // purple
  ];

  cellW = (width - 2 * margin) / cols;
  cellH = (height - 2 * margin) / rows;
}

function draw() {
  noStroke();
  fill(0, 100);
  rect(0, 0, width, height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * cellW;
      let y = margin + j * cellH;

      let x1 = x + random(-r, r);
      let y1 = y + random(-r, r);
      let x2 = x + cellW + random(-r, r);
      let y2 = y + random(-r, r);
      let x3 = x + cellW + random(-r, r);
      let y3 = y + cellH + random(-r, r);
      let x4 = x + random(-r, r);
      let y4 = y + cellH + random(-r, r);

      let colIndex = int(random(colArray.length));
      stroke(colArray[colIndex]);
      strokeWeight(5);
      noFill();
      quad(x1, y1, x2, y2, x3, y3, x4, y4);
    }
  }
}

function mousePressed() {
  r += 10;
}
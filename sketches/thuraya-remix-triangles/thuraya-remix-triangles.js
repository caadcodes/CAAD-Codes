let triangleShape;

function setup() {
  createCanvas(700, 600);
  triangleShape = new CustomShape();

  triangleShape.addPoint(10, 300);
  triangleShape.addPoint(150, 0);
  triangleShape.addPoint(350, 300);
    
  triangleShape.addPoint(160, 500);
  triangleShape.addPoint(10, 300);
  triangleShape.addPoint(350, 300);
  
  triangleShape.addPoint(700, 300);
  triangleShape.addPoint(500, 100);
  triangleShape.addPoint(350, 300);

  triangleShape.addPoint(520, 600);
  triangleShape.addPoint(700, 300);
  triangleShape.addPoint(350, 300);

  noStroke();
}

function draw() {
  background(255);
  let spacing = width / 14;
  let rectWidth = 20;
  let rectHeight = 500;
 
  rectMode(CENTER);
  fill(0);

  for (let i = 0; i < 14; i++) {
    let x = spacing / 2 + i * spacing;
    rect(x, 50, rectWidth, rectHeight);
  }

  let xOffset = spacing / 2;

  for (let i = 0; i < 14; i++) {
    let x = spacing / 2 + i * spacing + xOffset;
    rect(x, height - 50, rectWidth, rectHeight);
  }

  triangleShape.display();
  fill(0);
  let numInsideRects = 30;
  let innerWidth = 10;
  let innerHeight = 100;

  randomSeed(mouseX + mouseY); 

  for (let i = 0; i < numInsideRects; i++) {
    let x = random(width);
    let y = random(height);

    if (triangleShape.contains(x, y)) {
      rect(x, y, innerWidth, innerHeight);
    }
  }
}

class CustomShape {
  constructor() {
    this.points = [];
  }

  addPoint(x, y) {
    this.points.push(createVector(x, y));
  }

  display() {
    stroke(0);
    fill(255);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
  contains(px, py) {
    let collision = false;
    let next = 0;
    for (let current = 0; current < this.points.length; current++) {
      next = current + 1;
      if (next === this.points.length) next = 0;

      let vc = this.points[current];
      let vn = this.points[next];
      if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
          (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
        collision = !collision;
      }
    }
    return collision;
  }
}
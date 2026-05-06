let myFont;
let points = [];
let eyes = [];

function preload() {
  myFont = loadFont("ABCMarfaVariableVF-Trial.ttf");
}

function setup() {
  createCanvas(800, 800);

  // Extract points from the letter "9"
  // sampleFactor: 0.05 is roughly equivalent to PolygonizerLength(10)
  let pts = myFont.textToPoints('9', -220, 50, 800, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });

  // Convert points into Eye objects
  // We use j+=5 to match your Processing loop increment
  for (let i = 0; i < pts.length; i += 5) {
    eyes.push(new Eye(pts[i].x, pts[i].y, 50));
  }
}

function draw() {
  background(0);

  // Translate to center the letter "9"
  // Note: We store the translation offsets to use in the update function
  let offsetX = width / 2 - 30;
  let offsetY = height / 2 + 230;
  
  push();
  translate(offsetX, offsetY);

  for (let e of eyes) {
    // We must adjust mouse coordinates because of the translate() above
    e.update(mouseX - offsetX, mouseY - offsetY);
    e.display();
  }
  pop();
}

class Eye {
  constructor(tx, ty, ts) {
    this.x = tx;
    this.y = ty;
    this.size = ts;
    this.angle = 0.0;
  }

  update(mx, my) {
    // atan2 calculates the angle between the eye and the mouse
    this.angle = atan2(my - this.y, mx - this.x);
  }

  display() {
    push();
    translate(this.x, this.y);
    
    // Sclera (White part)
    fill(255);
    noStroke();
    ellipse(0, 0, this.size, this.size / 2);
    
    // Pupil (Black part)
    rotate(this.angle);
    fill(0);
    // Position the pupil slightly forward so it looks like it's looking
    ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
    pop();
  }
}
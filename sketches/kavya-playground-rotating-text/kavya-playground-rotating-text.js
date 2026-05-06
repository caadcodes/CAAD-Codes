let t = "i did something cool";
let h = "press and hold";
let a = -180; // We'll use this to reset the angle each frame

function setup() {
  createCanvas(1000, 1000);
  rectMode(CENTER);
  frameRate(40);
}

function draw() {
  background(255);
  
  translate(width / 2, height / 2);
  noFill();
  stroke(0);

  if (mouseIsPressed) {
    
    // Center Text
    fill(0);
    noStroke();
    textSize(20);
    push();
    textAlign(CENTER, CENTER);
    text("let go", 0, 0);
    pop();

    // Circular Text
    for (let i = 0; i < t.length; i++) {
      fill(random(255), random(255), random(255));
      textSize(30);
      
      push();
      // Rotate the entire coordinate system for this character
      rotate(radians(a / 4));
      
      push();
      translate(300, 0); // Move to the edge of the 600px circle
      rotate(radians(90)); // Rotate character to stand upright on the path
      
      text(t[i], 0, 0);
      pop();
      
      pop();
      
      // Increase the angle based on the width of the character just drawn
      a += textWidth(t[i]);
    }
  } else {
    // Idle state
    fill(0);
    noStroke();
    textSize(20);
    push();
    textAlign(CENTER, CENTER);
    text(h, 0, 0);
    pop();
  }
}
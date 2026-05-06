let a;
let len = 200;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  stroke(0, 255, 100);
  strokeWeight(2);

  // Map mouseX to the branch angle (0 to 180 degrees)
  a = map(mouseX, 0, width, 0, 180);

  // Start the tree from the bottom center
  translate(width / 2, height);
  line(0, 0, 0, -len); // Draw the trunk
  translate(0, -len);  // Move to the top of the trunk

  // Start the recursive branching
  branch(len);
}

function branch(l) {
  // Each branch will be 2/3 the size of the previous one
  l = l * 0.66;

  // Exit condition: stop recursing when branches are shorter than 2 pixels
  if (l > 2) {
    
    // Right branch
    push();             // Save the current coordinate system
    rotate(radians(a)); // Rotate by the mapped angle
    line(0, 0, 0, -l);   // Draw the branch
    translate(0, -l);   // Move to the end of the branch
    branch(l);          // Recursively call branch() again
    pop();              // Restore the coordinate system

    // Left branch
    push();              // Save the current coordinate system
    rotate(radians(-a)); // Rotate in the opposite direction
    line(0, 0, 0, -l);    // Draw the branch
    translate(0, -l);    // Move to the end of the branch
    branch(l);           // Recursively call branch() again
    pop();               // Restore the coordinate system
  }
}
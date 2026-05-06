let rot = 0; //instead of int its let


//instead of void its function
function setup() {
  createCanvas(800, 800);
  background(0);
}

function draw() {
let r = random(255);
 let g = random(255);
  let b = random(255);

  translate(mouseX, mouseY);
rotate(radians(rot));
 noStroke();
 fill(r, g, b, 50);
 rect(0, 0, 30, 50);
  rot = rot + 5;
  fill(r, g, b, 50);
  ellipse(20, 20, random(100), random(100));
  rot = rot + 5;
}
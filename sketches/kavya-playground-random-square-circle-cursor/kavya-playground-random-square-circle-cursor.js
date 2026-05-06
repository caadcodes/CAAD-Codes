var x = 0;
var y = 0;
var i = 0;

function setup() {
  createCanvas(1000, 1000);
  //background(0); for stackig
  frameRate(30);
}

function draw() {
  translate(mouseX, mouseY);
  background(0);
  for (i = 0; i <= 81; i += 1){
    fill(random(256), random(256), random(256)); //for random color
    rotate(mouseX);
    square(0, 0, 90);
    x += 1;
    y += 1;
  }
}
var c1, c2, c3, c4;
 
var x = 500;
var y = 500;
var speed = 20;

function setup () {
  createCanvas (1000, 1000);
  c1 = color(random(256), random(256), random(256));
 c2 = color(random(256), random(256), random(256));
 c3 = color(random(256), random(256), random(256));
 c4 = color(random(256), random(256), random(256));
  fill(255);
}

function draw () {
  rect (x, y, 50, 50);
}

function keyPressed () {
  if (keyCode === UP_ARROW) {
    y -= speed;
    fill (c1);
  } else if (keyCode === DOWN_ARROW) {
    y += speed;
    fill (c2);
  } else if (keyCode === LEFT_ARROW) {
    x -= speed;
    fill (c3);
  } else if (keyCode === RIGHT_ARROW) {
    x += speed;
    fill (c4);
  }
}
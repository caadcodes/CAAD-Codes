let img1, img2, img3, img4, img5, img6;
let x, y;
let angle1 = 0.0;
let angle2 = 0.0;
let segLength = 60;
let showFirst = true;

function preload() {
  img1 = loadImage('dancingmen-02.png');
  img2 = loadImage('dancingmen-03.png');
  img3 = loadImage('dancingmen-04.png');
  img4 = loadImage('dancingmen-05.png');
  img5 = loadImage('dancingmen-06.png');
  img6 = loadImage('floor.png');
}

function setup() {
  createCanvas(1150, 700);
  imageMode(CENTER);
  frameRate(6);
}

function draw() {
  translate(width / 2, height / 2);

  if (showFirst) {
    background(249, 239, 40);
  } else {
    colorMode(HSB, 360, 100, 100);
    background(random(360), 100, 100);
    colorMode(RGB, 255);
  }

  angle1 = (mouseX / float(width) - 0.5) * -PI;
  angle2 = (mouseY / float(height) - 0.5) * PI;

  // pink right arm
  push();
  strokeWeight(30);
  stroke(230, 59, 98);
  x = width / 4.5;
  y = height / 40 - 80;
  segment(x, y, angle1);
  segment(segLength, 0, -angle2 * 2);
  pop();

  // pink left arm
  push();
  strokeWeight(30);
  stroke(230, 59, 98);
  x = width / 40 - 220;
  y = height / 40 - 80;
  scale(-1, 1);
  segment(x, y, angle1);
  segment(segLength, 0, angle2);
  pop();

  // green right arm
  push();
  strokeWeight(30);
  stroke(140, 201, 115);
  x = width / 30;
  y = height / 40 - 65;
  segment(x, y, angle1);
  segment(segLength, 0, angle2);
  pop();

  // green left arm
  push();
  strokeWeight(30);
  stroke(140, 201, 115);
  x = width / 40 + 3;
  y = height / 40 - 40;
  scale(-1, 1);
  segment(x, y, -angle1);
  segment(segLength, 0, -angle2);
  pop();

  // blue right arm
  push();
  strokeWeight(30);
  stroke(43, 168, 224);
  x = width / 80 - 175;
  y = height / 40 - 160;
  segment(x, y, angle1);
  segment(segLength, 0, angle2);
  pop();

  // blue left arm
  push();
  strokeWeight(30);
  stroke(43, 168, 224);
  x = width / 40 + 200;
  y = height / 40 - 150;
  scale(-1, 1);
  segment(x, y, angle1);
  segment(segLength, 0, angle2);
  pop();

  // red right arm
  push();
  strokeWeight(30);
  stroke(213, 44, 39);
  x = width / 100 - 400;
  y = height / 40 - 80;
  segment(x, y, -angle1);
  segment(segLength, 0, angle2 - 100);
  pop();

  // red left arm
  push();
  strokeWeight(30);
  stroke(213, 44, 39);
  x = width / 40 + 440;
  y = height / 40 - 115;
  scale(-1, 1);
  segment(x, y, angle1);
  segment(segLength, 0, -angle2 * 2);
  pop();

  // orange right arm
  push();
  strokeWeight(30);
  stroke(239, 124, 34);
  x = width / 2 - 70;
  y = height / 40 - 7;
  segment(x, y, angle1);
  segment(segLength, 0, angle2);
  pop();

  // orange left arm
  push();
  strokeWeight(30);
  stroke(239, 124, 34);
  x = width / 40 - 473;
  y = height / 40 - 5;
  scale(-1, 1);
  segment(x, y, -angle1);
  segment(segLength, 0, angle2 * 2);
  pop();

  image(img6, 0, 230, 1210, 244);

  // pink man
  push();
  translate(10, 70);
  image(img1, 200, 0, width / 3, height - 100);
  pop();

  // green man
  push();
  translate(20, 70);
  image(img2, 0, 0, width / 3, height - 100);
  pop();

  // red man
  push();
  translate(-400, 50);
  image(img3, 0, 0, width / 3, height - 100);
  pop();

  // blue man
  push();
  translate(-180, 0);
  image(img4, 0, 0, width / 3, height - 100);
  pop();

  // orange man
  push();
  translate(450, 80);
  image(img5, 0, 0, width / 3, height - 100);
  pop();
}

function segment(x, y, a) {
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
}

function mousePressed() {
  showFirst = !showFirst;
}
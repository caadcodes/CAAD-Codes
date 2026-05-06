let ellX = 100, ellY = 400;
let ellX2 = 300, ellY2 = 430;
let ellX3 = 200, ellY3 = 630;
let ellX4 = 950, ellY4 = 50;
let ellX5 = 1000, ellY5 = 330;
let ellX6 = 1100, ellY6 = 230;
let ellX7 = 1050, ellY7 = 530;

let strokew = 20;
let lineX1, lineY1, lineX2, lineY2;

let positionset = 0;
let trigger = false;

let palette, currentColor, nextColor, t, speed;

function setup() {
  createCanvas(1150, 750);
  frameRate(20);

  palette = [
    color(36, 51, 192),
    color(54, 66, 230),
    color(42, 139, 215)
  ];
  currentColor = 0;
  nextColor = 1;
  t = 0;
  speed = 0.03;

  setPosition(0);
}

function draw() {
  // background ghosting
  noStroke();
  fill(lerpColor(palette[currentColor], palette[nextColor], t), 50);
  rect(0, 0, width, height);

  t += speed;
  if (t > 1) {
    t = 0;
    currentColor = nextColor;
    nextColor = (nextColor + 1) % palette.length;
  }

  // red line
  stroke('#F10217');
  strokeWeight(strokew);
  strokeCap(ROUND);
  line(lineX1, lineY1, lineX2, lineY2);

  // ellipses
  stroke(0);
  fill(0);
  strokeWeight(random(1, 5));

  ellipse(ellX,  ellY,  60, 40);
  ellipse(ellX2, ellY2, 60, 40);
  ellipse(ellX3, ellY3, 50, 40);
  ellipse(ellX4, ellY4, 70, 40);
  ellipse(ellX5, ellY5, 60, 40);
  ellipse(ellX6, ellY6, 50, 40);
  ellipse(ellX7, ellY7, 50, 40);

  // movement
  ellX  += 15;
  ellX2 += 15;
  ellX3 += 7;
  ellX4 += 9;
  ellX5 += 9;
  ellX6 -= 10;
  ellX7 -= 10;

  // trigger
  let threshold = 50;
  let d1 = dist(mouseX, mouseY, lineX1, lineY1);
  let d2 = dist(mouseX, mouseY, lineX2, lineY2);

  if (d1 < threshold || d2 < threshold) {
    if (!trigger) {
      positionset = (positionset + 1) % 3;
      setPosition(positionset);
      trigger = true;
    }
  } else {
    trigger = false;
  }
}

function setPosition(pos) {
  if (pos === 0) {
    ellX = -1000;  ellY = -1000;
    ellX2 = -1000; ellY2 = -1000;
    ellX3 = -1000; ellY3 = -1000;
    ellX4 = -1000; ellY4 = -1000;
    ellX5 = -1000; ellY5 = -1000;
    ellX6 = -1000; ellY6 = -1000;
    ellX7 = 1000;
    lineX1 = 1100; lineY1 = 150;
    lineX2 = 1050; lineY2 = 150;

  } else if (pos === 1) {
    ellX = 100;  ellY = 450;
    ellX2 = 200; ellY2 = 460;
    ellX3 = 300; ellY3 = 470;
    ellX4 = 400; ellY4 = 480;
    ellX5 = 500; ellY5 = 490;
    ellX6 = 600; ellY6 = 500;
    ellX7 = 700; ellY7 = 550;
    lineX1 = 100; lineY1 = 600;
    lineX2 = 150; lineY2 = 250;

  } else if (pos === 2) {
    ellX = 100;   ellY = 400;
    ellX2 = 300;  ellY2 = 430;
    ellX3 = 200;  ellY3 = 630;
    ellX4 = 950;  ellY4 = 50;
    ellX5 = 1000; ellY5 = 330;
    ellX6 = 1100; ellY6 = 230;
    ellX7 = 1050; ellY7 = 530;
    lineX1 = 250; lineY1 = 200;
    lineX2 = 350; lineY2 = 150;
  }
}
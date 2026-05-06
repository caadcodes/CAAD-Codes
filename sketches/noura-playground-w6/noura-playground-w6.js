let title = "you're gonna want to sit down for this...";
let paragraph =
  "The chair sat in the corner where it had been for over 25 years. " +
  "The only difference was there was someone actually sitting in it. " +
  "How long had it been since someone had done that? " +
  "Ten years or more he imagined. " +
  "Yet there was no denying the presence in the chair now....";
let rly = "really makes you think.. don't it...";
let more = "the more you know..";

let img;
let titleX, rlyX, moreX;

function preload() {
  img = loadImage("chair.png"); 
}

function setup() {
  createCanvas(900, 600);
    img.resize(50, 0); 
  background(250);
  frameRate(30);

  textSize(40);
  titleX = width;

  textSize(30);
  rlyX = -textWidth(rly);

  textSize(20);
  moreX = -textWidth(more);
}

function draw() {
  background(250);

  // IMAGE FOLLOW MOUSE
  image(img, mouseX, mouseY);

  // TITLE
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(40);
  fill(0);
  titleX -= 4;
  if (titleX < -textWidth(title)) titleX = width;
  text(title, titleX, height / 4);

  // RLY
  textAlign(RIGHT, CENTER);
  textSize(30);
  fill(0);
  rlyX += 2;
  if (rlyX > width) rlyX = -textWidth(rly);
  text(rly, rlyX, height * 3 / 4);

  // THE MORE
  textAlign(RIGHT, CENTER);
  textSize(20);
  fill(0);
  moreX += 3;
  if (moreX > width + 60) moreX = -textWidth(more);
  text(more, moreX, height * 0.9);

  // PARAGRAPH
  textAlign(LEFT, TOP);
  textSize(20);
  textLeading(30);
  fill(0);
  noStroke();
  text(paragraph, 100, height / 3, mouseX, 200);
  noFill();
  stroke(200, 0, 0);
  rect(100, height / 3, mouseX, 200);

  // TIME
  let theTime = hour() + ":" + nf(minute(), 2) + ":" + nf(second(), 2);
  textAlign(RIGHT, TOP);
  textSize(18);
  fill(0);
  noStroke();
  text(theTime, width - 20, 20);
}
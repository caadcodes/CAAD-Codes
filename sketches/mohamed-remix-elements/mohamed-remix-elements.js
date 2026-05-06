var ju = (frameCount);
var star;

function preload () {
  star = loadImage("hella.png");
}
function setup () {
  createCanvas (1024, 1024);
  
}

function draw () {
  
  background(150);
  
  noStroke();
  fill(255, 204, 51);
  rect (0,0, 512, 512);
  fill(255, 94, 0);
  rect (512,0, 512, 512);
  fill(204, 51, 51);
  rect (512,512, 512, 512);
  fill(0, 51, 102);
  rect (0,512, 512, 512);
  
  image (star, 0, 0, width, height);
  
  strokeWeight(1);
  stroke(0);
  
  push();
  fill(255, 255, 255);
  ellipse(512, 128, 100, 100);
  pop();
  
  push();
  fill(255, 142, 27);
  ellipse(512, 320, 100, 100);
  pop();
  
  push();
  fill(204, 51, 51);
  ellipse(512, 512, 100, 100);
  pop();
  
  push();
  fill(0, 51, 102);
  ellipse(512, 704, 100, 100);
  pop();
  
  push();
  fill(0, 0, 0, 100);
  ellipse(512, 896, 100, 100);
  pop();
  
  noFill();
  stroke(0);
  strokeWeight(20);
  ellipse(512, 512, 900, 900);
  
  if (mouseIsPressed &&
  mouseX > 462 && mouseX< 562
  && mouseY >72 && mouseY < 172) { 
    frameRate(50);
  for(var i=0; i<frameCount%40; i++) {
    fill(255, 255, 255, 25);
    noStroke();
  ellipse ((width/2), 132, i*10, i*10);}}
  
  if (mouseIsPressed &&
  mouseX > 462 && mouseX< 562
  && mouseY > 268 && mouseY < 368) { 
  for(var j=0; j<frameCount%40; j++) {
    frameRate(18);
    noStroke();
    fill(random(180, 205), 100, 57, 100);
  ellipse (random(width), 293, j*7, j*7);
    fill(random(205, 230), 51, 51, 100);
   ellipse (random(width), 343, j*7, j*7);}}
  
  push();
  if (mouseIsPressed &&
  mouseX > 462 && mouseX< 562
  && mouseY > 462 && mouseY < 562) {
    frameRate(10);
  for(var j=0; j<frameCount%40; j++) {
    fill(random(190, 210), 51, 51, 100);
    noStroke();
    rectMode(CENTER);
  rect (random(width), 512, j*5, j*5);}}
  pop();
  
 if (mouseIsPressed &&
  mouseX > 462 && mouseX< 562
  && mouseY > 656 && mouseY < 756) { 
  for(var j=0; j<frameCount%40; j++) {
  frameRate(18);
    fill(100, 100, random(125, 175), 100);
    noStroke();
  ellipse (random(width), 681, j*7/2, j*7/2);
    fill(20, 47, random(150, 200), 100);
  ellipse (random(width), 731, j*7, j*7);}}
  
  if (mouseIsPressed &&
  mouseX > 462 && mouseX< 562
  && mouseY > 850 && mouseY < 950) { 
    frameRate(35);
  for(var n=0; n<frameCount%40; n++) {
    fill(0, 0, 0, 50);
    noStroke();
  ellipse ((width/2), 900, n*12, n*12);}
}
} 
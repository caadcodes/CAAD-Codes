let star;

function preload () {
  star = loadImage("helldom.png");
}
function setup () {
  createCanvas (640, 512);
}

function draw () {
  
  background (150);
  image (star, 0, 0, width, height);
  
   if (mouseIsPressed &&
  mouseX > 0 && mouseX < 120
  && mouseY > 0 && mouseY < 512) { 
    frameRate(50);
  for(var j=0; j<frameCount%120; j++) {
    fill(206, 50, 39, 25);
    noStroke();
  ellipse (mouseX, mouseY, j*15, j*15);}}
  if (mouseIsPressed &&
  mouseX > 380 && mouseX < 640
  && mouseY > 420 && mouseY < 512) { 
    frameRate(50);
  for(var j=0; j<frameCount%120; j++) {
    fill(206, 50, 39, 25);
    noStroke();
  ellipse (mouseX, mouseY, j*15, j*15);}}
  
  if (mouseIsPressed &&
  mouseX > 306 && mouseX < 526
  && mouseY > 0 && mouseY < 93) { 
    frameRate(50);
  for(var j=0; j<frameCount%120; j++) {
    fill(170, 38, 35, 25);
    noStroke();
  ellipse (mouseX, mouseY, j*15, j*15);}}
  if (mouseIsPressed &&
  mouseX > 288 && mouseX < 590
  && mouseY > 135 && mouseY < 180) { 
    frameRate(50);
  for(var j=0; j<frameCount%120; j++) {
    fill(170, 38, 35, 25);
    noStroke();
  ellipse (mouseX, mouseY, j*15, j*15);}}
  if (mouseIsPressed &&
  mouseX > 480 && mouseX < 588
  && mouseY > 115 && mouseY < 145) { 
    frameRate(50);
  for(var j=0; j<frameCount%120; j++) {
    fill(170, 38, 35, 25);
    noStroke();
  ellipse (mouseX, mouseY, j*15, j*15);}}
  if (mouseIsPressed &&
  mouseX > 499 && mouseX < 570
  && mouseY > 194 && mouseY < 352) { 
    frameRate(50);
  for(var i=0; i<frameCount%120; i++) {
    fill(170, 38, 35, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
  
   if (mouseIsPressed &&
  mouseX > 290 && mouseX < 480
  && mouseY > 105 && mouseY < 130) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(225, 216, 199, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
  if (mouseIsPressed &&
  mouseX > 440 && mouseX < 472
  && mouseY > 347 && mouseY < 431) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(225, 216, 199, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
  if (mouseIsPressed &&
  mouseX > 250 && mouseX < 378
  && mouseY > 413 && mouseY < 510) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(225, 216, 199, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
  
   if (mouseIsPressed &&
  mouseX > 280 && mouseX < 433
  && mouseY > 171 && mouseY < 428) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(201, 205, 204, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
   if (mouseIsPressed &&
  mouseX > 120 && mouseX < 220
  && mouseY > 0 && mouseY < 257) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(201, 205, 204, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
   if (mouseIsPressed &&
  mouseX > 220 && mouseX < 285
  && mouseY > 0 && mouseY < 132) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(201, 205, 204, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
  
   if (mouseIsPressed &&
  mouseX > 120 && mouseX < 228
  && mouseY > 257 && mouseY < 443) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(7, 8, 8, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
   if (mouseIsPressed &&
  mouseX > 528 && mouseX < 640
  && mouseY > 0 && mouseY < 447) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(7, 8, 8, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
   if (mouseIsPressed &&
  mouseX > 477 && mouseX < 528
  && mouseY > 352 && mouseY < 447) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(7, 8, 8, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
  
   if (mouseIsPressed &&
  mouseX > 211 && mouseX < 287
  && mouseY > 130 && mouseY < 520) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(157, 138, 49, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
  if (mouseIsPressed &&
  mouseX > 122 && mouseX < 211
  && mouseY > 449 && mouseY < 520) { 
    frameRate(30);
  for(var i=0; i<frameCount%120; i++) {
    fill(157, 138, 49, 25);
    noStroke();
  ellipse (mouseX, mouseY, i*10, i*10);}}
}
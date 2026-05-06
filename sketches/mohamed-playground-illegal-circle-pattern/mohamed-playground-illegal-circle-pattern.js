var c1, c2, c3, c4, c5;
var words="DON'T DO THAT";
var fontSize = 50;
var lineHeight = 1;

var rw = 150;
var rh = 150;
var st = 50;

function setup () {
  createCanvas (1000,1000);
   c1 = color(random(256), random(256), random(256), 50);
 c2 = color(random(256), random(256), random(256), 50);
 c3 = color(random(256), random(256), random(256), 50);
 c4 = color(random(256), random(256), random(256), 50);
 c5 = color(random(256), random(256), random(256), 50);

}

function draw () {
  translate (500, 500);
  rotate (random(PI*2));
  ellipse (500, 500, rw, rh);
  fill (c4);
  ellipse (437.5, 437.5, rw, rh);
  fill (c3);
  ellipse (375, 375, rw, rh);
  fill (c2);
  ellipse (312.5, 312.5, rw, rh);
  fill (c1);
  ellipse (250, 250, rw, rh);
  fill (c5);
  ellipse (187.5, 187.5, rw, rh);
  fill (c4);
  ellipse (125, 125, rw, rh);
  fill (c3);
  ellipse (62.5, 62.5, rw, rh);
  fill (c2);
  ellipse (0, 0, rw, rh);
  fill (c1);
  frameRate (20);
  
  
}

function mousePressed () {
   for(var i=0; i<frameCount%50; i++) {
    background(i+100);
 push();
 translate(0,0);
  textSize (i*5);
  textAlign (CENTER, CENTER);
  fill(0);
  text (words, 0, 0, i*20, i*20);
 pop(); 
 }
}
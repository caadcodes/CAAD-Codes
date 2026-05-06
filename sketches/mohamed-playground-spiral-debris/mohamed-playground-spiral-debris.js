function setup() {
  createCanvas(1024, 1024);
  rectMode(CENTER);
}

var words="this is hell";

function draw() {
  background(255);

 for(var i=0; i<frameCount%190; i++) {
   translate(width/2, height/2);
 var speed = map(mouseX, 0, width, 0, 10);  
  rotate(radians(frameCount*speed)); 
  
  rect(-100, 0, i*1.7, i*8.5);
  rect(100, 0, i*1.7, i*8.5);
 }
 frameRate(20);
}
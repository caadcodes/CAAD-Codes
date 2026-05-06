function setup() {
  createCanvas (800, 800);
  colorMode (HSB, 255);  
}

var hello="marshmallow";

function draw() {
  
 var bg = map (mouseX, 0, width, 0, 255);
 
  background(bg, 255, 255);

 for(var i=0; i<frameCount%50; i++) {
    
 push();
  textSize (i*1.2);
  
  textAlign (CENTER, CENTER);
  
  fill(bg, 220, 220);
  text (hello, mouseX, mouseY, mouseX, mouseY);
  
  frameRate(20);
 pop(); }
}
function setup() {
  createCanvas (1024,1024);

}

var words="LOLOLOLOLOLOLOLOLOLOL";
var fontSize = 50;
var lineHeight = 1;

function draw () {
  
  fill(0);

 
  for(var i=0; i<frameCount%80; i++) {
    background(mouseY, 150, mouseX);
 push();
  textSize (i*4);
  textAlign (CENTER, CENTER);
  fill(255);
  text (words, 0, 0, mouseY, mouseX);
    frameRate (20);
 pop(); 
 }
  
}
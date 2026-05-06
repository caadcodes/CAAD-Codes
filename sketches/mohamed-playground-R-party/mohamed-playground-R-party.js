function setup() {
  createCanvas (1024,1024);

}

var words="R";
var fontSize = 100;
var lineHeight = 1;

function draw () {
  
  fill(0);
background(mouseX, 150, mouseY);
 
  
  for(var i=0; i<frameCount%190; i++) {
   
 push();
  textSize (i*3);
  textAlign (CENTER, CENTER);
  fill(0);
  text (words, 0, 0, mouseX, mouseY);
 pop(); 
 
 push();
  textSize (i*3);
  textAlign (CENTER, CENTER);
  fill(0);
  text (words, 0, 0, mouseX/5, mouseY/5);
 pop();
 
 push();
  textSize (i*3);
  textAlign (CENTER, CENTER);
  fill(0);
  text (words, 0, 0, mouseX*5, mouseY*5);
 pop();
 
 push();
  textSize (i*3);
  textAlign (CENTER, CENTER);
  fill(0);
  text (words, 0, 0, mouseX/5, mouseY*5);
 pop();
 
 push();
  textSize (i*3);
  textAlign (CENTER, CENTER);
  fill(0);
  text (words, 0, 0, mouseX*5, mouseY/5);
 pop();
 }
  
}
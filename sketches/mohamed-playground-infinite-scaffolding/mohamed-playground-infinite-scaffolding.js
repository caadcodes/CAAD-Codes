var ju = 5;
var re = -50;
var me = -4;

function setup() {
  createCanvas (1024,1024, WEBGL);
}

function draw () {
  background(0);
  
  for(var i=0; i<frameCount%190; i++) {
    
  push();
  translate (-256, -256);
  box (100, 100, re*i);
  pop();
  
  push();
  translate (226, 226);
  box (100, 100, re*i);
  pop();  
  
  push();
  translate (-256, 226);
  box (100, 100, re*i);
  pop(); 
  
  push();
  translate (226, -256);
  box (100, 100, re*i);
  pop(); 
  
  }
  
  for(var j=0; j<frameCount%190; j+=10) {
    
  push();
  translate (-256, -156);
  box (100, 1280, me*j);
  pop();
  
  push();
  translate (226, -156);
  box (100, 1280, me*j);
  pop();  
  
  push();
  translate (-256, 226);
  box (1536, 100, me*j);
  pop(); 
  
  push();
  translate (226, -256);
  box (1536, 100, me*j);
  pop(); 
  
  }
  
  frameRate (40);
}
var angle;
var s = 60;

function setup() {
  createCanvas(1000, 1000);
  rectMode(CENTER);
}

function draw() {
  background(256-mouseY/4, 256-mouseX/4, 256-mouseY/4);
  stroke(256-mouseY/10, 256-mouseX/10, 256-mouseY/10);
  strokeWeight(3);
  
  for (var i = 100; i < 901; i += 100){
    
    push();
    translate(100, i);
    angle = atan2(mouseY-i, mouseX-100);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
    
    push();
    translate(200, i);
    angle = atan2(mouseY-i, mouseX-200);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
    
    push();
    translate(300, i);
    angle = atan2(mouseY-i, mouseX-300);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
    
    push();
    translate(400, i);
    angle = atan2(mouseY-i, mouseX-400);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
    
    push();
    translate(500, i);
    angle = atan2(mouseY-i, mouseX-500);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
    
    push();
    translate(600, i);
    angle = atan2(mouseY-i, mouseX-600);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
    
    push();
    translate(700, i);
    angle = atan2(mouseY-i, mouseX-700);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
    
    push();
    translate(800, i);
    angle = atan2(mouseY-i, mouseX-800);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
    
    push();
    translate(900, i);
    angle = atan2(mouseY-i, mouseX-900);
    fill(mouseY/4, mouseX/4, mouseY/4);
    rotate(angle);
    rect(0, 0, s, s);
    pop();
  }
}
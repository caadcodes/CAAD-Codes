let texting = "";
let speed = 0;
let angle = 0;
let angle2 = 0;
let angle3;
let Start;
let Duration = 4000;
let courier;

function preload() {
  
  courier = loadFont("Courier New Bold copy.ttf");
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  rectMode(CENTER);
  angle3 = radians(-45);
  Start = millis();
  textFont(courier);
}

function draw() {
  background(255);
  
  push();
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(0, 350, 250, 100);
  
  noStroke(); 
  fill(0);
  textFont(courier);
  textSize(80);
  textAlign(CENTER, CENTER);
  text(texting + "%", 0, 350);
  pop();
  
  angle += speed * 0.11;
  angle2 += speed * 0.15;
  
  push();
  fill(150);
  stroke(0);
  strokeWeight(1);
  rotateZ(radians(angle));
  rotateY(radians(angle));
  translate(width / 2.5 - 500, height / 2.5 - 500, 0);
  sphere(25);
  pop();
  
  push();
  fill(150);
  stroke(0);
  strokeWeight(1);
  rotateZ(radians(angle));
  rotateY(radians(angle));
  translate(width * 3 / 5 - 500, height * 3 / 5 - 500, 0);
  sphere(25);
  pop();
  
  push();
  fill(100);
  stroke(0);
  strokeWeight(1);
  rotateZ(angle3);
  rotateZ(radians(angle2));
  rotateY(radians(angle2));
  box(250, 20, 20);
  pop(); 
  
  if (millis() - Start < Duration) {
    push();
    
    translate(0, 0, 30); 
    fill(255, 245);
    noStroke();
    rect(0, 0, width, height);
    
    fill(0);
    textSize(35);
    textAlign(CENTER, CENTER);
    text("Type number then press enter to set speed", 0, -50);
    text("enter 0 to reset", 0, 50);
    pop();
  }
}

function keyPressed() {
  if (key === 'Enter' || key === 'Return') {
    speed = parseFloat(texting) || 0;
    if (speed === 0) {
      angle = 0;
      angle2 = 0;
    }
  } else if (key === 'Backspace') {
    if (texting.length > 0) {
      texting = texting.substring(0, texting.length - 1);
    }
  } else if ((key >= '0' && key <= '9') || key === '.') {
    let next = texting + key;
    
    if (!isNaN(parseFloat(next)) && parseFloat(next) <= 99) {
      texting += key;
    }
  }
}
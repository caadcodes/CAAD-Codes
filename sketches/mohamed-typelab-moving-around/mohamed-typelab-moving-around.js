var x, y;
var speedx, speedy;
var ch = "{";
var Start;
var Duration = 3000;
var filo = 150;
var rain;

function setup() {
  createCanvas(800, 800);
  Start = millis();
  
  x = width / 2;
  y = height / 2;
  
  speedx = 7;
  speedy = 2.5;
  rain = color(random(150, 255), random(150, 255), random(150, 255));
  
  textAlign(LEFT, BASELINE); 
}

function draw() {
  background(0);
  
  // Movement
  x += speedx;
  y += speedy;
  
  ch = (speedx > 0) ? "}" : "{";
  
  textFont('Courier New');
  textSize(filo);
  
  let charWidth = textWidth(ch);
  let ascent = textAscent();
  let descent = textDescent();
  
  // Wall Collisions
  if (x < 0) {
    x = 0;
    speedx = abs(speedx);
    triggerBounce();
  }
  if (x + charWidth > width) {
    x = width - charWidth;
    speedx = -abs(speedx);
    triggerBounce();
  }
  if (y - ascent < 0) {
    y = ascent;
    speedy = abs(speedy);
    triggerBounce();
  }
  if (y + descent > height) {
    y = height - descent;
    speedy = -abs(speedy);
    triggerBounce();
  }
  
 
  for (let i = 4; i >= 1; i--) {
    let glowSize = filo + (i * 12); 
    fill(red(rain), green(rain), blue(rain), 30); 
    textSize(glowSize);
    
    let offsetX = (textWidth(ch) - charWidth) / 2;
    text(ch, x - offsetX, y);
  }
  
  fill(rain);
  textSize(filo);
  text(ch, x, y);
  
  if (millis() - Start < Duration) {
    displayInstructions();
  }
}

function triggerBounce() {
  rain = color(random(150, 255), random(150, 255), random(150, 255));
}

function displayInstructions() {
  push();
  fill(0, 180);
  rect(0, 0, width, height);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Press UP to Speed Up", width / 2, height / 2 - 40);
  text("Press DOWN to Slow Down", width / 2, height / 2 + 40);
  pop();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    speedx *= 1.2;
    speedy *= 1.2;
  } else if (keyCode === DOWN_ARROW) {
    speedx *= 0.8;
    speedy *= 0.8;
  }
}
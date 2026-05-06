var x, y;
var speedx, speedy;
var ch = "{";
var filo = 150;
var rain;

function setup() {
  createCanvas(800, 800);

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
}

function triggerBounce() {
  rain = color(random(150, 255), random(150, 255), random(150, 255));
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
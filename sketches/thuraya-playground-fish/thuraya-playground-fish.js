let t;
let fish;
let fp; 

function preload() {
  t = loadFont("ABCDiatype-Medium-Trial.otf");
  fish = loadImage("fih.png");
}

function setup() {
  createCanvas(500, 500);
  
  textFont(t);
  textSize(50);
  fp = width; 
}

function draw() {
  background(255);
  
  fill(0);
  noStroke();
  text("fih.", 215, 100);         
  
  image(fish, fp, 150); 
  

  fp = fp - 3; 
  if (fp < -fish.width) { 
    fp = width;
  }
}
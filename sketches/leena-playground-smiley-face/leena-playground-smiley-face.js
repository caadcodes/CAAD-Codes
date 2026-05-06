let img1, img2;
let showFirst = true;

function preload() {
  img1 = loadImage('smileyface.png');
  img2 = loadImage('sad face.png');
}

function setup() {
  createCanvas(900, 900);
  translate(width, height);
  background(255, 220, 0);
  imageMode(CENTER);
}

function draw() {
  

  if (showFirst) {
    image(img1, mouseX, mouseY, 600, 600);
  } else {
    image(img2, mouseX, mouseY, 600, 600);
  }
}

function mousePressed() {
  showFirst = !showFirst;
}
let img;
let face;

function preload() {
  img = loadImage("Monalisa.jpeg"); 
  face = loadImage("Face.png");
}

function setup() {
  createCanvas(300, 400);
}

function draw() {
  background(0);

  // monalisa
  image(img, 0, 0, width, height);

  // glitch amount based on mouse
  let glitchAmount = int(map(mouseX, 0, width, 0, 15));

  for (let i = 0; i < glitchAmount; i++) {
    let sy = int(random(0, height / 2));
    let sh = int(random(2, 10));
    let shift = int(random(-20, 20));

    copy(0, sy, width, sh, shift, sy, width, sh);
  }

  // show face when pressed
  if (mouseIsPressed) {
    imageMode(CENTER);

    let faceX = width / 2 + 10;
    let faceY = height / 2 - 85;

    tint(255, 230);
    image(face, faceX, faceY, 160, 160);
    noTint();

    imageMode(CORNER);
  }
}
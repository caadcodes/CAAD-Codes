
let mushroomi; 
let shroomz1;  

let showSVG = false; 

function preload() {
  mushroomi = loadImage('mushrooms.jpeg');
  shroomz1 = loadImage('shroomz1.svg');
}

function setup() {
  createCanvas(950, 700);
}

function draw() {
  if (!showSVG) {
    image(mushroomi, 0, 0, width, height);
    tint(random(255), random(255), random(255));
    image(shroomz1, 0, 0, width, height);
    noTint();

  } else {
    background(random(255), random(255), random(255));

    tint(random(255), random(255), random(255));
    image(shroomz1, 0, 0, width, height);
    noTint();
  }
}

function mousePressed() {
  showSVG = !showSVG;
}
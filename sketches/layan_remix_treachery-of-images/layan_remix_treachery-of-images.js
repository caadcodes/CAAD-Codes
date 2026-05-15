let myFont;
let apple1, pipe1, door1, cat1, vape1, cigg, tree1, redbull1;
let banana1, cup1, shisha1, pigeon1, monkey1, dog1, hat1, mm1, fish1, pizza1, pickle1;
let typedText = "this is not a pipe";

function preload() {
  myFont = loadFont("PPSupplyMono-Regular.otf");
  apple1 = loadImage("apple.png");
  pipe1 = loadImage("pipe.png");
  door1 = loadImage("door.png");
  cat1 = loadImage("cat.png");
  vape1 = loadImage("vape.png");
  cigg = loadImage("cigarette.png");
  tree1 = loadImage("tree.png");
  redbull1 = loadImage("redbull.png");
  banana1 = loadImage("banana.png");
  cup1 = loadImage("cup.png");
  shisha1 = loadImage("shisha.png");
  pigeon1 = loadImage("pigeon.png");
  monkey1 = loadImage("monkey.png");
  dog1 = loadImage("dog.png");
  hat1 = loadImage("hat.png");
  mm1 = loadImage("m&m.png");
  fish1 = loadImage("fish.png");
  pizza1 = loadImage("pizza.png");
  pickle1 = loadImage("pickle.png");
}

function setup() {
  createCanvas(1000, 700);
  pixelDensity(1);
  textFont(myFont);
  textSize(48);
}

function draw() {
  background(255);
  fill(0);

  // Draw typed text left-aligned from center anchor
  let fullText = typedText + "_";
  let startX = width / 2 - textWidth(fullText) / 2;

  textAlign(LEFT);
  text(typedText, startX, 650);

  // Fading cursor
  let cursorAlpha = ((sin(millis() * 0.005) + 1) / 2) * 255;
  fill(0, cursorAlpha);
  text("_", startX + textWidth(typedText), 650);

  // Reset fill
  fill(0);

  // Image display logic
  push();
  if (typedText === "this is not an apple") {
    image(apple1, 250, -100, 550, 700);
  } else if (typedText === "this is not a pipe") {
    image(pipe1, 100, 100, 800, 500);
  } else if (typedText === "this is not a door") {
    scale(0.5);
    image(door1, 750, 100);
  } else if (typedText === "this is not a cat") {
    scale(0.2);
    image(cat1, 1000, -350);
  } else if (typedText === "this is not a vape") {
    scale(1.3);
    image(vape1, 210, 50);
  } else if (typedText === "this is not a cigarette") {
    scale(1.2);
    image(cigg, 100, 100);
  } else if (typedText === "this is not a tree") {
    scale(0.24);
    image(tree1, 1100, 100);
  } else if (typedText === "this is not a redbull") {
    scale(0.34);
    image(redbull1, 1100, 200);
  } else if (typedText === "this is not a banana") {
    scale(0.39);
    image(banana1, 330, 120);
  } else if (typedText === "this is not a cup") {
    scale(0.15);
    image(cup1, 2150, 600);
  } else if (typedText === "this is not a shisha") {
    scale(0.2);
    image(shisha1, 1250, 210);
  } else if (typedText === "this is not a pigeon") {
    scale(0.28);
    image(pigeon1, 600, 270);
  } else if (typedText === "this is not a monkey") {
    scale(0.32);
    image(monkey1, 800, 140);
  } else if (typedText === "this is not a dog") {
    scale(0.27);
    image(dog1, 1100, 190);
  } else if (typedText === "this is not a hat") {
    scale(0.4);
    image(hat1, 400, 100);
  } else if (typedText === "this is not an eminem") {
    scale(0.4);
    image(mm1, 300, 120);
  } else if (typedText === "this is not a fish") {
    scale(1.3);
    image(fish1, 130, 60);
  } else if (typedText === "this is not a pizza") {
    scale(0.15);
    image(pizza1, 1400, 520);
  } else if (typedText === "this is not a pickle") {
    image(pickle1, 180, 150);
  }
  pop();
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    if (typedText.length > 0) {
      typedText = typedText.substring(0, typedText.length - 1);
    }
    return false; // prevent browser from going back
  }
}

function keyTyped() {
  typedText += key;
  return false; // prevent default browser behavior
}
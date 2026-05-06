let img;

function preload() {
  img = loadImage("q.jpg");
}

function setup() {
  createCanvas(800, 800);
  img.resize(width, height);
}

function draw() {
  background(0);
  noStroke();


  let tiles = map(mouseX, 0, width, 10, 100);
  tiles = constrain(tiles, 5, 150);
  let tilesW = width / tiles;
  let tilesH = height / tiles;

  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {
      
      let px = floor(x * tilesW);
      let py = floor(y * tilesH);
      let col = img.get(px, py);
      
      fill(col);
      ellipse(
        x * tilesW + tilesW / 2, 
        y * tilesH + tilesH / 2, 
        tilesW * 0.8, 
        tilesH * 0.8
      );
    }
  }
}
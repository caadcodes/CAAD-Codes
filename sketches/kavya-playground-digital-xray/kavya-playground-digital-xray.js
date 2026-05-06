let pg1, pg2;
let myf;

let rows = 50;
let cols = 50;

function preload() {
  // Ensure your font file is uploaded to the sketch folder
  myf = loadFont("23857937022.ttf");
}

function setup() {
  createCanvas(800, 800);
  pg1 = createGraphics(800, 800);
  pg2 = createGraphics(800, 800);
  noStroke();
}

function draw() {
  background(0);

  // --- BUFFER 1: The "Hidden" Version (Static Black) ---
  pg1.background(255);
  pg1.fill(0);
  pg1.textFont(myf);
  pg1.textSize(500);
  pg1.textAlign(CENTER, CENTER);
  pg1.text("9", pg1.width / 2 - 30, pg1.height / 2 - 120);

  // --- BUFFER 2: The "Background" Version (Flickering Colors) ---
  pg2.background(0);
  pg2.fill(random(256), random(256), random(256));
  pg2.textFont(myf);
  pg2.textSize(500);
  pg2.textAlign(CENTER, CENTER);
  pg2.text("9", pg2.width / 2 - 30, pg2.height / 2 - 120);

  var tilesW = width/rows;
  var tilesH = height/cols;

  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {

      var px = int (x * tilesW); 
      var py = int (y * tilesH); 
      var col = pg2.get(px, py); 
      //float bright = brightness(col);

      fill(col);
      stroke(0);

      rect(x*tilesW, y*tilesH, tilesW, tilesH);
      //ellipse(x*tilesW, y*tilesH, tilesW, tilesH);
    }
  }

  // --- THE "REVEAL" COPY ---
  let cw = 200;
  let ch = 200;

  // This takes a 200x200 square from pg1 (the static version) 
  // and draws it on the main canvas exactly at the mouse position
  copy(pg1, mouseX, mouseY, cw, ch, mouseX, mouseY, cw, ch);
}
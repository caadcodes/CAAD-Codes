let pg;
let myf;

function preload() {
  // Ensure the font is in your sketch folder
  // If you don't have the file, you can use 'Arial' or 'sans-serif'
  myf = loadFont("ABCMarfaVariableVF-Trial.ttf");
}

function setup() {
  createCanvas(800, 800);
  // createGraphics creates an off-screen buffer
  pg = createGraphics(800, 800);
  frameRate(10);
}

function draw() {
  background(0);

  // --- DRAWING TO THE BUFFER ---

  pg.background(255);
  pg.fill(0, 0, 255);
  pg.textFont(myf);
  pg.textSize(900);
  pg.textAlign(CENTER, CENTER);
  pg.text("9", width / 2 - 20, height / 2 - 150);

  // --- COPY LOGIC ---
  let cx = mouseX;
  let cy = mouseY;
  let cw = 400;
  let ch = 400;

  let pw = 400;
  let ph = 400;


  let srcX = int(random(mouseX - 100, mouseX));
  let srcY = int(random(mouseY - 100, mouseY));

  copy(pg, srcX, srcY, cw, ch, cx, cy, pw, ph);
}
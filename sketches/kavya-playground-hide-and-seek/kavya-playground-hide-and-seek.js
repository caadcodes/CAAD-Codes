let pg;
let myf;
let c1, c2, c3;

function preload() {
  // Ensure the font file is in your project folder
  myf = loadFont("ABCMarfaVariableVF-Trial.ttf");
}

function setup() {
  createCanvas(800, 800);
  
  // Set HSB mode for the main canvas
  colorMode(HSB, 360);
  
  // Create the off-screen buffer
  pg = createGraphics(800, 800);
  
  // CRITICAL: The buffer needs its own colorMode setting
  pg.colorMode(HSB, 360);
}

function draw() {
  background(0);

  // Map mouse coordinates to HSB values
  c1 = map(mouseX, 0, width, 0, 200);
  c2 = map(mouseY, 0, height, 0, 200);
  c3 = map(mouseX, width, 0, 100, 200);

  // --- DRAWING TO THE BUFFER ---
  pg.background(255);
  pg.fill(c1, c2, c3);
  pg.textFont(myf);
  pg.textSize(1050);
  pg.textAlign(CENTER, CENTER);
  
  // Drawing the "9" based on mouse position
  pg.text("9", mouseX, mouseY-150);

  // --- GRID COPY LOGIC ---
  let cx = mouseX;
  let cy = mouseY;
  
  let px = width / 2;
  let py = height / 2;
  
  let s = 180; // Size of the copy chunk
  let v = 200; // Offset/Spacing

  // Nested loop to create the grid of glitchy "9"s
  for (let i = -2; i <= 1; i++) {
    for (let j = -2; j <= 1; j++) {
      
      let a = i * v;
      let b = j * v;

      /* p5.js copy syntax: 
         copy(source, sx, sy, sw, sh, dx, dy, dw, dh) 
      */
      copy(pg, cx + a, cy + b, s, s, px + a, py + b, s, s);
    }
  }
}
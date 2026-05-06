let pg;
let font;

function preload() {
  font = loadFont("ABCMarfaVariableVF-Trial.ttf");
}

function setup() {
  createCanvas(1000, 1000);
  pg = createGraphics(1000, 1000);
  
  // High pixel density will break the index math, so we force 1.
  pixelDensity(1);
  pg.pixelDensity(1);
}

function draw() {
  background(0);

  let c = map(mouseX, 0, width, 255, 50);

  // --- DRAW TO BUFFER ---
  pg.background(0);
  pg.fill(c, 100, 255);
  pg.textFont(font);
  pg.textSize(800);
  pg.textAlign(CENTER, CENTER);
  // In p5.js, we don't need push/pop for simple centered text in a buffer
  pg.text("s", pg.width / 2, pg.height / 2 - 100);

  // Prepare the pixels for fast sampling
  var tilesX = 400; 
  var tilesY = 400;
  var tileW = width/tilesX;
  var tileH = height/tilesY;

  for (var y = 0; y < tilesY; y++) {
    for (var x = 0; x < tilesX; x++) {

      var w2 = int(sin(frameCount * 0.05 + ( x * y )) * (mouseX*mouseY)/700);
      var w4 = int(cos(frameCount * 0.05 + ( x * y )) * (mouseX*mouseY)/450);

      var sx = x * tileW + w2 - w4;
      var sy = y * tileH + w2;
      var sw = tileW;
      var sh = tileH;

      var dx = x * tileW;
      var dy = y * tileH;
      var dw = tileW;
      var dh = tileH;

      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh); 
    }
  }
}
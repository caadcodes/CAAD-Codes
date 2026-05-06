let pg;
let tX = 50, tY = 50; 
let fd = [];
let fs = []; 
let on = []; 

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  frameRate(30);
  
  for (let i = 0; i < tX * tY; i++) {
    fd[i] = 0;
    fs[i] = 0;
    on[i] = false;
  }
  
  pg = createGraphics(800, 800);
  pg.background(0);
  pg.fill(255);
  pg.noStroke();
  pg.textSize(800);
  pg.textAlign(CENTER, CENTER);
  pg.textFont('sans-serif'); 
  pg.text("q", pg.width / 2, pg.height / 2);
}

function draw() {
  background(0);
  
  let tW = width / tX;
  let tH = height / tY;
  
  for (let y = 0; y < tY; y++) {
    for (let x = 0; x < tX; x++) {
      let i = y * tX + x;
      
      if (on[i]) {
        fs[i] += 0.8; 
        fd[i] += fs[i];
        
        if (fd[i] > height) {
          fd[i] = -height * random(0.5, 2);
          fs[i] = 0;
        }
      }
      
      let dy = y * tH + fd[i];
      if (dy > -tH && dy < height) {
        
        image(pg, x * tW, dy, tW, tH, x * tW, y * tH, tW, tH);
      }
    }
  }
}

function mousePressed() {
  let tW = width / tX;
  let tH = height / tY;
  
  for (let y = 0; y < tY; y++) {
    for (let x = 0; x < tX; x++) {
      let i = y * tX + x;
      let d = dist(x * tW, y * tH, mouseX, mouseY);
      
      if (!on[i] && d < 200) {
        on[i] = true;
        fs[i] = random(-20, -6);
      }
    }
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    for (let i = 0; i < tX * tY; i++) {
      fd[i] = 0;
      fs[i] = 0;
      on[i] = false;
    }
  }
}
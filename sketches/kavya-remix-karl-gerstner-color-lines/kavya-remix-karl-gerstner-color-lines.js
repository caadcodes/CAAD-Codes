var path = [];
var t = 0;

var points = [
  [17, 17], [1003, 17], [1003, 1003], [527, 1003], [527, 833], [833, 833],
  [833, 765], [765, 765], [765, 255], [595, 255], [595, 357], [663, 357],
  [663, 663], [357, 663], [357, 357], [425, 357], [425, 255], [255, 255],
  [255, 765], [187, 765], [187, 833], [493, 833], [493, 1003], [17, 1003]
];

var lb = '#80DADE';

var dark = ['#2E2D03', '#2E2D03', '#262C03', '#152712', '#092112', '#092112', '#152712', '#262C03', '#2E2D03', '#152712', '#032C23', '#2E2D03', '#262C03', '#152712', '#152712'];

var light = ['#A09F90', '#83C1AB', '#83D8C8', '#84D6D0', '#69DBDE', '#84D6D0', '#83C1AB', '#B0B9A1', '#83D8C8', '#69DBDE', '#B0B9A1', '#83C1AB', '#83D8C8', '#83D8C8', '#69DBDE'];

var topColors = ['#646342', '#525130', '#517968', '#416455', '#469B7F', '#40836D', '#5BBC9C', '#4AA789', '#39CAD1', '#2FB6BC'];

var bottomColors = ['#403F0C', '#7C7A5E', '#3A5241', '#77957F', '#376450', '#55A290', '#41765E', '#6CB2A4', '#569B9A', '#42C1C6', '#515A40', '#747159', '#3A5241', '#5C7E65'];

function setup() {
  createCanvas(1054, 1054);
  rectMode(CENTER);
  for (var i = 0; i < points.length; i++) {
    path.push(createVector(points[i][0], points[i][1]));
  }
  frameRate(25);
}

// --- HELPER GEOMETRY FUNCTIONS ---
function utri(x, y, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x + 17, y - 17); 
  vertex(x + 34, y); 
  endShape(CLOSE); 
}

function dtri(x, y, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x + 17, y + 17); 
  vertex(x + 34, y); 
  endShape(CLOSE); 
}

function lpara(x, y, w, f) { 
  fill(f); beginShape(); 
  vertex(x, y); 
  vertex(x + (17 * w), y); 
  vertex(x + ((17 * w) - 17), y - 17); 
  vertex(x - 17, y - 17); 
  endShape(CLOSE); 
}

function rpara(x, y, w, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x - (17 * w), y); 
  vertex(x - ((17 * w) - 17), y - 17); 
  vertex(x + 17, y - 17); 
  endShape(CLOSE); 
}

function utra(x, y, w, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x + 17, y - 17); 
  vertex(x + ((17 * w) - 17), y - 17); 
  vertex(x + (17 * w), y); 
  endShape(CLOSE); 
}

function dtra(x, y, w, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x + 17, y + 17); 
  vertex(x + ((17 * w) - 17), y + 17); 
  vertex(x + (17 * w), y); 
  endShape(CLOSE); 
}

function rtra(x, y, w, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x, y + (17 * w)); 
  vertex(x + 17, y + ((17 * w) - 17)); 
  vertex(x + 17, y + 17); 
  endShape(CLOSE); 
}

function ltra(x, y, w, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x, y + (17 * w)); 
  vertex(x - 17, y + ((17 * w) - 17)); 
  vertex(x - 17, y + 17); 
  endShape(CLOSE); 
}

function rtri(x, y, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x + 17, y + 17); 
  vertex(x, y + 34); 
  endShape(CLOSE); 
}

function ltri(x, y, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x - 17, y + 17); 
  vertex(x, y + 34); 
  endShape(CLOSE); 
}

function rightpara(x, y, w, f) {
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x + 17, y - 17); 
  vertex(x + 17, y - (17 * (w + 1))); 
  vertex(x, y - (17 * w)); 
  endShape(CLOSE); 
}

function leftpara(x, y, w, f) { 
  fill(f); 
  beginShape(); 
  vertex(x, y); 
  vertex(x - 17, y - 17); 
  vertex(x - 17, y - (17 * (w + 1))); 
  vertex(x, y - (17 * w)); 
  endShape(CLOSE); 
}

// --- SECTION FUNCTIONS ---
function behindleft() {
  var pd = 0, pl = 0, xPos = 17;
  for (var i = 0; i < 30; i++) {
    noStroke();
    fill(i % 2 === 0 ? dark[pd++] : light[pl++]);
    rect(xPos + 8.5, 17 + 510, 17, 1020); // Corrected for rectMode(CENTER)
    xPos += 17;
  }
}

function behindright() {
  var pd = 0, pl = 0, xPos = 1020;
  for (var i = 0; i < 30; i++) {
    noStroke();
    fill(i % 2 === 0 ? light[pl++] : dark[pd++]);
    rect(xPos + 8.5, 17 + 510, 17, 1020);
    xPos -= 17;
  }
}

function drawTop() {
  var xPos = 17;
  for (var i = 0; i < 10; i++) {
    noStroke();
    fill(topColors[i]);
    beginShape();
    vertex(xPos, xPos);
    vertex(1054 - xPos, xPos);
    vertex(1054 - (xPos + 17), xPos + 17);
    vertex(xPos + 17, xPos + 17);
    endShape(CLOSE);
    xPos += 17;
  }
}

function drawBottom() {
  var xPos = 17;
  for (var i = 0; i < 14; i++) {
    noStroke();
    fill(bottomColors[i]);
    beginShape();
    vertex(xPos, 1054 - xPos);
    vertex(xPos + 17, 1054 - (xPos + 17));
    vertex(1054 - (xPos + 17), 1054 - (xPos + 17));
    vertex(1054 - xPos, 1054 - xPos);
    endShape(CLOSE);
    xPos += 17;
  }
}

function ehori() {
  // DOWN
  // light brown
  lpara(204, 782, 2, topColors[0]); // t1
  utri(238, 782, topColors[0]);

  // light green
  utri(204, 748, bottomColors[5]); // b6
  utri(238, 748, bottomColors[5]);
  utri(272, 748, bottomColors[5]);
  utra(306, 748, 4, bottomColors[5]);
  rpara(408, 748, 2, bottomColors[5]);

  utri(442, 748, bottomColors[5]);
  utri(476, 748, bottomColors[5]);
  utri(510, 748, bottomColors[5]);
  utri(544, 748, bottomColors[5]);
  utri(578, 748, bottomColors[5]);

  lpara(646, 748, 2, bottomColors[5]);
  utra(680, 748, 4, bottomColors[5]);
  utri(748, 748, bottomColors[5]);
  utri(782, 748, bottomColors[5]);
  utri(816, 748, bottomColors[5]);

  // dark green
  rpara(221, 765, 2, bottomColors[4]); // b5
  dtri(238, 748, bottomColors[4]);
  dtri(272, 748, bottomColors[4]);
  dtra(306, 748, 4, bottomColors[4]);
  dtri(374, 748, bottomColors[4]);

  rpara(459, 765, 2, bottomColors[4]);
  dtri(476, 748, bottomColors[4]);
  dtri(510, 748, bottomColors[4]);
  dtri(544, 748, bottomColors[4]);
  lpara(595, 765, 2, bottomColors[4]);

  dtri(646, 748, bottomColors[4]);
  dtra(680, 748, 4, bottomColors[4]);
  dtri(748, 748, bottomColors[4]);
  dtri(782, 748, bottomColors[4]);
  lpara(833, 765, 2, bottomColors[4]);

  // darker blue
  rpara(357, 731, 2, topColors[9]); // t10
  lpara(697, 731, 2, topColors[9]);

  // light blue
  rpara(374, 714, 2, topColors[8]); // t9
  lpara(680, 714, 2, topColors[8]);

  // dark brown
  rpara(391, 697, 2, topColors[1]); // t2
  dtri(408, 680, topColors[1]);
  dtri(442, 680, topColors[1]);
  dtri(476, 680, topColors[1]);
  dtri(510, 680, topColors[1]);
  dtri(544, 680, topColors[1]);
  dtri(578, 680, topColors[1]);
  dtri(612, 680, topColors[1]);
  lpara(663, 697, 2, topColors[1]);

  // light brown
  utri(374, 680, topColors[0]); // t1
  utri(408, 680, topColors[0]);
  utri(442, 680, topColors[0]);
  utri(476, 680, topColors[0]);
  utri(510, 680, topColors[0]);
  utri(544, 680, topColors[0]);
  utri(578, 680, topColors[0]);
  utri(612, 680, topColors[0]);
  utri(646, 680, topColors[0]);

  // light green
  utra(306, 782, 4, bottomColors[5]); // b6
  utri(374, 782, bottomColors[5]);
  rpara(442, 782, 2, bottomColors[5]);
  utri(476, 782, bottomColors[5]);
  utri(510, 782, bottomColors[5]);
  utri(544, 782, bottomColors[5]);
  lpara(612, 782, 2, bottomColors[5]);
  utri(646, 782, bottomColors[5]);
  utra(680, 782, 4, bottomColors[5]);

  // light brown
  utri(782, 782, topColors[0]); // t1
  rpara(850, 782, 2, topColors[0]);

  // dark brown
  dtri(204, 782, topColors[1]); // t2
  lpara(255, 799, 2, topColors[1]);
  dtri(816, 782, topColors[1]);
  rpara(799, 799, 2, topColors[1]);

  // dark green
  rpara(357, 799, 4, bottomColors[4]); // b5
  dtri(374, 782, bottomColors[4]);
  dtri(408, 782, bottomColors[4]);
  rpara(493, 799, 2, bottomColors[4]);
  dtri(510, 782, bottomColors[4]);
  lpara(561, 799, 2, bottomColors[4]);
  dtri(612, 782, bottomColors[4]);
  dtri(646, 782, bottomColors[4]);
  lpara(697, 799, 4, bottomColors[4]);

  // light blue
  utri(510, 816, topColors[8]); // t9
  // darker blue
  utra(493, 833, 4, topColors[9]); // t10

  // army green
  utri(408, 714, bottomColors[3]); // b4
  utri(442, 714, bottomColors[3]);
  utri(476, 714, bottomColors[3]);
  utri(510, 714, bottomColors[3]);
  utri(544, 714, bottomColors[3]);
  utri(578, 714, bottomColors[3]);
  utri(612, 714, bottomColors[3]);

  rpara(425, 731, 2, bottomColors[2]); // b3
  dtri(442, 714, bottomColors[2]);
  dtri(476, 714, bottomColors[2]);
  dtri(510, 714, bottomColors[2]);
  dtri(544, 714, bottomColors[2]);
  dtri(578, 714, bottomColors[2]);
  lpara(629, 731, 2, bottomColors[2]);

  // UP sections
  dtra(187, 187, 12, bottomColors[5]); // b6
  dtra(391, 187, 8, topColors[8]); // t9
  dtra(527, 187, 8, topColors[8]);
  dtra(663, 187, 12, bottomColors[5]);
  dtra(204, 204, 10, bottomColors[4]); // b5
  dtra(408, 204, 6, topColors[9]); // t10
  dtra(544, 204, 6, topColors[9]);
  dtra(680, 204, 10, bottomColors[4]);
  dtra(221, 221, 8, bottomColors[3]); // b4
  dtra(697, 221, 8, bottomColors[3]);

  utri(374, 238, bottomColors[5]); // b6
  rpara(476, 238, 4, bottomColors[5]);
  lpara(578, 238, 4, bottomColors[5]);
  utri(646, 238, bottomColors[5]);

  dtra(238, 238, 6, bottomColors[2]); // b3
  dtra(714, 238, 6, bottomColors[2]);
  rpara(391, 255, 2, bottomColors[6]); // b7
  dtra(408, 238, 4, bottomColors[6]);
  dtra(578, 238, 4, bottomColors[6]);
  lpara(663, 255, 2, bottomColors[6]);

  lpara(272, 272, 4, topColors[0]); // t1
  utra(340, 272, 4, topColors[0]);
  rpara(442, 272, 2, topColors[0]);
  lpara(612, 272, 2, topColors[0]);
  utra(646, 272, 4, topColors[0]);
  rpara(782, 272, 4, topColors[0]);

  dtra(272, 272, 4, topColors[1]); // t2
  dtra(340, 272, 4, topColors[1]);
  dtri(408, 272, topColors[1]);
  dtri(612, 272, topColors[1]);
  dtra(646, 272, 4, topColors[1]);
  dtra(714, 272, 4, topColors[1]);

  lpara(425, 391, 2, topColors[1]);
  dtri(374, 374, topColors[1]);
  rpara(629, 391, 2, topColors[1]);
  dtri(646, 374, topColors[1]);

  lpara(306, 306, 2, topColors[8]); // t9
  utra(340, 306, 4, topColors[8]);
  utra(646, 306, 4, topColors[8]);
  rpara(748, 306, 2, topColors[8]);

  dtri(306, 306, topColors[9]); // t10
  lpara(357, 323, 4, topColors[9]);
  rpara(697, 323, 4, topColors[9]);
  dtri(714, 306, topColors[9]);
  rpara(323, 391, 2, topColors[9]);
  lpara(731, 391, 2, topColors[9]);

  rpara(408, 340, 4, bottomColors[3]); // b4
  lpara(646, 340, 4, bottomColors[3]);
  rpara(391, 357, 4, bottomColors[2]); // b3
  lpara(663, 357, 4, bottomColors[2]);

  rpara(340, 374, 2, topColors[8]); // t9
  lpara(714, 374, 2, topColors[8]);
  lpara(374, 374, 2, topColors[0]); // t1
  utri(408, 374, topColors[0]);
  rpara(680, 374, 2, topColors[0]);
  utri(612, 374, topColors[0]);

  lpara(306, 408, 2, bottomColors[5]); // b6
  utri(340, 408, bottomColors[5]);
  utri(374, 408, bottomColors[5]);
  rpara(442, 408, 2, bottomColors[5]);
  rpara(748, 408, 2, bottomColors[5]);
  utri(646, 408, bottomColors[5]);
  utri(680, 408, bottomColors[5]);
  lpara(612, 408, 2, bottomColors[5]);

  dtri(306, 408, bottomColors[6]); // b7
  dtri(340, 408, bottomColors[6]);
  dtri(374, 408, bottomColors[6]);
  dtri(408, 408, bottomColors[6]);
  dtri(714, 408, bottomColors[6]);
  dtri(680, 408, bottomColors[6]);
  dtri(646, 408, bottomColors[6]);
  dtri(612, 408, bottomColors[6]);
}

function everti() {
  // EXTRAS VERTICAL
  rtri(408, 204, light[14]); // l15
  rtri(408, 238, light[14]);
  leftpara(425, 323, 2, light[14]);

  rightpara(646, 238, 2, light[14]);
  rtri(646, 238, light[14]);
  rtri(646, 272, light[14]);
  ltra(765, 289, 6, light[14]);
  rtra(306, 306, 4, light[14]);

  rtra(612, 272, 6, light[7]); // l8
  ltra(459, 255, 8, light[7]);

  rtra(204, 782, 4, light[7]);
  ltra(867, 765, 6, light[7]);
  rightpara(374, 748, 2, lb);
  rtri(374, 748, lb);
  rtri(374, 782, lb);
  rtri(374, 816, lb);
  leftpara(391, 901, 2, lb);

  rtri(680, 714, lb);
  rtri(680, 748, lb);
  rtri(680, 782, lb);
  rtri(680, 816, lb);
  rtri(680, 850, lb);

  ltri(374, 782, dark[10]); // d11
  ltri(374, 816, dark[10]);
  ltri(374, 850, dark[10]);
  rightpara(391, 731, 2, dark[10]);
  ltra(408, 850, 4, dark[10]);
  ltri(408, 748, dark[10]);
  ltri(408, 782, dark[10]);
  ltri(408, 816, dark[10]);
  rightpara(425, 765, 2, dark[10]);
  ltri(442, 782, dark[10]);
  ltri(442, 816, dark[10]);
  ltra(442, 850, 6, dark[10]);

  ltri(680, 782, dark[10]);
  ltri(680, 816, dark[10]);
  rightpara(663, 901, 2, dark[10]);
  leftpara(646, 782, 2, dark[10]);
  ltri(646, 782, dark[10]);
  ltri(646, 816, dark[10]);
  rightpara(629, 935, 4, dark[10]);
  leftpara(612, 816, 2, dark[10]);

  rightpara(493, 833, 2, dark[3]); // d4
  ltri(476, 816, dark[3]);
  ltra(476, 850, 8, dark[3]);
  ltri(544, 782, dark[3]);
  ltri(612, 816, dark[3]);
  rightpara(595, 969, 6, dark[3]);

  rightpara(408, 782, 2, light[12]); // l13
  rtri(408, 782, light[12]);
  rtri(408, 816, light[12]);
  leftpara(425, 935, 4, light[12]);
  rightpara(442, 816, 2, light[12]);
  rtri(442, 816, light[12]);
  leftpara(459, 969, 6, light[12]);
  rtri(646, 748, light[12]);
  rtri(646, 782, light[12]);
  rtri(646, 816, light[12]);
  rtra(646, 850, 4, light[12]);
  rtri(612, 782, light[12]);
  rtri(612, 816, light[12]);
  rtra(612, 850, 6, light[12]);

  rightpara(476, 850, 2, light[1]); // l2
  leftpara(493, 1003, 8, light[1]);
  rtri(578, 816, light[1]);
  rtra(578, 850, 8, light[1]);

  ltra(510, 850, 10, dark[0]); // d1
  rtra(527, 833, 12, dark[0]);
  leftpara(578, 850, 2, dark[0]);
  rightpara(561, 1003, 8, dark[0]);

  ltra(527, 833, 12, light[0]); // l1
  rtra(544, 850, 10, light[0]);

  rtri(510, 782, light[14]); // l15
  rtri(544, 782, light[14]);
  leftpara(561, 833, 2, light[14]);
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(1);

  behindleft();
  behindright();
  drawTop();
  drawBottom();
  ehori();
  everti();

  if (mouseIsPressed) {
    let currentIndex = floor(t) % path.length;
    let nextIndex = (currentIndex + 1) % path.length;
    let amt = t - floor(t);

    let current = path[currentIndex];
    let next = path[nextIndex];

    let x = lerp(current.x, next.x, amt);
    let y = lerp(current.y, next.y, amt);

    fill(255);
    push();
    rectMode(CORNER);
    rect(x, y, 34, 34);
    pop();
    t += 0.07;
  }
  
  stroke(255, 30); // White with very low opacity
  for (let i = 0; i < 10000; i++) {
    point(random(width), random(height));
  }
  
  stroke(0, 30); // Black with very low opacity
  for (let i = 0; i < 10000; i++) {
    point(random(width), random(height));
  }
  
}
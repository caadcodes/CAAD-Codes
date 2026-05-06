let letters = ["5", "V", "٥", "५", "௫", "൫", "၅"];
let fontPaths = [
  "NotoSans-VariableFont_wdth,wght copy.ttf",
  "NotoSans-VariableFont_wdth,wght copy.ttf",
  "NotoSansArabic_Condensed-Bold copy.ttf",
  "NotoSansDevanagari-VariableFont_wdth,wght copy.ttf",
  "NotoSansTamil-VariableFont_wdth,wght copy.ttf",
  "NotoSansMalayalam-VariableFont_wdth,wght copy.ttf",
  "NotoSansMyanmar-VariableFont_wdth,wght copy.ttf"
];

let index = 0;
let separatedPaths = []; // This will hold our clean paths
let cx = 0, cy = 0;

function setup() {
  createCanvas(1000, 1000);
  loadLetterWithOpenType();
}

function draw() {
  background(20);
  noFill();
  stroke(255);
  strokeWeight(4);
  translate(width / 2, height / 2);

  // Loop through each isolated path (avoids the crossing lines)
  for (let pathPoints of separatedPaths) {
    beginShape();
    for (let p of pathPoints) {
      let x = p.x - cx;
      let y = p.y - cy;
      
      // Your wavy noise logic
      let nX = noise(x * 0.01, y * 0.01, frameCount * 0.025);
      let nY = noise(x * 0.01 + 5555, y * 0.01 + 5555, frameCount * 0.025);
      let offX = map(nX, 0, 1, -15, 15);
      let offY = map(nY, 0, 1, -15, 15);
      
      vertex(x + offX, y + offY);
    }
    endShape(CLOSE);
  }
}

function loadLetterWithOpenType() {
  // This is the part that needs the library in index.html
  opentype.load(fontPaths[index], function(err, font) {
    if (err) {
      console.error('Font could not be loaded: ' + err);
    } else {
      let path = font.getPath(letters[index], 0, 0, 500);
      
      // Group points by their "commands" to keep holes separate
      separatedPaths = [];
      let currentPath = [];
      
      for (let cmd of path.commands) {
        if (cmd.type === 'M' && currentPath.length > 0) {
          separatedPaths.push(currentPath);
          currentPath = [];
        }
        if (cmd.type !== 'Z') {
          currentPath.push({ x: cmd.x, y: cmd.y });
        }
      }
      separatedPaths.push(currentPath);

      // Calculate Bounding Box for centering
      let bbox = path.getBoundingBox();
      cx = (bbox.x1 + bbox.x2) / 2;
      cy = (bbox.y1 + bbox.y2) / 2;
    }
  });
}

function mousePressed() {
  index = (index + 1) % letters.length;
  loadLetterWithOpenType();
}
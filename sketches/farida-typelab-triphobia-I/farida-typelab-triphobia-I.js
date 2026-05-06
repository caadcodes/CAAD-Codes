let allPoints = [];
let fontReady = false;

function setup() {
  createCanvas(1000, 1000);

  opentype.load('Monoton-Regular.ttf', function(err, font) {
    if (err) {
      console.log('Font could not be loaded: ' + err);
    } else {
      let glyphs = font.stringToGlyphs('!');
      let samples = 20;
      let fontScale = 500 / font.unitsPerEm; // renamed from scale to fontScale

      for (let g = 0; g < glyphs.length; g++) {
        let glyph = glyphs[g];
        if (!glyph.path) continue;

        let cmds = glyph.path.commands;
        let contour = [];
        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < cmds.length; i++) {
          let cmd = cmds[i];

          // Scale and flip Y
          let sx  = cmd.x  !== undefined ? cmd.x  * fontScale : 0;
          let sy  = cmd.y  !== undefined ? -cmd.y * fontScale : 0;
          let sx1 = cmd.x1 !== undefined ? cmd.x1 * fontScale : 0;
          let sy1 = cmd.y1 !== undefined ? -cmd.y1 * fontScale : 0;
          let sx2 = cmd.x2 !== undefined ? cmd.x2 * fontScale : 0;
          let sy2 = cmd.y2 !== undefined ? -cmd.y2 * fontScale : 0;

          if (cmd.type === 'M') {
            if (contour.length > 0) {
              allPoints.push(contour);
              contour = [];
            }
            currentX = sx;
            currentY = sy;
            contour.push({ x: sx, y: sy });

          } else if (cmd.type === 'L') {
            for (let t = 0; t <= 1; t += 1 / samples) {
              contour.push({
                x: lerp(currentX, sx, t),
                y: lerp(currentY, sy, t)
              });
            }
            currentX = sx;
            currentY = sy;

          } else if (cmd.type === 'C') {
            for (let t = 0; t <= 1; t += 1 / samples) {
              contour.push({
                x: cubicBezier(t, currentX, sx1, sx2, sx),
                y: cubicBezier(t, currentY, sy1, sy2, sy)
              });
            }
            currentX = sx;
            currentY = sy;

          } else if (cmd.type === 'Q') {
            for (let t = 0; t <= 1; t += 1 / samples) {
              contour.push({
                x: quadBezier(t, currentX, sx1, sx),
                y: quadBezier(t, currentY, sy1, sy)
              });
            }
            currentX = sx;
            currentY = sy;

          } else if (cmd.type === 'Z') {
            if (contour.length > 0) {
              allPoints.push(contour);
              contour = [];
            }
          }
        }

        if (contour.length > 0) {
          allPoints.push(contour);
        }
      }

      console.log("Number of contours: " + allPoints.length);
      fontReady = true;
    }
  });
}

function cubicBezier(t, p0, p1, p2, p3) {
  let mt = 1 - t;
  return (mt * mt * mt * p0) +
         (3 * mt * mt * t * p1) +
         (3 * mt * t * t * p2) +
         (t * t * t * p3);
}

function quadBezier(t, p0, p1, p2) {
  let mt = 1 - t;
  return (mt * mt * p0) +
         (2 * mt * t * p1) +
         (t * t * p2);
}

function draw() {
  background(0);

  if (!fontReady) return;

  translate(width / 2 - 30, height / 2 + 150);

  stroke(255, 255, 0);
  strokeWeight(1);
  fill(0);

  let mx = mouseX - (width / 2 - 30);
  let my = mouseY - (height / 2 + 150);

  for (let i = 0; i < allPoints.length; i++) {
    for (let j = 0; j < allPoints[i].length; j++) {
      push();
      let x = allPoints[i][j].x;
      let y = allPoints[i][j].y;

      let d = dist(mx, my, x, y);

      let sz = 2;
      if (d < 80) {
        sz = map(d, 0, 80, 20, 2); // closer = bigger
      }

      translate(x, y);
      ellipse(0, 0, sz, sz);
      pop();
    }
  }
}
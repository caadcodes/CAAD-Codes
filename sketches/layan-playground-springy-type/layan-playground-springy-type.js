let font;
let points = [];
let c1, c2;

function preload() {
 
}

function setup() {
  createCanvas(900, 900);
  c1 = color(31, 118, 255);
  c2 = color(255);

  // Load opentype.js dynamically
  let script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js";
  script.onload = () => {
    opentype.load("ABCMarfaMonoVariable-Trial.ttf", function (err, loadedFont) {
      if (err) {
        console.error("Font could not be loaded: " + err);
        return;
      }

      // Get the path for "ABC" at font size 450, positioned at center
      let path = loadedFont.getPath("ABC", 0, 0, 450);
      let totalLength = 0;

      // Sample points evenly along each path command
      let tempPoints = [];
      let cmds = path.commands;

      let x = 0, y = 0;

      for (let i = 0; i < cmds.length; i++) {
        let cmd = cmds[i];

        if (cmd.type === "M") {
          x = cmd.x;
          y = cmd.y;
        } else if (cmd.type === "L") {
          // Line — sample at fixed intervals of ~3px
          let dx = cmd.x - x;
          let dy = cmd.y - y;
         let lineDist = Math.sqrt(dx * dx + dy * dy);
let steps = Math.max(1, Math.floor(lineDist / 3));
          for (let t = 0; t <= steps; t++) {
            tempPoints.push({
              x: x + (dx * t) / steps,
              y: y + (dy * t) / steps,
            });
          }
          x = cmd.x;
          y = cmd.y;
        } else if (cmd.type === "C") {
          // Cubic bezier — sample at fixed intervals
          let steps = 30;
          for (let t = 0; t <= steps; t++) {
            let tt = t / steps;
            let bx = cubicBezier(x, cmd.x1, cmd.x2, cmd.x, tt);
            let by = cubicBezier(y, cmd.y1, cmd.y2, cmd.y, tt);
            tempPoints.push({ x: bx, y: by });
          }
          x = cmd.x;
          y = cmd.y;
        } else if (cmd.type === "Q") {
          // Quadratic bezier
          let steps = 20;
          for (let t = 0; t <= steps; t++) {
            let tt = t / steps;
            let bx = quadBezier(x, cmd.x1, cmd.x, tt);
            let by = quadBezier(y, cmd.y1, cmd.y, tt);
            tempPoints.push({ x: bx, y: by });
          }
          x = cmd.x;
          y = cmd.y;
        }
      }

      // Center the points like the original
      let bounds = path.getBoundingBox();
      let cx = (bounds.x1 + bounds.x2) / 2;
      let cy = (bounds.y1 + bounds.y2) / 2;

      points = tempPoints.map((p) => ({
        x: p.x - cx,
        y: p.y - cy,
      }));
    });
  };
  document.head.appendChild(script);
}

function draw() {
  background(0);
  translate(width / 2, height / 2 + 150);

  for (let i = 0; i < points.length; i++) {
    let p = map(points[i].y, -200, 200, 0, 1);

    stroke(lerpColor(c1, c2, p));
    strokeWeight(1);
    fill(255);

    let h = abs(cos(frameCount * 0.05)) * 60;
    ellipse(points[i].x, points[i].y, 2, h);
  }
}

// Cubic bezier helper
function cubicBezier(p0, p1, p2, p3, t) {
  return (
    (1 - t) ** 3 * p0 +
    3 * (1 - t) ** 2 * t * p1 +
    3 * (1 - t) * t ** 2 * p2 +
    t ** 3 * p3
  );
}

// Quadratic bezier helper
function quadBezier(p0, p1, p2, t) {
  return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t ** 2 * p2;
}
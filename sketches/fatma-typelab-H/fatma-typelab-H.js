let maskGraphics;
let energy;
let myFont;
let frameCounter = 0;
let maskPixels;

// ============================================================
// CONFIGURATION
// ============================================================
const LETTER      = 'H';
const FONT_SIZE   = 900;
const FONT_FACE   = 'MichauxTest-Regular.otf';

const hoverRadius = 800;
const fadeSpeed   = 0.96;
const waveAmount  = 35;
const bgCol       = [0, 0, 0];
const backCol     = [255, 255, 255];
const cA          = [255, 230, 0];
const cB          = [255, 80, 0];
// ============================================================

function preload() {
  myFont = loadFont(FONT_FACE);
}

function setup() {
  createCanvas(1000, 1000);
  pixelDensity(1);
  noLoop();

  energy = new Float32Array(width * height);

  maskGraphics = createGraphics(width, height);
  maskGraphics.pixelDensity(1);
  maskGraphics.background(0);
  maskGraphics.fill(255);
  maskGraphics.noStroke();
  maskGraphics.textFont(myFont);
  maskGraphics.textSize(FONT_SIZE);
  maskGraphics.textAlign(CENTER, BASELINE);
  maskGraphics.text(LETTER, width / 2, height / 2 + FONT_SIZE * 0.32);
  maskGraphics.loadPixels();
  maskPixels = maskGraphics.pixels;

  requestAnimationFrame(renderLoop);
}

function draw() {}

function renderLoop() {
  const W = width, H = height;
  const mx = mouseX, my = mouseY;
  const mc = mx >= 0 && mx < W && my >= 0 && my < H;

  for (let i = 0; i < W * H; i++) energy[i] *= fadeSpeed;

  if (mc && inLetter(mx, my, W)) {
    const x0 = Math.max(0, mx - hoverRadius | 0);
    const x1 = Math.min(W - 1, mx + hoverRadius | 0);
    const y0 = Math.max(0, my - hoverRadius | 0);
    const y1 = Math.min(H - 1, my + hoverRadius | 0);
    for (let xi = x0; xi <= x1; xi++) {
      for (let yi = y0; yi <= y1; yi++) {
        if (!inLetter(xi, yi, W)) continue;
        const dx = xi - mx, dy = yi - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < hoverRadius) {
          const val = Math.pow(1 - d / hoverRadius, 2);
          const idx = xi + yi * W;
          if (val > energy[idx]) energy[idx] = val;
        }
      }
    }
  }

  loadPixels();
  const t = frameCounter * 0.06;

  for (let yi = 0; yi < H; yi++) {
    for (let xi = 0; xi < W; xi++) {
      const pi  = (xi + yi * W) * 4;
      const lit = inLetter(xi, yi, W);

      if (!lit) {
        pixels[pi]   = bgCol[0];
        pixels[pi+1] = bgCol[1];
        pixels[pi+2] = bgCol[2];
        pixels[pi+3] = 255;
        continue;
      }

      pixels[pi]   = backCol[0];
      pixels[pi+1] = backCol[1];
      pixels[pi+2] = backCol[2];
      pixels[pi+3] = 255;

      const e = energy[xi + yi * W];
      if (e <= 0.01) continue;

      let ddx = (Math.sin(yi*0.045+t*1.8) + 0.6*Math.sin(yi*0.09-t*2.3) + 0.35*Math.sin((xi+yi)*0.03+t*1.2)) * waveAmount * e;
      let ddy = (Math.sin(xi*0.035-t*1.5) + 0.4*Math.sin((xi-yi)*0.025+t*2.0)) * (waveAmount*0.35) * e;

      if (mc) {
        const dxm = xi - mx, dym = yi - my;
        const d   = Math.sqrt(dxm * dxm + dym * dym);
        if (d < hoverRadius * 1.4) {
          const push  = Math.pow(1 - d / (hoverRadius * 1.4), 1.8);
          const angle = Math.atan2(dym, dxm);
          ddx += Math.cos(angle) * 25.0 * push * e;
          ddy += Math.sin(angle) * 25.0 * push * e;
        }
      }

      const tx = Math.min(W-1, Math.max(0, Math.round(xi + ddx)));
      const ty = Math.min(H-1, Math.max(0, Math.round(yi + ddy)));

      for (let ox = -2; ox <= 2; ox++) {
        for (let oy = -2; oy <= 2; oy++) {
          const px = tx + ox, py = ty + oy;
          if (px < 0 || px >= W || py < 0 || py >= H) continue;
          const d0       = Math.sqrt(ox*ox + oy*oy);
          const strength = 1 - d0 / 3;
          if (Math.random() < strength * e) {
            const n   = Math.min(1, Math.max(0,
              (px + py*0.5) / (W + H*0.5) + 0.2*Math.sin(frameCounter*0.05 + px*0.01)
            ));
            const col = lerpColorRGB(cA, cB, n);
            const pix = (px + py * W) * 4;
            pixels[pix]   = col[0];
            pixels[pix+1] = col[1];
            pixels[pix+2] = col[2];
            pixels[pix+3] = 255;
          }
        }
      }
    }
  }

  updatePixels();
  frameCounter++;
  requestAnimationFrame(renderLoop);
}

function inLetter(x, y, W) {
  return maskPixels[(x + y * W) * 4] > 10;
}

function lerpColorRGB(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t
  ];
}
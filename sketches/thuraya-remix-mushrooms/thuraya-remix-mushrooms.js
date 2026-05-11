/* p5.js port of the Processing mushrooms sketch.
   Processing uses loadShape() + disableStyle() + fill() to render
   the same SVG in a different random colour each frame. p5.js has
   no shape-recolouring primitive, so we:
     1. Load the SVG through a plain HTMLImageElement — the browser
        renders it natively, honouring every <style>, transform,
        gradient, and clipPath in the file.
     2. Each frame, draw it into an off-screen p5.Graphics buffer
        and then use canvas globalCompositeOperation = 'source-in'
        to repaint every visible pixel with one random RGB colour
        (the alpha mask is preserved, the colour is uniform — exactly
        what disableStyle() + fill() + shape() produced in Processing).
     3. Blit the recoloured buffer onto the main canvas. */

let mushroomi;
let svgImg;          // HTMLImageElement of shroomz1.svg
let svgReady = false;
let tintBuffer;      // p5.Graphics for the recolour step

let showSVG = false;

function preload() {
  mushroomi = loadImage('mushrooms.jpeg');

  /* Image() loads the SVG asynchronously and doesn't block preload.
     draw() guards on svgReady so we just skip the overlay until it's in. */
  svgImg = new Image();
  svgImg.onload  = () => { svgReady = true; };
  svgImg.onerror = (e) => { console.error('SVG load failed:', e); };
  svgImg.src = 'shroomz1.svg';
}

function setup() {
  pixelDensity(2);
  createCanvas(950, 700);
  noStroke();

  /* Off-screen buffer used to render+recolour the SVG. Same size as
     the main canvas, same pixelDensity, so it composites 1:1. */
  tintBuffer = createGraphics(950, 700);
  tintBuffer.pixelDensity(2);
}

function draw() {
  if (!showSVG) {
    image(mushroomi, 0, 0, width, height);
  } else {
    background(random(255), random(255), random(255));
  }

  if (svgReady) drawShroomzOverlay();
}

function drawShroomzOverlay() {
  const ctx = tintBuffer.drawingContext;

  /* clear() resets both the visible bitmap and the alpha channel — we
     need full transparency so source-in only paints where the SVG has
     non-zero alpha. */
  tintBuffer.clear();

  /* Step 1: rasterise the SVG into the buffer. The browser uses the SVG's
     viewBox to fit it into the destination rect, so a 944.5×682 source
     scales naturally into 950×700. */
  ctx.drawImage(svgImg, 0, 0, tintBuffer.width, tintBuffer.height);

  /* Step 2: source-in fill flattens every non-transparent pixel to one
     random colour, preserving the alpha mask. This is the direct
     equivalent of disableStyle() + fill(r,g,b) + shape(svg) in
     Processing. */
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = `rgb(${floor(random(256))},${floor(random(256))},${floor(random(256))})`;
  ctx.fillRect(0, 0, tintBuffer.width, tintBuffer.height);
  ctx.globalCompositeOperation = 'source-over';

  image(tintBuffer, 0, 0, width, height);
}

function mousePressed() {
  showSVG = !showSVG;
}

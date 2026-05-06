let amp;
let vol = 0;
let letterPoints = [];
const dance = 2;
let soundReady = false;
let started = false;
let myFont;
let analyser, dataArray;

function preload() {
  myFont = loadFont('DEMO-JAF-LaptureCondensed-Extrabold.ttf', () => {
    letterPoints = getLetterPoints("t", 600);
  });
}

function setup() {
  createCanvas(900, 900, WEBGL);
}

function draw() {
  background(0);

  if (!started) {
    textFont(myFont);
    fill(255);
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text("click to start + allow mic", 0, 0);
    return;
  }

  // Read volume directly from Web Audio analyser
  if (soundReady && analyser) {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
    vol = (sum / dataArray.length) / 255; // normalize 0-1
  }

  ambientLight(60);
  directionalLight(255, 255, 255, 0, 0, -1);

  let sphereSize = map(vol, 0, 0.3, 5, 30);
  let reactDance = map(vol, 0, 0.3, dance, dance * 8);

  noFill();
  stroke(0, 0, 255);
  strokeWeight(0.5);

  for (let i = 0; i < letterPoints.length; i++) {
    push();
    translate(letterPoints[i].x, letterPoints[i].y, 0);

    let t = frameCount * 0.05 + i * 0.1;
    let sx = noise(t,     i * 0.1) * reactDance;
    let sy = noise(t + 5, i * 0.1) * reactDance;
    let sz = noise(t + 8, i * 0.1) * reactDance;
    scale(sx, sy, sz);

    sphere(sphereSize, 6, 6);
    pop();
  }
}

async function mouseClicked() {
  if (started) return;
  started = true;

  try {
    // Use raw Web Audio API — works reliably in all browsers
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.3;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    source.connect(analyser);
    soundReady = true;
    console.log("Mic started via Web Audio API!");
  } catch(e) {
    console.log("Mic failed:", e.message);
    started = false;
  }
}

function getLetterPoints(letter, fontSize) {
  let offscreen = document.createElement('canvas');
  offscreen.width  = 900;
  offscreen.height = 900;
  let ctx = offscreen.getContext('2d');

  ctx.font = `bold ${fontSize}px DEMO-JAF-LaptureCondensed-Extrabold`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText(letter, 450, 450);

  let imageData = ctx.getImageData(0, 0, 900, 900);
  let data = imageData.data;

  let minX = 900, maxX = 0, minY = 900, maxY = 0;
  for (let y = 0; y < 900; y++) {
    for (let x = 0; x < 900; x++) {
      if (data[(y * 900 + x) * 4] > 128) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  let centerX = (minX + maxX) / 2;
  let centerY = (minY + maxY) / 2;

  let points = [];
  let step = 20;

  for (let y = 0; y < 900; y += step) {
    for (let x = 0; x < 900; x += step) {
      let idx = (y * 900 + x) * 4;
      if (data[idx] > 128) {
        points.push({ x: x - centerX, y: y - centerY });
      }
    }
  }

  return points;
}
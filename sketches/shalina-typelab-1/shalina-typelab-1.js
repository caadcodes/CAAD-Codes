let amp;
let img;
let font;
const cols = 70;
const rows = 70;
const chars = "./(0100011011";
let t = 0;
let volume = 0;
let Pulse = [];
let songLoaded = false;

function preload() {
  img  = loadImage('Artboard 9.png');
  font = loadFont('VCR_OSD_MONO_1.001.ttf');
}

function setup() {
  createCanvas(800, 800);
  soundFormats('mp3');
  loadSound(
    'clubbed to death - Matrix soundtrack.mp3.mp3',
    (s) => {
      s.loop();
      s.jump(240);
      amp = new p5.Amplitude();
      amp.setInput(s);
      songLoaded = true;
    },
    (err) => {
      console.log('No audio file found — running visuals only.');
    }
  );

  for (let x = 0; x < cols; x++) {
    Pulse[x] = [];
    for (let y = 0; y < rows; y++) {
      Pulse[x][y] = random(1) < 0.01;
    }
  }
}

function draw() {
  fill(0, 40);
  noStroke();
  rect(0, 0, width, height);
  textFont(font);
  textAlign(CENTER, CENTER);

  const cellW = width  / cols;
  const cellH = height / rows;

  t += 0.05;

  if (songLoaded && amp) {
    volume = lerp(volume, amp.getLevel(), 0.85); // faster response
  }

  // lower threshold + much bigger max size = dramatic bursts
  const pulse = map(volume, 0, 0.15, 6, 40);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const yPos = (y * cellH + t) % height;
      const c = img.get(int(x * cellW + cellW / 2), int(yPos));
      const selector = int(map(brightness(c), 0, 255, 0, chars.length - 1));

      fill('#00FF41');

      if (Pulse[x][y] === true) {
        textSize(pulse);
      } else {
        textSize(10);
      }

      text(chars.charAt(selector), x * cellW + cellW / 2, yPos);
    }
  }
}
// CAAD Codes — Animated Logo v4
// Typewriter effect — letters type in one by one, occasional syntax slip, then retype
// ABC Diatype Mono Regular

var fontSize = 300;
var tracking = 1.45;
var lineH    = 0.25;
var padX     = 32;
var padY     = 110;

var chars = [
  { base: 'C', col: 0, row: 0, isFixed: false },
  { base: 'A', col: 1, row: 0, isFixed: false },
  { base: 'A', col: 2, row: 0, isFixed: false },
  { base: 'D', col: 3, row: 0, isFixed: false },
  { base: '(', col: 4, row: 0, isFixed: true, fixedColor: '#FFFFFF' },
  { base: ')', col: 5, row: 0, isFixed: true, fixedColor: '#FFFFFF' },
  { base: 'c', col: 2, row: 1, isFixed: false },
  { base: 'o', col: 3, row: 1, isFixed: false },
  { base: 'd', col: 4, row: 1, isFixed: false },
  { base: 'e', col: 5, row: 1, isFixed: false },
  { base: 's', col: 6, row: 1, isFixed: false },
  { base: '{', col: 7, row: 1, isFixed: true, fixedColor: '#FFFFFF' },
];

var syntaxColors = [
  '#FFFFFF',
  '#6A9955',
  '#4EC9B0',
  '#C586C0',
  '#9CDCFE',
];

var syntaxChars = ['<', '>', ';', '%', '@', '//', '!', '?', '[', '+', '&'];

var charW;

var rowStates = [
  {
    chars: [0, 1, 2, 3],
    typed: 0,
    display: [],
    phase: 'typing',
    timer: 0,
    typeInterval: 14,
    holdDuration: 220,
    clearInterval: 6,
    slipIndex: -1,
    slipChar: '',
    slipColor: '',
    slipTimer: 0,
    slipDuration: 18,
  },
  {
    chars: [6, 7, 8, 9, 10],
    typed: 0,
    display: [],
    phase: 'cleared',
    timer: 0,
    typeInterval: 15,
    holdDuration: 200,
    clearInterval: 7,
    slipIndex: -1,
    slipChar: '',
    slipColor: '',
    slipTimer: 0,
    slipDuration: 18,
  },
];

var row1Unlocked = false;
var row1UnlockDelay = 0;

function setup() {
  var cnv = createCanvas(900, 260);
  cnv.parent('caad-logo');

  textFont('"ABC Diatype Mono Regular", "Courier New", monospace');
  textSize(fontSize);
  charW = textWidth('A') * tracking;

  rowStates[0].display = [null, null, null, null];
  rowStates[1].display = [null, null, null, null, null];

  noLoop();
  document.fonts.load(fontSize + 'px "ABC Diatype Mono Regular"').then(function () {
    textFont('"ABC Diatype Mono Regular", "Courier New", monospace');
    textSize(fontSize);                    // ← KEY FIX: set size BEFORE measuring
    charW = textWidth('A') * tracking;     // now charW reflects the real font metrics
    loop();
  }).catch(function (err) {
    console.warn('[caad-logo] webfont fallback:', err);
    textSize(fontSize);
    charW = textWidth('A') * tracking;
    loop();
  });
}

function draw() {
  clear();
  textSize(fontSize);
  noStroke();

  updateRow(rowStates[0], 0);

  if (!row1Unlocked) {
    if (rowStates[0].phase === 'hold' && row1UnlockDelay === 0) {
      row1UnlockDelay = 30;
    }
    if (row1UnlockDelay > 0) {
      row1UnlockDelay--;
      if (row1UnlockDelay === 0) {
        row1Unlocked = true;
        rowStates[1].phase = 'typing';
        rowStates[1].timer = 0;
      }
    }
  } else {
    updateRow(rowStates[1], 1);
  }

  for (var i = 0; i < chars.length; i++) {
    var ch = chars[i];
    var rs = rowStates[ch.row];
    var x  = padX + ch.col * charW;
    var y  = padY + ch.row * (fontSize * lineH);

    if (ch.isFixed) {
      var rgb = hexRGB(ch.fixedColor);
      fill(rgb.r, rgb.g, rgb.b);
      text(ch.base, x, y);
      continue;
    }

    var slot = rs.chars.indexOf(i);
    if (slot === -1) continue;

    var glyph = rs.display[slot];
    if (glyph === null) continue;

    var col;

    if (rs.slipIndex === slot && rs.slipTimer > 0) {
      glyph = rs.slipChar;
      col   = rs.slipColor;
    } else {
      var rs2 = rowStates[ch.row];
      var fullyTyped = rs2.phase === 'hold' || rs2.phase === 'clearing';
      col = fullyTyped ? (ch.row === 0 ? '#569CD6' : '#CE9178') : '#FFFFFF';
    }

    if (rs.phase === 'typing' && slot === rs.typed - 1) {
      col = '#FFFFFF';
    }

    var c = hexRGB(col);
    fill(c.r, c.g, c.b);
    text(glyph, x, y);
  }

  drawCursors();
}

function updateRow(rs, rowIdx) {
  rs.timer++;

  if (rs.phase === 'typing') {
    if (rs.typed < rs.chars.length) {
      if (rs.timer >= rs.typeInterval) {
        rs.timer = 0;
        var doSlip = random(1) < 0.40 && rs.slipIndex === -1;
        if (doSlip) {
          rs.slipIndex = rs.typed;
          rs.slipChar  = syntaxChars[floor(random(syntaxChars.length))];
          rs.slipColor = syntaxColors[floor(random(syntaxColors.length))];
          rs.slipTimer = rs.slipDuration;
          rs.display[rs.typed] = rs.slipChar;
        } else {
          rs.display[rs.typed] = chars[rs.chars[rs.typed]].base;
          rs.typed++;
        }
      }
    } else {
      rs.phase = 'hold';
      rs.timer = 0;
    }

    if (rs.slipTimer > 0) {
      rs.slipTimer--;
      if (rs.slipTimer === 0) {
        rs.display[rs.slipIndex] = chars[rs.chars[rs.slipIndex]].base;
        rs.typed = rs.slipIndex + 1;
        rs.slipIndex = -1;
      }
    }

  } else if (rs.phase === 'hold') {
    if (rs.timer >= rs.holdDuration) {
      rs.phase = 'clearing';
      rs.timer = 0;
    }

  } else if (rs.phase === 'clearing') {
    var toRemove = rs.typed - 1 - floor(rs.timer / rs.clearInterval);
    if (toRemove < 0) {
      rs.phase = 'cleared';
      rs.timer = 0;
      rs.typed = 0;
      rs.display = rs.display.map(function() { return null; });
    } else {
      for (var k = toRemove + 1; k < rs.display.length; k++) {
        rs.display[k] = null;
      }
    }

  } else if (rs.phase === 'cleared') {
    if (rs.timer >= 40) {
      rs.phase = 'typing';
      rs.timer = 0;
      rs.typed = 0;
    }
  }
}

function drawCursors() {
  if (frameCount % 40 < 20) return;

  var activeRows = [rowStates[0]];
  if (row1Unlocked) activeRows.push(rowStates[1]);

  for (var r = 0; r < activeRows.length; r++) {
    var rs = activeRows[r];
    if (rs.phase !== 'typing') continue;
    if (rs.typed >= rs.chars.length) continue;

    var charIdx = rs.chars[rs.typed];
    var ch = chars[charIdx];
    var x  = padX + ch.col * charW;
    var y  = padY + ch.row * (fontSize * lineH);

    fill(255, 255, 255, 180);
    rect(x, y - fontSize * 0.15, 1, fontSize * 0.2);
  }
}

function mousePressed() {
  rowStates[0].phase = 'cleared';
  rowStates[0].timer = 0;
  rowStates[0].typed = 0;
  rowStates[0].display = rowStates[0].display.map(function() { return null; });
  rowStates[1].phase = 'cleared';
  rowStates[1].timer = 0;
  rowStates[1].typed = 0;
  rowStates[1].display = rowStates[1].display.map(function() { return null; });
  row1Unlocked = false;
  row1UnlockDelay = 0;
}

function hexRGB(hex) {
  return {
    r: parseInt(hex.slice(1,3), 16),
    g: parseInt(hex.slice(3,5), 16),
    b: parseInt(hex.slice(5,7), 16)
  };
}

// CAAD Codes — Animated Logo v4
// Typewriter effect — letters type in one by one, occasional syntax slip, then retype
// ABC Diatype Mono Regular

var fontSize = 160;
var tracking = 1.45;
var lineH    = 0.25;
var padX     = 40;
var padY     = 140;

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
 '#FFFFFF', // white
  '#6A9955', // green
  '#4EC9B0', // teal
  '#C586C0', // magenta
  '#9CDCFE', // sky blue
];

var syntaxChars = ['<', '>', ';', '%', "@", '//', '!', '?', '[', '+', '&'];

var charW;

// Per-row typewriter state
// Each row types its non-fixed chars one by one
var rowStates = [
  {
    // row 0: C A A D  (non-fixed indices 0,1,2,3)
    chars: [0, 1, 2, 3],
    typed: 0,          // how many have been typed so far
    display: [],       // what is currently showing for each slot: null = blank, string = character
    phase: 'typing',   // typing | hold | clearing | cleared
    timer: 0,
    typeInterval: 14,   // frames between each keystroke
    holdDuration: 220, // frames to hold after fully typed
    clearInterval: 6,  // frames between each clear
    slipIndex: -1,     // which slot has a syntax slip (-1 = none)
    slipChar: '',
    slipColor: '',
    slipTimer: 0,
    slipDuration: 18,  // frames a slip is visible before correcting
  },
  {
    // row 1: c o d e s  (non-fixed indices 6,7,8,9,10)
    chars: [6, 7, 8, 9, 10],
    typed: 0,
    display: [],
    phase: 'cleared',  // row 1 starts cleared, begins after row 0 finishes
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

// Row 1 waits for row 0 to finish its first type cycle before starting
var row1Unlocked = false;
var row1UnlockDelay = 0; // counts down after row 0 completes

function setup() {
  var cnv = createCanvas(1100, 320); cnv.parent('caad-logo');
  cnv.style('background', 'transparent');
  textFont('"ABC Diatype Mono Regular", "Courier New", monospace');
  textSize(fontSize);
  charW = textWidth('A') * tracking;

  // Initialise display arrays to blank
  rowStates[0].display = [null, null, null, null];
  rowStates[1].display = [null, null, null, null, null];

  noLoop();
  document.fonts.load(fontSize + 'px "ABC Diatype Mono Regular"').then(function () {
    textFont('"ABC Diatype Mono Regular", "Courier New", monospace');
    charW = textWidth('A') * tracking;
    loop();
  }).catch(function (err) {
    console.warn('[caad-logo] webfont fallback:', err);
    loop();
  });
}

function draw() {
  clear();             // transparent each frame — lets page background show through
  textSize(fontSize);
  noStroke();

  // Update row 0
  updateRow(rowStates[0], 0);

  // Unlock row 1 after row 0 has completed its first full type
  if (!row1Unlocked) {
    if (rowStates[0].phase === 'hold' && row1UnlockDelay === 0) {
      row1UnlockDelay = 30; // small delay after row 0 finishes
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

  // Render
  for (var i = 0; i < chars.length; i++) {
    var ch  = chars[i];
    var rs  = rowStates[ch.row];
    var x   = padX + ch.col * charW;
    var y   = padY + ch.row * (fontSize * lineH);

    if (ch.isFixed) {
      var rgb = hexRGB(ch.fixedColor);
      fill(rgb.r, rgb.g, rgb.b);
      text(ch.base, x, y);
      continue;
    }

    // Find slot index within this row's chars array
    var slot = rs.chars.indexOf(i);
    if (slot === -1) continue;

    var glyph = rs.display[slot];
    if (glyph === null) continue; // not typed yet — blank

    var col;

    // Check for syntax slip on this slot
    if (rs.slipIndex === slot && rs.slipTimer > 0) {
      glyph = rs.slipChar;
      col   = rs.slipColor;
    } else {
      var rs2 = rowStates[ch.row];
      var fullyTyped = rs2.phase === 'hold' || rs2.phase === 'clearing';
      col = fullyTyped ? (ch.row === 0 ? '#569CD6' : '#CE9178') : '#FFFFFF';
    }

    // Cursor blink on the currently-being-typed slot
    if (rs.phase === 'typing' && slot === rs.typed - 1) {
      // Subtle: flash the just-typed character slightly brighter
      col = '#FFFFFF';
    }

    var c = hexRGB(col);
    fill(c.r, c.g, c.b);
    text(glyph, x, y);
  }

  // Draw blinking cursor at next-to-type position
  drawCursors();
}

function updateRow(rs, rowIdx) {
  rs.timer++;

  if (rs.phase === 'typing') {
    if (rs.typed < rs.chars.length) {
      if (rs.timer >= rs.typeInterval) {
        rs.timer = 0;
        // Occasionally introduce a syntax slip before typing the real char
        var doSlip = random(1) < 0.40 && rs.slipIndex === -1;
        if (doSlip) {
          rs.slipIndex = rs.typed;
          rs.slipChar  = syntaxChars[floor(random(syntaxChars.length))];
          rs.slipColor = syntaxColors[floor(random(syntaxColors.length))];
          rs.slipTimer = rs.slipDuration;
          rs.display[rs.typed] = rs.slipChar; // show slip first
          // Don't advance typed yet — wait for slip to clear
        } else {
          rs.display[rs.typed] = chars[rs.chars[rs.typed]].base;
          rs.typed++;
        }
      }
    } else {
      // All typed — move to hold
      rs.phase = 'hold';
      rs.timer = 0;
    }

    // Count down slip timer
    if (rs.slipTimer > 0) {
      rs.slipTimer--;
      if (rs.slipTimer === 0) {
        // Slip resolved — type the real char
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
    // Clear from right to left
    var toRemove = rs.typed - 1 - floor((rs.timer) / rs.clearInterval);
    if (toRemove < 0) {
      // All cleared
      rs.phase = 'cleared';
      rs.timer = 0;
      rs.typed = 0;
      rs.display = rs.display.map(function() { return null; });
    } else {
      // Blank out everything from toRemove+1 onward
      for (var k = toRemove + 1; k < rs.display.length; k++) {
        rs.display[k] = null;
      }
    }

  } else if (rs.phase === 'cleared') {
    // Small pause before retyping
    if (rs.timer >= 40) {
      rs.phase = 'typing';
      rs.timer = 0;
      rs.typed = 0;
    }
  }
}

function drawCursors() {
  // Draw a blinking | cursor at the next-to-type position for each active row
  if (frameCount % 40 < 20) return; // blink off half the time

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
  // Reset both rows
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
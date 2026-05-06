let columns = 12;
let rows = 12;
let margin = 40;
let box;

let orderLevel = [];

let light = "#f0f2e4";
let dark = "#34292a";

let Quads = [
  // row 1
  40,40,92,40,87,82,48,95,
  109,55,140,45,140,73,111,86,
  158,33,212,42,207,77,158,92,
  285,28,341,30,338,80,276,86,
  414,29,456,40,462,79,409,86,
  477,37,525,37,526,90,466,78,
  527,40,588,40,593,86,533,91,
  601,33,645,31,642,74,595,86,
  659,34,705,35,712,87,660,87,
  715,39,760,37,772,83,718,79,

  // row 2
  34,100,98,96,85,141,35,144,
  101,104,154,94,152,149,102,143,
  164,98,213,101,208,139,156,148,
  222,101,275,97,281,147,234,150,
  287,96,334,101,334,155,289,153,
  352,102,392,91,402,155,348,153,
  405,99,454,94,468,151,403,150,
  464,90,524,91,519,146,474,143,
  539,95,586,97,582,153,538,150,
  660,93,704,89,698,147,663,152,
  722,95,759,93,772,138,715,143,

  // row 3
  41,156,94,159,95,204,31,215,
  102,156,147,162,146,208,100,214,
  166,165,215,155,216,210,160,206,
  226,166,275,151,274,216,228,208,
  280,159,330,165,341,206,288,212,
  353,177,383,180,373,205,352,202,
  474,170,509,180,509,199,481,197,
  528,151,582,162,588,215,539,211,
  591,165,644,162,654,199,601,215,
  653,155,704,162,699,216,658,205,
  709,154,759,157,759,206,724,209,

  // row 4
  51,242,72,245,68,272,45,270,
  104,220,156,220,146,270,101,279,
  171,244,192,241,197,271,173,262,
  231,218,278,218,278,267,228,277,
  291,222,345,219,335,271,280,265,
  355,213,397,216,403,278,344,278,
  414,217,463,226,454,270,414,267,
  474,221,516,214,526,272,470,264,
  536,233,563,237,560,262,546,264,
  590,218,648,218,643,264,600,266,
  656,226,708,215,700,275,660,275,
  714,218,771,221,767,277,714,265,

  // row 5
  42,291,92,289,92,342,40,332,
  95,280,154,295,157,339,95,336,
  171,296,201,306,190,323,166,329,
  229,292,271,287,271,336,224,332,
  287,287,337,281,340,335,293,338,
  354,289,394,281,405,338,343,336,
  418,281,455,282,459,335,416,339,
  477,278,520,288,525,333,467,332,
  537,293,583,277,586,326,529,340,
  610,302,629,304,631,320,611,324,
  661,287,707,279,704,330,652,337,
  714,293,770,281,773,336,719,330,

  // row 6
  34,356,92,355,92,391,41,397,
  100,345,148,348,150,393,96,396,
  162,341,213,345,218,403,161,401,
  225,341,270,352,277,401,223,402,
  280,348,343,343,343,389,296,394,
  346,348,399,347,396,391,352,404,
  419,352,470,347,456,391,408,394,
  479,345,522,345,524,405,475,395,
  543,362,571,362,573,391,547,389,
  590,351,641,344,644,388,598,403,
  655,341,710,344,699,390,655,392,
  716,342,770,353,767,389,711,403,

  // row 7
  44,427,69,427,70,457,48,449,
  102,413,155,404,153,464,102,461,
  168,409,213,414,204,470,162,461,
  219,408,284,414,273,454,236,464,
  293,425,325,423,326,446,298,448,
  341,406,401,417,402,455,356,467,
  479,413,518,410,521,456,478,454,
  538,416,583,401,592,459,528,459,
  610,425,630,427,633,450,612,456,

  // row 8
  37,481,89,468,88,522,50,527,
  102,478,157,465,146,516,98,525,
  165,468,217,465,220,523,162,530,
  219,466,283,475,283,517,231,527,
  292,473,340,479,343,520,284,521,
  350,479,398,467,410,516,354,524,
  417,464,460,467,456,518,416,516,
  467,468,530,478,524,518,482,515,
  550,486,572,487,570,514,543,505,
  600,484,625,486,635,507,604,513,
  657,468,704,474,712,518,655,517,

  // row 9
  40,539,89,534,95,589,42,583,
  106,538,159,532,149,591,106,585,
  164,534,220,537,210,589,171,588,
  226,538,268,529,286,587,232,581,
  293,555,329,551,320,573,302,577,
  357,536,400,535,408,581,346,587,
  407,532,471,538,455,583,419,577,
  539,537,587,528,585,579,543,576,
  606,549,623,545,628,578,611,578,
  722,541,760,530,773,573,726,590,

  // row 10
  47,594,95,600,95,653,52,644,
  98,605,149,597,158,637,99,650,
  170,616,202,620,195,632,169,643,
  224,606,281,591,277,647,219,654,
  285,595,347,602,331,648,286,649,
  353,619,379,611,392,644,365,642,
  406,602,466,604,459,649,421,645,
  479,604,519,589,531,642,468,639,
  549,607,567,619,573,638,543,637,
  600,598,646,602,651,642,596,649,
  663,602,713,591,699,646,652,635,
  722,603,764,593,762,651,726,648,

  // row 11
  40,659,96,659,86,711,41,703,
  103,663,160,661,151,711,103,716,
  166,657,211,661,210,707,162,708,
  224,661,269,653,282,715,222,717,
  288,655,338,660,344,710,284,713,
  347,651,406,659,409,711,346,712,
  416,653,463,655,455,708,417,711,
  475,659,521,663,530,703,475,704,
  538,655,580,655,584,698,537,706,
  601,655,653,664,653,704,590,712,
  663,653,703,652,711,702,662,712,
  727,670,747,670,748,696,728,700,

  // row 12
  39,726,89,715,94,775,44,772,
  101,720,149,729,163,764,112,777,
  232,725,274,721,276,763,220,774,
  285,728,339,716,336,769,286,767,
  415,733,448,732,450,762,428,760,
  473,722,521,724,530,763,477,765,
  536,723,591,721,577,769,539,766,
  594,717,653,711,645,767,602,768,
  656,724,712,711,701,762,655,771,
  725,738,746,735,746,755,722,765
];

let lightShape = [];
let lightShapePoints = [];

function setup() {
  createCanvas(800, 800);
  noStroke();

  box = (width - 2 * margin) / columns;

  for (let r = 0; r < rows; r++) {
    orderLevel[r] = [];
    for (let c = 0; c < columns; c++) {
      orderLevel[r][c] = 0;
    }
  }

  let total = Quads.length / 8;

  for (let i = 0; i < total; i++) {
    lightShape[i] = random(1) < 0.5;

    let w = box * random(0.25, 0.5);
    let h = box * random(0.25, 0.5);
    let movement = box * 0.1;
    let quadStart = i * 8;

    lightShapePoints[quadStart + 0] = -w / 2 + random(-movement, movement);
    lightShapePoints[quadStart + 1] = -h / 2 + random(-movement, movement);

    lightShapePoints[quadStart + 2] = w / 2 + random(-movement, movement);
    lightShapePoints[quadStart + 3] = -h / 2 + random(-movement, movement);

    lightShapePoints[quadStart + 4] = w / 2 + random(-movement, movement);
    lightShapePoints[quadStart + 5] = h / 2 + random(-movement, movement);

    lightShapePoints[quadStart + 6] = -w / 2 + random(-movement, movement);
    lightShapePoints[quadStart + 7] = h / 2 + random(-movement, movement);
  }
}

function draw() {
  background(light);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      orderLevel[r][c] *= 0.99;
    }
  }

  let total = Quads.length / 8;

  for (let i = 0; i < total; i++) {
    drawTile(i);
  }

  applyOrder();
}

function applyOrder() {
  let c = int((mouseX - margin) / box);
  let r = int((mouseY - margin) / box);

  for (let rr = r - 1; rr <= r + 1; rr++) {
    for (let cc = c - 1; cc <= c + 1; cc++) {
      if (rr < 0 || rr >= rows || cc < 0 || cc >= columns) continue;
      orderLevel[rr][cc] = 1;
    }
  }
}

function drawTile(i) {
  let quadStart = i * 8;

  let x1 = Quads[quadStart];
  let y1 = Quads[quadStart + 1];
  let x2 = Quads[quadStart + 2];
  let y2 = Quads[quadStart + 3];
  let x3 = Quads[quadStart + 4];
  let y3 = Quads[quadStart + 5];
  let x4 = Quads[quadStart + 6];
  let y4 = Quads[quadStart + 7];

  let centerX = (min(min(x1, x2), min(x3, x4)) + max(max(x1, x2), max(x3, x4))) / 2;
  let centerY = (min(min(y1, y2), min(y3, y4)) + max(max(y1, y2), max(y3, y4))) / 2;

  let c = constrain(round((centerX - margin - box / 2) / box), 0, columns - 1);
  let r = constrain(round((centerY - margin - box / 2) / box), 0, rows - 1);

  let orderAmount = orderLevel[r][c];

  let cellCenterX = margin + c * box + box / 2;
  let cellCenterY = margin + r * box + box / 2;

  let big = box * 0.8;
  let half = big / 2;

  let sx1 = cellCenterX - half;
  let sy1 = cellCenterY - half;

  let sx2 = cellCenterX + half;
  let sy2 = cellCenterY - half;

  let sx3 = cellCenterX + half;
  let sy3 = cellCenterY + half;

  let sx4 = cellCenterX - half;
  let sy4 = cellCenterY + half;

  fill(dark);
  quad(
    lerp(x1, sx1, orderAmount), lerp(y1, sy1, orderAmount),
    lerp(x2, sx2, orderAmount), lerp(y2, sy2, orderAmount),
    lerp(x3, sx3, orderAmount), lerp(y3, sy3, orderAmount),
    lerp(x4, sx4, orderAmount), lerp(y4, sy4, orderAmount)
  );

  if (lightShape[i]) {
   let move = (1 - orderAmount) * 18;

let xShift = sin(radians(frameCount * 6 + i * 10)) * move;
let yShift = cos(radians(frameCount * 6 + i * 10)) * move;

    let lightShapeStart = i * 8;

    fill(light);
    quad(
      cellCenterX + lightShapePoints[lightShapeStart + 0] + xShift,
      cellCenterY + lightShapePoints[lightShapeStart + 1] + yShift,

      cellCenterX + lightShapePoints[lightShapeStart + 2] + xShift,
      cellCenterY + lightShapePoints[lightShapeStart + 3] + yShift,

      cellCenterX + lightShapePoints[lightShapeStart + 4] + xShift,
      cellCenterY + lightShapePoints[lightShapeStart + 5] + yShift,

      cellCenterX + lightShapePoints[lightShapeStart + 6] + xShift,
      cellCenterY + lightShapePoints[lightShapeStart + 7] + yShift
    );
  }
}
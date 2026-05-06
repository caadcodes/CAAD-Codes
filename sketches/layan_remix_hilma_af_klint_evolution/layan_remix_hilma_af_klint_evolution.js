let blu, ylw;
let t = 0;

let angle1 = -73;
let angle2 = -130;
let angle3 = 70;
let angle4 = 140;
let angle0 = 0;

let pc1 = 726;
let pc2 = 214;
let pc3 = 117;
let pc4 = 719;

let pc5 = 718;
let pc6 = 727;
let pc7 = 119;
let pc8 = 198;

function setup() {
  createCanvas(floor(2480 / 3), floor(1897 / 3)); // ~826 x 632
  background(60);
  rectMode(CENTER);

  blu = color(95 - 50, 160 - 50, 220 - 50, 120);
  ylw = color(214 - 50, 194 - 50, 78 - 50, 120);
}

function draw() {
  background(20);

  // Gradient background
  for (let x = 0; x < width; x++) {
    let inter = map(x, 0, width, 0, 1);
    let c = lerpColor(ylw, blu, inter);
    stroke(c);
    line(x, 0, x, height);
  }

  if (mouseIsPressed) {
    background(lerpColor(ylw, blu, mouseX * 0.001));
    stroke(20);
    strokeWeight(1.4);

    fill(95, 160, 220, 150);
    ellipse(width / 10 * 5.6, 445, 220, 363);

    push();
    fill(214, 194, 78, 150);
    translate(width / 10 * 5.6, 270);
    rotate(radians(angle0));
    ellipse(0, -110, 220, 265);
    pop();

    push();
    noStroke();
    fill(250, 187, 209);
    translate(width / 10 * 5.6, height / 10 * 1.9);
    rotate(radians(45));
    rect(0, 0, 87, 87);
    pop();

    angle0 = lerp(angle0, 180, 0.018);
    angle1 = lerp(angle1, -180, 0.008);
    angle2 = lerp(angle2, -180, 0.018);
    angle3 = lerp(angle3, 180, 0.008);
    angle4 = lerp(angle4, 195, 0.018);

    push();
    fill(214, 194, 78, 90);
    translate(width / 10 * 5.6, height / 10 * 4.2);
    rotate(radians(angle1));
    ellipse(20, -240, 240, 480);
    pop();

    push();
    fill(214, 194, 78, 90);
    translate(width / 10 * 5.6, height / 10 * 4.2);
    rotate(radians(angle2));
    ellipse(35, -235, 280, 480);
    pop();

    push();
    fill(95, 160, 220, 90);
    translate(width / 10 * 5.6, height / 10 * 4.2);
    rotate(radians(angle3));
    ellipse(-13, -190, 220, 380);
    pop();

    push();
    fill(95, 160, 220, 90);
    translate(width / 10 * 5.6, height / 10 * 4.2);
    rotate(radians(angle4));
    ellipse(-50, -200, 300, 420);
    pop();

    noStroke();
    fill(255);
    circle(width / 10 * 5.3, 75, 50 - sin(t) * 20 + mouseX / 50);
    circle(width / 10 * 5.9, 75, 50 - sin(t) * 20 + mouseX / 50);
    circle(width / 10 * 5.6, height / 10 * 4.95, 82); // white

    fill(250, 187, 209); // pink
    ellipse(width / 10 * 5.6, 29, 50 - sin(t) * 20 + mouseX / 20, 53 - sin(t) * 20 + mouseX / 20);
    fill(95, 160, 220);
    circle(width / 10 * 5.9, height / 10 * 3.85, 65); // blue

    fill(214, 194, 78);
    circle(width / 10 * 5.3, height / 10 * 3.85, 65); // yellow

    push(); // curved lines
    stroke(255);
    strokeWeight(3);
    noFill();
    bezier(pc3, 166, 250, 200 + sin(t) * 100, 350, 200 + cos(t) * 100, 460, 266); // top left
    bezier(460, 266, 650, 200 + cos(t) * 80, 650, 200 + sin(t) * 80, pc1, 164);   // top right
    bezier(pc2, 462, 250, 300 + sin(t) * 100, 350, 300 + cos(t) * 100, 460, 266); // bottom left
    bezier(460, 266, 630, 300 + cos(t) * 100, 650, 300 + sin(t) * 100, pc4, 463);
    t += 0.015;
    pop();

    stroke(1);
    fill(255);
    circle(width / 10 * 5.6, height / 10 * 4.2, 20 + cos(t) * 20 + 30); // center

    fill(0);
    rect(width / 10 * 5.6, 205, 7, 297);
    rect(width / 10 * 5.6, height / 10 * 1.9, 120, 5);

    fill(150);
    rect(width / 10 * 5.6, height / 10 * 4.2, 4, 175);

    pc1 = lerp(pc1, 530, 0.008);
    pc2 = lerp(pc2, 530, 0.008);
    pc3 = lerp(pc3, 370, 0.008);
    pc4 = lerp(pc4, 370, 0.008);
    pc5 = lerp(pc5, 530, 0.008);
    pc6 = lerp(pc6, 530, 0.008);
    pc7 = lerp(pc7, 370, 0.008);
    pc8 = lerp(pc8, 370, 0.008);

    push(); // pink circles with yellow and blue stroke
    strokeWeight(4);
    fill(255, 200, 230, 230);
    stroke(blu);
    circle(pc1, 176 + cos(t) * 6, 44 + sin(t) * 80 + mouseX / 10);  // blu
    circle(pc2, 484 + cos(t) * 6, 44 + sin(t) * 90 + mouseX / 10);  // blu
    circle(pc3, 182 + cos(t) * 6, 44 + sin(t) * 80 + mouseX / 10);  // blu
    circle(pc4, 484 + cos(t) * 6, 44 + sin(t) * 90 + mouseX / 10);  // blu

    stroke(ylw);
    circle(pc5, 140 + cos(t) * 4, 44 - cos(t) / 3 * 220 - mouseX / 10); // ylw
    circle(pc6, 442 + cos(t) * 4, 44 - cos(t) / 3 * 200 - mouseX / 10); // ylw
    circle(pc7, 145 + cos(t) * 4, 44 - cos(t) / 3 * 220 - mouseX / 10); // ylw
    circle(pc8, 449 + cos(t) * 4, 44 - cos(t) / 3 * 200 - mouseX / 10); // ylw
    pop();

    push(); // white stroke for pink circles
    let st = 4;
    strokeWeight(2.5);
    noFill();
    stroke(255);
    circle(pc1, 176 + cos(t) * 6, 44 + st + sin(t) * 80 + mouseX / 10); // blu
    circle(pc2, 484 + cos(t) * 6, 44 + sin(t) * 90 + mouseX / 10);       // blu
    circle(pc3, 182 + cos(t) * 6, 44 + sin(t) * 80 + mouseX / 10);       // blu
    circle(pc4, 484 + cos(t) * 6, 44 + sin(t) * 90 + mouseX / 10);       // blu

    circle(pc5, 140 + cos(t) * 4, 44 + st - cos(t) / 3 * 220 - mouseX / 10); // ylw
    circle(pc6, 442 + cos(t) * 4, 44 + st - cos(t) / 3 * 200 - mouseX / 10); // ylw
    circle(pc7, 145 + cos(t) * 4, 44 + st - cos(t) / 3 * 220 - mouseX / 10); // ylw
    circle(pc8, 449 + cos(t) * 4, 44 + st - cos(t) / 3 * 200 - mouseX / 10); // ylw
    pop();

  } else {

    stroke(20);
    strokeWeight(1.4);
    fill(95, 160, 220, 150);
    ellipse(width / 10 * 5.6, 445, 220, 363);

    fill(214, 194, 78, 150);
    ellipse(width / 10 * 5.6, 133, 220, 265);

    push();
    noStroke();
    fill(250, 187, 209);
    translate(width / 10 * 5.6, height / 10 * 1.9);
    rotate(radians(45));
    rect(0, 0, 87, 87);
    pop();

    push();
    fill(214, 194, 78, 90);
    translate(width / 10 * 5.6, height / 10 * 4.2);
    rotate(radians(-73 - sin(t) * 6));
    ellipse(20, -240, 240, 480);
    pop();

    push();
    fill(214, 194, 78, 90);
    translate(width / 10 * 5.6, height / 10 * 4.2);
    rotate(radians(-130 - sin(t) * 6));
    ellipse(35, -235, 280, 480);
    pop();

    push();
    fill(95, 160, 220, 90);
    translate(width / 10 * 5.6, height / 10 * 4.2);
    rotate(radians(70 + sin(t) * 6));
    ellipse(-13, -190, 220, 380);
    pop();

    push();
    fill(95, 160, 220, 90);
    translate(width / 10 * 5.6, height / 10 * 4.2);
    rotate(radians(140 + sin(t) * 6));
    ellipse(-50, -200, 300, 420);
    pop();

    noStroke();
    fill(255);
    circle(width / 10 * 5.3, 75, 50);
    circle(width / 10 * 5.9, 75, 50);
    circle(width / 10 * 5.6, height / 10 * 4.95, 82); // white

    fill(250, 187, 209); // pink
    ellipse(width / 10 * 5.6, 29, 50, 53);
    fill(95, 160, 220);
    circle(width / 10 * 5.9, height / 10 * 3.85, 65); // blue

    fill(214, 194, 78);
    circle(width / 10 * 5.3, height / 10 * 3.85, 65); // yellow

    push(); // curved lines
    stroke(255);
    strokeWeight(3);
    noFill();
    bezier(134, 166, 250, 200 + sin(t) * 100, 350, 200 + cos(t) * 100, 460, 266); // top left
    bezier(460, 266, 650, 200 + cos(t) * 80, 650, 200 + sin(t) * 80, 707, 164);   // top right
    bezier(218, 462, 250, 300 + sin(t) * 100, 350, 300 + cos(t) * 100, 460, 266); // bottom left
    bezier(460, 266, 630, 300 + cos(t) * 100, 650, 300 + sin(t) * 100, 712, 463);
    t += 0.015;
    pop();

    stroke(1);
    fill(255);
    circle(width / 10 * 5.6, height / 10 * 4.2, 20); // center

    fill(0);
    rect(width / 10 * 5.6, 205, 7, 297);
    rect(width / 10 * 5.6, height / 10 * 1.9, 120, 5);

    fill(150);
    rect(width / 10 * 5.6, height / 10 * 4.2, 4, 175);

    push(); // pink circles with yellow and blue stroke
    strokeWeight(4);
    fill(255, 200, 230, 200);
    stroke(blu);
    circle(726, 176 + cos(t) * 6, 44); // blu
    circle(214, 484 + cos(t) * 6, 44); // blu
    circle(117, 182 + cos(t) * 6, 44); // blu
    circle(719, 484 + cos(t) * 6, 44); // blu

    stroke(ylw);
    circle(718, 140 + cos(t) * 4, 44); // ylw
    circle(727, 442 + cos(t) * 4, 44); // ylw
    circle(119, 145 + cos(t) * 4, 44); // ylw
    circle(198, 449 + cos(t) * 4, 44); // ylw
    pop();

    push(); // white stroke for pink circles
    let st = 4;
    strokeWeight(2.5);
    noFill();
    stroke(255);
    circle(726, 176 + cos(t) * 6, 44 + st); // blu
    circle(214, 484 + cos(t) * 6, 44 + st); // blu
    circle(117, 182 + cos(t) * 6, 44 + st); // blu
    circle(719, 484 + cos(t) * 6, 44 + st); // blu

    circle(718, 140 + cos(t) * 4, 44 + st); // ylw
    circle(727, 442 + cos(t) * 4, 44 + st); // ylw
    circle(119, 145 + cos(t) * 4, 44 + st); // ylw
    circle(198, 449 + cos(t) * 4, 44 + st); // ylw
    pop();
  }

  console.log(mouseX, mouseY);
}
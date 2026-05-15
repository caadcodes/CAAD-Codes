import geomerative.*;
import processing.sound.*;

SoundFile song;

RShape letter;
RPoint[] points;
RPoint[] ogPoints;

float angle;
float s;

void setup() {

  size(1000, 1000, P3D);

  song = new SoundFile(this, "eletricity.mp3");
  //song.loop();

  RG.init(this);
  RG.setPolygonizerLength(3);

  letter = RG.getText("W", "DG Modal3at Med.ttf", 800, CENTER);
  points = letter.getPoints();

  ogPoints = new RPoint[points.length];

  for (int i = 0; i < points.length; i++) {
    ogPoints[i] = new RPoint(points[i].x, points[i].y);
  }

  rectMode(CENTER);
}

void draw() {
  println(mouseX);

  background(0);
  translate(width/2-40, height/2+270);

  if (mouseX > 200 && mouseX < 800 && mouseY > 200 && mouseY < 800) {
    
    fill(0);
    stroke(255, 255, 0);

    angle = 179.64;
    s = int(random(50, 70));

    for (int i = 0; i < points.length; i++) {
      points[i].x = ogPoints[i].x;
      points[i].y = ogPoints[i].y;
    }

    push();
    fill(255);
    noStroke();
    beginShape();
    for (int i = 0; i < points.length; i++) {
      vertex(points[i].x, points[i].y);
    }
    endShape();
    pop();

    
  } else {
    song.loop();
    
    fill(0, 200, 255);
    stroke(0);
    angle = 2;
    s = 50;
  }

  for (int i = 0; i < points.length; i++) {
    float wave = sin(radians(frameCount * 5 + i * angle))*3;
    points[i].x = ogPoints[i].x + wave;
    points[i].y = ogPoints[i].y + wave;
  }

  for (int i = 0; i < points.length; i++) {
    push();
    float wave = sin(radians(frameCount * 5 * angle))*3;
    translate(points[i].x, points[i].y);
    rect(0, 0, s, s);
    rotateZ(radians(wave));
    pop();
  }
}

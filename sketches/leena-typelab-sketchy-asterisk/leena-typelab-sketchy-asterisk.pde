import geomerative.*;

import processing.sound.*; //import library

AudioIn mic; //variable for class Audio input
Amplitude amp; //variable for class amplitude that measures volume level

float vol;  // stores the current volume (0.0 to 1.0)
float smooth = 0; //start at 0, will update later

RPoint[] points; 
float t = 0;

void setup() {
  size(1000, 1000);
  
  RG.init(this); //initialize library
  
  RG.setPolygonizer(RG.UNIFORMLENGTH);
  RG.setPolygonizerLength(5); // density of points along outline
  
  points = RG.getText("*", "Arial Black.ttf", 1200, CENTER).getPoints();
  
   mic = new AudioIn(this, 0);  // 0 = default first mic (change if you have multiple inputs)
  mic.start();
  
  // Create amplitude analyzer and connect it to the mic
  amp = new Amplitude(this);
  amp.input(mic); //mic and amp connection
}

void draw() {
  background(0);
  noStroke();
  //stroke(255);
  //strokeWeight(2);
  //fill(255,90);
  fill(255, 90);
  translate(width/2.5, height+150);
  t += 0.05;
  
  vol = amp.analyze();
  
  // Map volume to visual response
  float diameter = map(vol, 0, 0.5, 50, 800);
  smooth = lerp(smooth, vol, 0.05);
  
  for (int i = 0; i < points.length; i++) {
  //float fall = (frameCount * 1.5) % 1000; //melting effect
  //float n = noise(points[i].x * 0.01, points[i].y * 0.01, frameCount * 0.02);
  //float offsetX = map(n, 0, 1, -50, 50); //rectangles shifting
  //float offsetY = map(n, 0, 1, -50, 50);
  float wave = sin(diameter) * sin(points[i].x * 0.05 * t) * 20;
  rect(points[i].x, points[i].y + wave, 25, 25);
  
 
    
    //rect(points[i].x, points[i].y, offsetX, fall + offsetY); 
  }
}

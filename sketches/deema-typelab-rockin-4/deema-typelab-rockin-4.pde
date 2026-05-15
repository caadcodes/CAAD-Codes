//color c = color(74, 111, 165);
//hotline bling
//ms magic
//so my darling
color[] blue = {
  color(127, 166, 214),   
  color(74, 111, 165), 
  color(31, 58, 95),  
};

color[] red = {
  color(225, 6, 0),  
  color(180, 0, 0), 
};

color[] yellow = {
  color(79, 127, 90),  
  color(242, 201, 76), 
  color(242, 153, 74),  
  //color(107, 142, 55), 

};

import processing.sound.*;
                                        // ----Audio----
  AudioIn mic; // variable for class input
  //Amplitude amp; // variable for class amplitude that measures vol level
  FFT fft; //variable for FFT
  int bands = 128;  // number of frequency bands. Typically 128 or 256
  float[] spectrum = new float[bands]; // deep bass is spectrum[0], while high treble would be [127]
                                       // ----Geom----
import geomerative.*;
//RShape letter;
RPoint[] points;


void setup() {
  size(1000, 1000, P3D);
  //frameRate(30);
                                        // ----Audio----

  mic = new AudioIn(this, 0);  // 0 = default mic, change if you have multi mics
  mic.start();

  fft = new FFT(this, bands);  //initialize FFT
  fft.input(mic); //connect FFT to your mic, just like we did with amp

                                        // ----Geom----
  RG.init(this);
  
  RG.setPolygonizer(RG.UNIFORMLENGTH);
  RG.setPolygonizerLength(2); // smaller = smoother shape

  
points = RG.getText("4", "Arial Black.ttf", 600, CENTER).getPoints();


  //points = letter.getPoints();

}

// --------------------------------BASS--------------------------------

void draw() {
  background(0);

  // ---- analyze sound ----
    fft.analyze(spectrum);
  pushMatrix();
    // ---- calculate bass (low frequencies) ----
    float bass = 0;
    for (int i = 0; i < 10; i++) {
      bass += spectrum[i];
    }
    bass *= 10; // amplify
  
    // ---- move to center ----
    translate(width/2, height/2 + 200);
  
    //stroke(palette[int(random(palette.length))]);
    //stroke(c);
    stroke(blue[int(random(blue.length))]);
    //float W = map(-1, 0, 1,2,3)*bass;
    float W = map(bass, 0, 5, 1, 3);
    strokeWeight(W);
    fill(0);
  
    // ---- draw connected animated shape ----
  beginShape();
  
    for (int i = 0; i < points.length; i++) {
      
      float x = points[i].x;
      float y = points[i].y;
  
      // ---- 3D depth movement ----
  float t = tan(frameCount * 0.02 + i * 0.1);
  t = constrain(t, -3, 3); // clamp the explosion
  
  float z = t * bass * 20;
  
      vertex(x, y, z);    
    }
  
  endShape(CLOSE);
  popMatrix();


 // --------------------------------TREB--------------------------------


pushMatrix();
  translate(width/2, height/2 + 200);
  
    float treb = spectrum[50] * 5000;
  
  for (int i = 0; i < points.length; i++) {
  
    float x = points[i].x;
    float y = points[i].y;
  
    // direction from center
    PVector dir = new PVector(x, y);
    dir.normalize();
  
    // base length + bass reaction
    //float length = bass ;
  
    // endpoint reacts to bass
    float x2 = x + dir.x * treb;
    float y2 = y + dir.y * treb;
  
    //stroke(200, 30, 100);
    stroke(red[int(random(red.length))]);
    strokeWeight(random(0.9, 2)*treb);
    noFill();
    
    line(x, y, x2, y2);
  }
  popMatrix();



 // --------------------------------MIDS--------------------------------
pushMatrix();

    // ---- analyze sound ----
    fft.analyze(spectrum);
  
    // ---- calculate bass (low frequencies) ----
    float mids = 0;
    for (int i = 0; i < 10; i++) {
      mids += spectrum[i];
    }
  
    mids *= 200; // amplify
  
    // ---- move to center ----
    translate(width/2, height/2 + 150);
  
    // ---- draw connected animated shape ----
    beginShape();
  
    for (int i = 0; i < points.length; i++) {
  
      float x = points[i].x;
      float y = points[i].y;
  
      float t = tan(frameCount * 0.05 + i * 0.01);
  t = constrain(t, -2, 2); // keep sharpness but controlled
  
  float offsetX = t * mids * 0.5;
  float offsetY = t * mids * 0.5;
  
  float alpha = map(abs(t), 0, 2, 100, 255);
  stroke(255, 220, 0, alpha); // yellow with opacity
      
  float tz = tan(frameCount * 0.03 + i * 0.01);
  tz = constrain(tz, -2, 2);
  
  float z = tz * mids * 2;
  
      vertex(x + offsetX, y + offsetY, z);
    }
  
    endShape(CLOSE);
  popMatrix();

}

var ro 
var re 

function setup () {
  createCanvas (1024, 1024);
  ro = (PI*0.0333);
  re = (PI*0.000556);
}
function draw () {
  background (255);
  translate (512, 512);
  
  strokeWeight(20);
  ellipse(0, 0, 600, 600);
  push();
  strokeWeight(5);
  rotate(ro);
  line(0, -256, 0, 0);
  ro = ro + (PI*0.0333);
  pop();
  
  push();
  strokeWeight(10);
  rotate(re);
  line (0, -192, 0, 0);
  re = re + (PI*0.000556);
  pop();
  
  frameRate (1);
}
function setup()

{
    createCanvas (1000,1000);
    background (255);
    
}

function draw()
{

ellipseMode(RADIUS);  
fill(255);  
ellipse(500, 500, 120, 120);  

ellipseMode(CENTER);  
fill(79, 71, 137,50);  
ellipse(500, 500, mouseX, mouseY);  
  
  
  
  
}
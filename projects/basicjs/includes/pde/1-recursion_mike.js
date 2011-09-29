// All Examples Written by Casey Reas and Ben Fry
// unless otherwise stated.
//

void setup() 
{
  size(window.innerWidth, window.innerHeight);
  noStroke();
  smooth();
  noLoop();
}

void draw() 
{

	int r = random(55) + 200;
	int g = random(55) + 200;
	int b = random(55) + 200;
	background(r,g,b);

  drawCircle(626, 470, 8);
  

}



void drawCircle(int x, int radius, int level) 
{                    
  float tt = 126 * level/3.0;
  fill(tt);
  rect(x, 200, radius*5, radius*5);  
  rect(x, 400, radius*5, radius*5); 
  if(level > 1) {
    level = level - 1;
    drawCircle(x - radius/5, radius/5, level);
    
    }
    

    
    
    
}
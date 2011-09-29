// Adapted from Processing Examples

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
	
	int startX = width / 2;
	int startY = height / 2;
	int startRad = height;
	drawCircle(startX, startY, startRad, 10);
}

void drawCircle(int x, int y, int radius, int level) 
{                    
  	
	float a = 200;
	int r = random(255);
	int g = random(255);
	int b = random(255);

	fill(r,g,b,a);
	triangle(x, y, x+radius/2, y+radius/2, x-radius/2, y+radius/2);
	
	if(level > 1) {
		level = level - 1;
		drawCircle(x - radius/2, y*.99, radius/2, level);
		drawCircle(x + radius/2, y*.99, radius/2, level);
	}
}
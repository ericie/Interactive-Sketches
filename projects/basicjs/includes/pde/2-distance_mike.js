// All Examples Written by Casey Reas and Ben Fry
// unless otherwise stated.

float max_distance;

void setup() {
	 size(window.innerWidth, window.innerHeight); 
	smooth();
	noStroke();
	max_distance = dist(10, 0, width, height);
}

void draw() 
{
	background(216);
	
	triangle(mouseX, mouseY, mouseX+50, mouseY+100,mouseX+100, mouseY);
	
/*
	for(int i = 0; i <= width; i += 20) {
		for(int j = 0; j <= width; j += 20) {
			float size = dist(mouseX, mouseY, i, j);
			size = size/max_distance * 10;
			//rect(i, j, size, size);
			//int x1 = 4;
			//int y1 = 4;
			//int x2 = 10;
			//int y2 = 4;
			//int x3 = 10;
			//int y3 = 10;
			//triangle(x1,y1,x2,y2,x3,y3);
	//triangle(10, 75, 52, 20, 86, 32);
	//triangle(i,j,i+5,j,i+5,j+10);
	
	
	}
	
		}
		*/
	
}

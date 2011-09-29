

// Adapted sketch following original ProcessingJS demo

MyLine ml1;
MyLine ml2;
MyLine ml3;
int cellWidth, maxLength, minLength;

void setup() 
{
	size(window.innerWidth, window.innerHeight);
	smooth();
	cellWidth = 20;
	maxLength = height*.75;
	minLength = 0-maxLength * 2;
	strokeWeight(1);  
	
	int y1 = 0;
	int y2 = height * 0.25;
	int y3 = height * 0.5;
	int y4 = height * 0.75;
	int y5 = height;
	
	ml1 = new MyLine(0, y1, 50, 1);
	ml2 = new MyLine(0, y2, 50, 1);
	ml3 = new MyLine(0, y3, 50, 2);
	ml4 = new MyLine(0, y4, 50, 3);
	ml5 = new MyLine(0, y5, 50, 3);
	stroke(255, 255, 255, 100);
	
}

void draw() 
{
  background(20);
  
  for (int cell = 0; cell <= width; cell += cellWidth){
	ml1.lineUpdate(mouseX, mouseY, cell);
  	ml1.lineDisplay(cell);
  	
	//ml2.lineUpdate(mouseX, mouseY, cell);
  	//ml2.lineDisplay(cell);
  	
	ml3.lineUpdate(mouseX, mouseY, cell);
  	ml3.lineDisplay(cell);
  	
	//ml4.lineUpdate(mouseX, mouseY, cell);
  	//ml4.lineDisplay(cell);
  	
	ml5.lineUpdate(mouseX, mouseY, cell);
  	ml5.lineDisplay(cell);
  }
  
}


class MyLine {
	int lx, ly;
	int length;
	float angle = 0.0;
	int direction;
	
	MyLine(inx x, int y, int l, int d){
		lx = x;
		ly = y;
		length = l;
		direction = d;
	}
	
	void lineUpdate(int mx, int my, int cellX) {
		int distX = mx - (lx + cellX);
	    angle = atan2(my-ly, distX) - HALF_PI;
	    if (direction == 3){
	    	angle = atan2(my-ly, distX) + HALF_PI;
	    }
	}
	
	void lineDisplay(int i) {
	

		int myX = lx + i;
		float distance = dist(mouseX, mouseY, myX, ly);
		length = maxLength - distance;
		
		if (length < minLength){
			length = minLength;
		}
			
			
	    pushMatrix();
	    //float myAngle = atan2(ly,lx) * 180/PI;
	   	translate(myX, ly);
	   	rotate(angle);
	   	if (direction == 1){
	    	line(0, 0, 0, length);
	    } else if (direction == 2){
	    	line(0, 0-length/2, 0, length/2);
	    } else if (direction == 3){
	    	line(0, 0-length, 0, 0);
	    }
	    popMatrix();
	  }
}




// Adapted from ProcessingJS examples

float max_distance;
PImage b;
int cellWidth;

void setup() {
  size(window.innerWidth, window.innerHeight);
	smooth();
	noStroke();
	max_distance = dist(0, 0, width, height);
	b = loadImage("media/adult-sloth.jpg");
	cellWidth = 50;
}

void draw() 
{

	image(b, 0, 0);
	
	for(int i = 0; i <= width; i += cellWidth) {
		for(int j = 0; j <= width; j += cellWidth) {
			float size = dist(mouseX, mouseY, i, j);
			size = size/max_distance * (cellWidth*6.3);
			ellipse(i, j, size, size);
		}
	}
}
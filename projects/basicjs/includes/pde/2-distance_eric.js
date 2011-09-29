// Adapted from ProcessingJS examples

float max_distance;
int cellWidth;
int minLength, maxLength;
int r, g, b;

void setup() {
	size(window.innerWidth, window.innerHeight);
	smooth();
	//max_distance = dist(0, 0, width, height);
	
	minLength = 5;
	maxLength = height * .75;
	
	cellWidth = 20;
	strokeWeight(cellWidth - 1);
}

void draw() 
{
	background(55);
	
	
	////////////////////////
	// TOP WALL
	
	r = 255 - (mouseY / height) * 255;
	g = 255 - (mouseX / width) * 255;
	b = 255 - (mouseX + mouseY) / (height + width) * 255;
	
	for(int i = 0; i <= width; i += cellWidth) {
		int j = 0;
			float distance = dist(mouseX, mouseY, i, j);
			float size = maxLength - distance;
			stroke(r, g, b, 100);
			
			if (size < minLength){
				size = minLength;
			}
			
			line(i, j, i, j+size);
	}
	
	////////////////////////
	// BOTTOM WALL
	
	r = (mouseX / width) * 255;
	g = (mouseY / height) * 255;
	b = (mouseX + mouseY) / (height + width) * 255;
	
	for(int i = 0; i <= width; i += cellWidth) {
		j = height;
			float distance = dist(mouseX, mouseY, i, j);
			float size = maxLength - distance;
			stroke(r, g, b, 100);
			
			if (size < minLength){
				size = minLength;
			}
			
			line(i, j, i, j-size);
	}
	
	////////////////////////
	// LEFT WALL
	
	r = 255 - (mouseY / height) * 255;
	g = 255 - (mouseX + mouseY) / (height + width) * 255;
	b = 255 - (mouseX / width) * 255;
	
	for(int i = 0; i <= height; i += cellWidth) {
		j = 0;
			float distance = dist(mouseX, mouseY, j, i);
			float size = maxLength - distance;
			stroke(r, g, b, 100);
			
			if (size < minLength){
				size = minLength;
			}
			
			line(j, i, j+size, i);
	}
	
	////////////////////////	
	// RIGHT WALL
	
	b = (mouseX / width) * 255;
	g = (mouseY / height) * 255;
	r = (mouseX + mouseY) / (height + width) * 255;
	
	for(int i = 0; i <= height; i += cellWidth) {
		j = width;
			float distance = dist(mouseX, mouseY, j, i);
			float size = maxLength - distance;
			stroke(r, g, b, 100);
			
			if (size < minLength){
				size = minLength;
			}
			
			line(j, i, j-size, i);
	}
	
	
	////////////////////////	
	// Oops... but its cool
	/*
	b = (mouseX / width) * 255;
	g = (mouseY / height) * 255;
	r = (mouseX + mouseY) / (height + width) * 255;
	
	for(int i = width*.25; i <= width*.75; i += cellWidth) {
		j = height/2;
			float distance = dist(mouseX, mouseY, j, i);
			float size = maxLength - distance;
			stroke(r, g, b, 100);
			
			if (size < minLength){
				size = minLength;
			}
			
			line(i, j-size/2, j+size/2, i);
	}
	*/
	
	///////////////////////////
	// CENTER STRIPES
	// hm too confusing
	
	/*
	b = (mouseX / width) * 255;
	g = (mouseY / height) * 255;
	r = (mouseX + mouseY) / (height + width) * 255;
	
	for(int i; i <= width; i += cellWidth) {
		j = height/2;
			float distance = dist(mouseX, mouseY, i, j);
			float size = maxLength - distance;
			stroke(r, g, b, 100);
			
			if (size < minLength){
				size = minLength;
			}
			
			line(i, j-size/2, i, j+size/2);
	}
	
	g = (mouseX / width) * 255;
	r = (mouseY / height) * 255;
	b = (mouseX + mouseY) / (height + width) * 255;
	
	for(int i; i <= height; i += cellWidth) {
		j = width/2;
			float distance = dist(mouseX, mouseY, j, i);
			float size = maxLength - distance;
			stroke(r, g, b, 100);
			
			if (size < minLength){
				size = minLength;
			}
			
			line(j-size/2, i, j+size/2, i);
	}
	*/
}
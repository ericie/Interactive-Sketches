console.log("EE: Shapes loaded");

function line(x,y,r) {
	c.lineWidth = 1;
	c.strokeStyle = lineColor;
    c.beginPath();
    c.moveTo(oldX,oldY);
    c.lineTo(x,y);
    c.stroke();
	
	oldX = x;
	oldY = y;
}

function circle(x,y,r) {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI*2, true);
  c.closePath();
  c.fill();
}

function rect(x,y,w,h) {
  c.beginPath();
  if (!h) h = w;
  c.rect(x,y,w,h);
  c.closePath();
  c.fill();
}

function triangle(x,y,w,h) {
	c.beginPath();  
	c.moveTo(x,y);  
	c.lineTo(x-w/2,y+h);  
	c.lineTo(x+w/2,y+h);  
	c.fill();
}

function rTriangle(x,y,w,h) {
	c.beginPath();  
	c.moveTo(x,y);  
	c.lineTo(x,y+h);  
	c.lineTo(x+w,y+h);  
	c.fill();
}

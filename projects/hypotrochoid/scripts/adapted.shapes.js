var x = 150;
var y = 150;
var oldX = 150;
var oldY = 150;
var lineColor = 'rgba(255,0,100,.2)';

function line(_x,_y,_t,_r,_g,_b,_a) {
	
	if (_r && _g && _b && _a){  // Don't reset line color if we don't have the params
		lineColor = 'rgba('+_r+','+_g+','+_b+','+_a+')';
	}
	
	ctx.lineWidth = _t;
	ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(oldX,oldY);
    ctx.lineTo(_x,_y);
    ctx.stroke();
	
	oldX = _x;
	oldY = _y;
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}


function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function fade() {
  ctx.fillStyle = "rgba(255, 255, 255, "+fadeRate+")";
  ctx.beginPath();
  ctx.rect(0,0,WIDTH,HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
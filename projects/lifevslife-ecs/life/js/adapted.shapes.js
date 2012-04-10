var bg_color = "rgb(0, 0, 0)";
var target_color = "rgb(255, 35, 205)";
var dead_color = "rgb(90, 90, 90)";
var live_color = "rgb(70, 255, 70)";


function line(x,y,r) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(oldX,oldY);
    ctx.lineTo(x,y);
    ctx.stroke();
	oldX = x;
	oldY = y;
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

function bg(x,y,w,h) {
  ctx.fillStyle = bg_color;
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function fade() {
  ctx.fillStyle = "rgba(255, 255, 255, "+fadeRate+")"
  ctx.beginPath();
  ctx.rect(0,0,WIDTH,HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function cell(x,y,w,h){
  ctx.fillStyle = dead_color;
  ctx.beginPath();
  ctx.rect(x,y,w-1,h-1);
  ctx.closePath();
  ctx.fill();
}

function cell_clear(x,y,w,h){
	ctx.lineWidth = 2;
	ctx.strokeStyle = bg_color;
  	ctx.strokeRect(x,y,w-1,h-1);
  	
  //ctx.fill();
  /*
  ctx.fillStyle = dead_color;
  ctx.beginPath();
  ctx.rect(x,y,w-1,h-1);
  ctx.closePath();
  ctx.fill();
  */
}


function cell_outline(x,y,w,h,_turnOn,_target,_team){

  // Either draw the green border or write over it with the black one
  ctx.lineWidth = 2;
  if (_target){
  	ctx.strokeStyle = target_color;
  } else {
  	ctx.strokeStyle = bg_color;
  }
  ctx.strokeRect(x,y,w-1,h-1);
  
  // shrink the size so we don't write over the thick border
  if (_target){
	w-=2;
	h-=2;
	x+=1;
	y+=1;  
  }
  
  ctx.beginPath();
  ctx.rect(x,y,w-1,h-1);
  if (_turnOn >= 1){
  	ctx.fillStyle = live_color;
  } else {
  	ctx.fillStyle = dead_color;
  }
  ctx.closePath();
  ctx.fill();

}


function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}


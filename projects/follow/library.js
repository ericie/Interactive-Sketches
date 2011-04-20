var x = 150;
var y = 150;
var oldX = 150;
var oldY = 150;

var dx = 2;
var dy = 4;

var maxSpeed = 4;

var ctx;
var WIDTH = 2000;
var HEIGHT = 700;

var intervalID = 0;

var cursorX = 150;
var cursorY = 150;

var particleCount = 0;
var particleList = {};
var ctCanvas = document.getElementById("canvas");

var rightDown = false;
var leftDown = false;

function init() {
  	ctx = $('#canvas')[0].getContext("2d");
	
	ctCanvas = document.getElementById("canvas");
	if ($.browser.msie && document.all){
  		//alert("PC MODE");
  		setTimeout("initCanvasSize();",20);
  		showLog = false;
  	} else {
  		initCanvasSize();
  	}
	
	
	//console.log(window.innerHeight);
	intervalId = setInterval(draw, 1);
	return intervalId;
}

function initCanvasSize(){
	ctCanvas.width = document.body.clientWidth;//window.innerWidth;
	ctCanvas.height = document.documentElement.clientHeight;//window.innerHeight;
}


function onMouseMove(evt) {
  cursorX = evt.pageX;
  cursorY = evt.pageY;
}

function circle(x,y,r) {
	ctx.lineWidth = 35;
	ctx.strokeStyle = 'rgba(255,0,100,.25)';
    ctx.beginPath();
    ctx.moveTo(oldX,oldY);
    ctx.lineTo(x,y);
	ctx.closePath();
    ctx.stroke();
	
	oldX = x;
	oldY = y;
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function fade() {
  ctx.fillStyle = "rgba(255, 255, 255, .01)";
  ctx.beginPath();
  ctx.rect(0,0,WIDTH,HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}


function draw() {
	//clear();
	//fade();
	circle(x, y, 4);
  
  	
	dx = (cursorX - x)/5;
	dy = (cursorY - y)/5;
	
	x += dx;
	y += dy;
	
}


$(document).mousemove(onMouseMove);
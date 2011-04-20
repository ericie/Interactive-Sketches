// Common functions
// Eric Ishii Eckhardt for Adapted
// http://adaptedstudio.com
//


var x = Math.random()*150;
var y = Math.random()*150;
var dx = 1.5;
var dy = -4;
var ctx;
var WIDTH;
var HEIGHT;
var canvasMinX = 0;
var canvasMaxX = 0;
var intervalId = 0;
var pcMode = false;
var noTrace = false;
var ballr;
var ballcolor = "#FFFFFF";
var fadecolor = "rgba(50,50,50,.4)";
var backcolor = "#000000";
var particleList;
var system;
var particleColor = '#000fff';
var systemSize = 25;


function init() {
	ctx = $('#canvas')[0].getContext("2d");
	resizeCanvas();
	WIDTH = $("#canvas").width();
	HEIGHT = $("#canvas").height();
	startback();
	intervalId = setInterval(draw, 10);
	return intervalId;
}

function draw() {
 	system.update();  
	//fade();
}

function resizeCanvas(){
	WIDTH = $(window).width();
	HEIGHT = $(window).height();
	
	ctx.height = HEIGHT;
	ctx.width = WIDTH;
	$("#canvas").attr("height", HEIGHT);
	$("#canvas").attr("width", WIDTH);
	
	startback();
	//ctx.globalCompositeOperation = "lighter";
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

function clearbg() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
 	ctx.fillStyle = "#000000";
	ctx.rect(0,0,WIDTH,HEIGHT);
	ctx.closePath();
	ctx.fill();
}

function fade(){
	ctx.fillStyle = backcolor;
	ctx.rect(0,0,WIDTH,HEIGHT);
	ctx.closePath();
	ctx.fill();
}

function startback(){
	ctx.fillStyle = backcolor;
	ctx.rect(0,0,WIDTH,HEIGHT);
	ctx.closePath();
	ctx.fill();
}

// Logging that i can turn off
function log(m){
	if (pcMode || noTrace){
		console.log(m);
	}
}

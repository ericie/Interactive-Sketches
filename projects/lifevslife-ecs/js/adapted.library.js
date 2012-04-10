var x = 150;
var y = 150;
var oldX = 150;
var oldY = 150;

var ctx;
var ctCanvas;
var WIDTH = 2000;
var HEIGHT = 1000;

var intervalID = 0;
var cursorX = 150;
var cursorY = 150;
var fadeRate = .05;
var showLog = true;
var pcMode = false;
var initDone = false;

function init() {
  	//ctx = $('#canvas')[0].getContext('2d');
  	ctx = $('#canvas')[0].getContext('2d');
	HEIGHT =  window.innerHeight;
 	WIDTH =  window.innerWidth;
	ctCanvas = document.getElementById("canvas");
	  	
  	if ($.browser.msie && document.all){
  		pcMode = true;
  		showLog = false;
  		initCanvasSize();
  	} else {
  		initCanvasSize();
  	}
	
	intervalId = setInterval(draw, 10);
	initDone = true;
	return intervalId;
}

function initCanvasSize(){
	// check for IEs innerHeight alternative
	if (!pcMode){
		HEIGHT =  window.innerHeight;
 		WIDTH =  window.innerWidth;
 	} else {
		WIDTH = document.body.clientWidth;
		HEIGHT = document.documentElement.clientHeight;
	}
	
	ctCanvas.width = WIDTH;
	ctCanvas.height = HEIGHT;
	
	log(window.innerHeight);
}

function onMouseMove(evt) {
  	cursorX = evt.pageX;
  	cursorY = evt.pageY;
  	if (grid){
	  	grid.target();	
  	}
}

function lifePlay(){
	grid.start();
}
function lifePause(){
	grid.pause();
}

function canvasClick(evt) {
	grid.drawStop();
}

$(document).mousemove(onMouseMove);

// Logging that i can turn off
function log(m){
	if (showLog){
		console.log(m);
	}
}



var ctx;
var ctCanvas;
var WIDTH = 2000;
var HEIGHT = 1000;

var intervalID = 0;
var cursorX = 150;
var cursorY = 150;
var fadeRate = .05;
var showLog = true;
var pcMode;


function init() {
  	//ctx = $('#canvas')[0].getContext('2d');
  	ctx = $('#canvas')[0].getContext('2d');
	HEIGHT =  window.innerHeight;
 	WIDTH =  window.innerWidth;
	ctCanvas = document.getElementById("canvas");
	  	
	// TODO: Swap out this browser detect for a feature detect
  	if ($.browser.msie && document.all){
  		pcMode = true;
  		showLog = false;
  		initCanvasSize();
  	} else {
  		initCanvasSize();
  	}
  	//ctx = document.getElementById('canvas').getContext('2d');
	//ctx.globalCompositeOperation = source-over;

  	initLineManager();
  	
	intervalId = setInterval(draw, 10);
	
	// If anything is Draggable
	initDragging();
	
	return intervalId;
	
}

function draw() {
	// reference objects draw loops here
	//log(lineManager);
	lineManager.update();
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
	
	ctCanvas.width = WIDTH - 15;
	ctCanvas.height = HEIGHT;
	
	log(window.innerHeight);
}

function onMouseMove(evt) {
  cursorX = evt.pageX;
  cursorY = evt.pageY;
}

$(document).mousemove(onMouseMove);

function initDragging(){
	$(".draggable").draggable();
}
// Logging that i can turn off
function log(m){
	if (showLog){
		console.log(m);
	}
}


var ctx;
var ctCanvas;
var WIDTH = 2000;
var HEIGHT = 1000;
var pcMode;

function init() {
  //ctx = $('#canvas')[0].getContext('2d');

  ctx = $('#canvas')[0].getContext('2d');
	HEIGHT =  window.innerHeight;
 	WIDTH =  window.innerWidth;
	ctCanvas = document.getElementById("canvas");
	  	
  	if ($.browser.msie && document.all){
  		pcMode = true;
  		initCanvasSize();
  	} else {
  		initCanvasSize();
  	}

	intervalId = setInterval(draw, 30);
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
	
	ctCanvas.width = WIDTH - 15;
	ctCanvas.height = HEIGHT;
	
	log(window.innerHeight);
}

init();
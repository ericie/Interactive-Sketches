// Lines Go Around
// Eric Ishii Eckhardt for Adapted
// http://adaptedstudio.com
//

var _red = 255;
var _green = 255;
var _blue = 50;
var _alpha = .5;
var rad = 100;
var particleColor;
var lineManager;
var newLine;

var fadeStage = false;
var grayScale = false;
var dx = 2;
var dy = 4;



///////

var _steps				= 1000;			// Divide a circle this many times
var _R					= 50;			// The major ripple
var _r					= 0.25;			// The minor ripple
var _p					= 25;			// Radius type effect
var _m					= 1;			// Angle multiplier
var _amplitude			= 2.5;			// Scale of final drawing

var _opacity			= 0.2;			// Line opacity
var _color1				= 0x000000;		// Line start colour
var _color2				= 0x000000;		// Line end colour
var _thickness			= 1;			// Line thickness

var section_length		= 10;			// Number of sections for each line
var deg2rad				= Math.PI/180;	// Factor to convert degs to radians

////////

// INIT Inputs



function refreshImage(){
	_steps = checkReplace(_steps, "#inSteps");
	_amplitude = checkReplace(_amplitude, "#inScale");
	_R = checkReplace(_R, "#inMajor");
	_r = checkReplace(_r, "#inMinor");
	_p = checkReplace(_p, "#inRadius");
	_m = checkReplace(_m, "#inAngMult");
	_red = checkReplace(_red, "#inRed");
	_green = checkReplace(_green, "#inGreen");
	_blue = checkReplace(_blue, "#inBlue");
	_alpha = checkReplace(_alpha, "#inAlpha");
	
	clear(); 
	newLine.init();
}

function checkReplace(_val, _formVal){
	var replaceVal = $(_formVal).val();
	var returnVal = _val;
	if ( replaceVal  ){ // Check if this Value exists on the form
		returnVal = replaceVal;
	}
	return returnVal;
}

function initLineManager(){
	log("initLineManager");
	lineManager = new LineManager();
	$("input").keyup(function () {
		refreshImage();
	});
}

function LineManager(){
	log("LineManager");
	this.init();
}

LineManager.prototype.init = function(_systemSize){
	//var i = 0;
	//for(i=0; i < _systemSize+1; i++){
		this.createLine();
	//}
};

LineManager.prototype.createLine = function(){
	newLine = new Line();
	newLine.init();
	//this.list.push(newLine);
};

LineManager.prototype.update = function(){
	newLine.draw();
	//var i = 0;
	//for(i = 0; i < systemSize-1; i++){
	//	this.list[i].draw();
	//}
};


function Line(){
	
};

Line.prototype.init = function(){
	
};

Line.prototype.createLine = function(){

};

Line.prototype.update = function(){

};

Line.prototype.init = function(){

	//////
	//if (numChildren > 0) removeChildAt(0);
	
	//var plot:Sprite = new Sprite();
	//var l:Shape;
	
	var _myX, _myY, _myOX, _myOY;
	var sl = 0;
	var theta = 0;
	var thetaStep = 2 * Math.PI / _steps;
	var s = (_R + _r) / _r;
	var rR = _r + _R;
	var rp = _r + _p;
	//setColorPalette();
	//var cpl = colorPalette.length;

	var offsetX = 500;
	var offsetY = 500;
	
	for (var t = 0; t <= _steps; t++)
	{
		_myX = rR * Math.cos(_m * theta) + rp * Math.cos(s * _m * theta);
		_myY = rR * Math.sin(_m * theta) + rp * Math.sin(s * _m * theta);
		
		_myX *= _amplitude;
		_myY *= _amplitude;
		
		_myX += offsetX;
		_myY += offsetY;
		
		var tempA = .5;
		
		if (sl == 0)
		{
			//c = (_color1 == _color2 || cpl < 2) ? _color1 : colorPalette[t % cpl];
			// Create new line section
			//l = new Shape();
			//l.graphics.lineStyle(_thickness, c, _opacity, false, "normal", "none", "round");
			
			
			if (t == 0)
			{
				//l.graphics.moveTo(x, y);
				oldX = _myX;
				oldY = _myY;
				line(_myX,_myY,_thickness,_red,_green,_blue,_alpha);
				
			} else {
				//l.graphics.moveTo(ox, oy);
				//l.graphics.lineTo(x, y);
				line(_myX,_myY,_thickness,_red,_green,_blue,_alpha);
			}
			//plot.addChild(l);
		} else {
			// Append to line section
			//l.graphics.lineTo(x, y);
			line(_myX,_myY,_thickness,_red,_green,_blue,_alpha);
		}
		
		ox = _myX;
		oy = _myX;
		sl++;
		theta += thetaStep;
		
		if (sl == section_length) sl = 0;
	}
	//addChild(plot);
	//////
};

Line.prototype.draw = function(){
	//log("Draw Line");
	var tempX, tempY, tempH, tempW, tempT, tempA;
	tempX = Math.random() * WIDTH;
	tempY = Math.random() * HEIGHT;
	tempH = Math.random() * 200 + 5;
	tempW = Math.random() * 200 + 5;
	tempT = _thickness;
	tempA = _opacity;
	
	
	//////////////
	
	
	//////////////
	//line(tempX,tempY,tempT,255,255,50,tempA);
	
};

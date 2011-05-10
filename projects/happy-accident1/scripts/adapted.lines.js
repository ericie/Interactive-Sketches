// Lines Go Around
// Eric Ishii Eckhardt for Adapted
// http://adaptedstudio.com
//

var _red = 255;
var _green = 255;
var _blue = 255;
var _alpha = .1;
var rad = 100;
var particleColor;
var lineManager;
//var newLine;
var systemSize = 15;

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
	initLineManager(true);
	//newLine.init();
}

function checkReplace(_val, _formVal){
	var replaceVal = $(_formVal).val();
	var returnVal = _val;
	if ( replaceVal  ){ // Check if this Value exists on the form
		returnVal = replaceVal;
	}
	return returnVal;
}

function saveImage(){
	//Canvas2Image.saveAsPNG(ctCanvas);
	var oImgPNG = Canvas2Image.saveAsPNG(ctCanvas, true);
	$("#savedImages").append(oImgPNG);
}

function initLineManager(_refresh){
	log("initLineManager");
	lineManager = new LineManager();
	if (_refresh != true){
	$("input").keyup(function () {
		refreshImage();
	});
	$("button").mouseup(function () {
		//var strDataURI = ctx.toDataURL();
		saveImage();
	});
	}
}

function LineManager(){
	log("LineManager");
	this.init();
}

LineManager.prototype.init = function(_systemSize){
	this.list = [];
	var i = 0;
	for(i=0; i <= systemSize; i++){
		this.createLine();
	}
};

LineManager.prototype.createLine = function(){
	var newLine = new Line();
	newLine.init();
	this.list.push(newLine);
};

LineManager.prototype.update = function(){
	//newLine.draw();
	var i = 0;
	for(i = 0; i < systemSize-1; i++){
		this.list[i].draw();
	}
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
	
	this._myX = 10;
	this._myY = 10;
	this.sl = 0;
	this.theta = 0;
	this.thetaStep = 2 * Math.PI / _steps;
	this.s = (_R + _r) / _r;
	this.rR = _r + _R;
	this.rp = _r + _p;
	//setColorPalette();
	//var cpl = colorPalette.length;

	this.offsetX = Math.random()*900;
	this.offsetY = Math.random()*900;
	
	this.t = 0;
	
	//addChild(plot);
	//////
};

Line.prototype.draw = function(){
	//log("Draw Line "+ this.t + " | " + _steps);
	
	/*
	var tempX, tempY, tempH, tempW, tempT, tempA;
	tempX = Math.random() * WIDTH;
	tempY = Math.random() * HEIGHT;
	tempH = Math.random() * 200 + 5;
	tempW = Math.random() * 200 + 5;
	tempT = _thickness;
	tempA = _opacity;
	*/
	
	
	
	var thetaStep = 2 * Math.PI / _steps;
	var s = (_R + _r) / _r;
	var rR = _r + _R;
	var rp = _r + _p;
	
	if (this.t <= _steps)
	{
		//log("Draw Line "+ this.t + " | " + _steps + " | " + this._myX);
		
		this._myX = rR * Math.cos(_m * this.theta) + rp * Math.cos(s * _m * this.theta);
		this._myY = rR * Math.sin(_m * this.theta) + rp * Math.sin(s * _m * this.theta);
		
		this._myX *= _amplitude;
		this._myY *= _amplitude;
		
		this._myX += this.offsetX;
		this._myY += this.offsetY;
		
		if (this.t == 0)
		{
			oldX = this._myX;
			oldY = this._myY;	
		}
		line(this._myX,this._myY,_thickness,_red,_green,_blue,_alpha);
		
		this.sl++;
		this.theta += thetaStep;
		
		this.t += 1;
		//if (sl == section_length) sl = 0;
	}
	
	//////////////
	
	
	//////////////
	//line(tempX,tempY,tempT,255,255,50,tempA);
	
};

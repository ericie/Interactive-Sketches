// Super Simple Particle System
// Eric Ishii Eckhardt for Adapted
// http://adaptedstudio.com
//

var _r, _g, _b;
var _a = .5;
var rad = 100;
var particleList;
var system;
var particleColor;
var masterSystemSize = 80;
var systemSize = masterSystemSize;
var lots = true;

var pcMode = false;
var fadeStage = false;
var clearStage = true;
var grayScale = true;
var dx = 2;
var dy = 4;
var lineColor = 'rgba(255,0,100,.2)';
var particleCount = 0;
var particleList = {}; 



function draw() {
	// FOR PARICLES NOT LINES
	//clear();
	
	if (clearStage){
		wipe();
	}	
	if (fadeStage){
		fade();	
	}

	// UPDATE PARTICLE SYSTEM
	if (system){
		system.update();
	}

}


function initParticleSystem(){
	system = new ParticleSystem();
	system.init(systemSize);


	//

	/*
	gui.add(params, 'rotSpeedY').min(rMin).max(rMax).step(rS).onFinishChange(function(){
		// refresh based on the new value of params.interation
		rotSpeedY = params.rotSpeedY;
	})
	gui.add(params, 'rotSpeedZ').min(rMin).max(rMax).step(rS).onFinishChange(function(){
		// refresh based on the new value of params.interation
		rotSpeedZ = params.rotSpeedZ;
	})
	*/

	//
}


function ParticleSystem(){
	//this.init(systemSize);
}

ParticleSystem.prototype.init = function(_systemSize){
	this.list = [];
	var i = 0;
	for(i=0; i < _systemSize+1; i++){
		this.createParticle();
	}
}

ParticleSystem.prototype.createParticle = function(){
	var newParticle = new Particle(this.list.length);
	newParticle.init();
	this.list.push(newParticle);
}

ParticleSystem.prototype.update = function(){
	var i = 0;

	systemSize = this.list.length;
	for(i = 0; i < systemSize-1; i++){
		this.list[i].draw();
	}

}
ParticleSystem.prototype.remove = function(_particle){

}
ParticleSystem.prototype.requestConnections = function(_id){
	//return [1,2,3,4];
	var _pickNum = Math.round(Math.random() * 4);
	var _pList = [];
	for (var i = 0; i < _pickNum; i++){
		var _pNum = Math.round( Math.random() * this.list.length);
		//console.log( this.list.length );
		var _p = this.list[_pNum];
		_pList.push(_p);
	}
	return _pList;
}


function Particle(_id){
	// Particle
	this.id = _id;
}


Particle.prototype.init = function(){
	console.log("INIT");
	setColor(this);
	this.x = Math.random() * WIDTH;
	this.y = Math.random() * HEIGHT;
	this.vel = Math.random() * 5 + 1;
	this.ang = Math.random() * (Math.PI);
	this.oldX = this.x;
	this.oldY = this.y;
	this.speedModX = Math.random() * 12 + 16;
	this.speedModY = Math.random() * 12 + 16;
	this.speedModTargX = Math.random() * 10 + 10;
	this.speedModTargY = Math.random() * 10 + 10;
	this.maxSpeed = Math.random() * 20 + 5;
	this.speedX = 0;
	this.speedY = 0;
	this.diam = Math.random() * 10 + 3;
	this.oDiam = this.diam;
	this.system = system;
	this.connections = [];
	this.connected = false;
	this.stillFrame = 0;
	this.alive = true;
}

Particle.prototype.draw = function(){

	var _x = this.x;
	var _y = this.y;
	var _vel = this.vel;
	var _ang = this.ang;
	var _smx = this.speedModX;
	var _smy = this.speedModY;
	
	var _sX = this.speedX;
	var _sY = this.speedY;
	
	var connections = this.connections;
	
	if ( Math.abs(this.oldX - _x) < .5  && Math.abs(this.oldY - _y) < .5){
		this.stillFrame++;
	} else {
		this.stillFrame = 0;
	}

	if (this.stillFrame > 2){
		this.diam *= .95;
	} else {
		this.diam = this.oDiam;
	}
	if (this.diam < 1){ 
		this.connections = system.requestConnections(this.id);
		//this.alive = false; 
	}
	

	this.oldX = _x;
	this.oldY = _y;
	
	var _tX = _x;
	var _tY = _y;

	if (connections[0]){
		//console.log("CONNECTION " + connections[0]);
		_tX = connections[0].x;
		_tY = connections[0].y;
	}

	var targSpeedX = (_tX - _x)/this.speedModTargX;
	var targSpeedY = (_tY - _y)/this.speedModTargY;
	
	var maxSpeed = this.maxSpeed;

	ctx.fillStyle = this.color;
	//ctx.fillStyle = radgrad4;

	if (Math.abs(_sX) > maxSpeed){
		if (_sX > 0){
			_sX = maxSpeed;
		} else {
			_sX = 0 - maxSpeed;
		}
	}
	if (Math.abs(_sY) > maxSpeed){
		if (_sY > 0){
			_sY = maxSpeed;
		} else {
			_sY = 0 - maxSpeed;
		}
	}
	
	_sX += (targSpeedX - _sX)/_smx;
	_sY += (targSpeedY - _sY)/_smy;
	
	_x += _sX;
	_y += _sY;
	
	this.speedX = _sX;
	this.speedY = _sY;
	
	this.x = _x;
	this.y = _y;
	this.vel = _vel;
	this.ang = _ang;
	
	//particleLine(this)

	if (this.connected == false){
		this.connections = system.requestConnections(this.id);
		this.connected = true;
		//console.log(this.connections);
	} else {
		if (connections.length > 0){
			for(var j = 0; j < connections.length; j++){
				var curConn = connections[j];
				if (curConn && curConn.x){
					//if (!curConn){ console.log(i + "  " + connections); }
					var _connectX = curConn.x;
					var _connectY = curConn.y;
					//connections[0]

					if (this.id < 1){
						//console.log(connections[0].x + " - " + this.id);
					}

					//console.log(_connectX);
					ctx.strokeStyle = "rgba(0,0,0,0.1)"; 
					ctx.beginPath(); 
					ctx.moveTo(_x,_y);
					ctx.lineTo(_connectX,_connectY);
					ctx.closePath(); 
					ctx.stroke();
				}
			}
		}
	}

	particleCircle(this);

}

function particleCircle(p) {	
	var _x = p.x;
	var _y = p.y;
    circle(_x,_y,p.diam);	
}

function particleLine(p) {
	var _x = p.x;
	var _y = p.y;
	var _oldX = p.oldX;
	var _oldY = p.oldY;
	ctx.lineWidth = .5;
	if (p.colorTint > 5){
		ctx.lineWidth = 1.2;	
	}
	//ctx.strokeStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(_oldX,_oldY);
    ctx.lineTo(_x,_y);
	ctx.closePath();
    ctx.stroke();
	
}



// Chooses Grayscale or color image
function setColor(targ){
	if (grayScale){
		var gryV = Math.round(Math.random()*100);
		var gryA = (Math.random()*.35);
		targ.color = 'rgba('+gryV+','+gryV+','+gryV+','+gryA+')';
	} else {
		var colorTint = Math.round(Math.random() * 7);
		targ.colorTint = colorTint;
		//getColor(colorTint);
		_a = .55;
		if (colorTint <= 1){
			_r = 255;
			_g = 0;
			_b = 144;
			targ.color = 'rgba(255,0,144,'+_a+')';
		} else if (colorTint == 2){
			_r = 0;
			_g = 209;
			_b = 255;	
			targ.color = 'rgba(0,209,255,'+_a+')';
		} else if (colorTint == 3){
			_r = 0;
			_g = 255;
			_b = 4;	
			targ.color = 'rgba(0,255,4,'+_a+')';
		} else if (colorTint == 4){
			_r = 100;
			_g = 0;
			_b = 255;
			targ.color = 'rgba(100,0,255,'+_a+')';
		} else if (colorTint == 5){
			_r = 255;
			_g = 70;
			_b = 0;
			targ.color = 'rgba(255,70,0,'+_a+')';
		} else if (colorTint > 5){
			_r = 255;
			_g = 255;
			_b = 255;
			targ.color = 'rgba(200,200,200,'+_a+')';
		}
		
	}
}

// UI Checkbox Toggles Toggles
function toggleFade(){
	log("toggle fade");
	if (fadeStage == false){
		fadeStage = true;
		clearStage = false;
		$("#clearToggle").checked = false;
	} else {
		fadeStage = false;
	}
}

function toggleClear(){
	log("toggle fade");
	if (clearStage == false){
		clearStage = true;
		fadeStage = false;
	} else {
		clearStage = false;
	}
}

function toggleColor() {
	log("toggle color");
	if (grayScale == false){
		grayScale = true;
	} else {
		grayScale = false;
	}
	
	var i = 0;
	for(i = 0; i < systemSize-1; i++){
		var curItem = system.list[i];
		curItem.grayScale = grayScale;
		setColor(curItem);
	}
}


function toggleTarget() {
	log("toggle Target");
}

function toggleAmount(){
	if (lots == false){
		lots = true;
		systemSize = masterSystemSize;
	} else {
		lots = false;
		systemSize = 20;
	}
	
	initParticleSystem();
}



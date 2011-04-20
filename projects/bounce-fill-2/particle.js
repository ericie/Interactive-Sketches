// Super Simple Particle System
// Eric Ishii Eckhardt for Adapted
// http://adaptedstudio.com
//


var _r;
var _g;
var _b;
var rad = 100;

function initParticleSystem(){
	system = new ParticleSystem();
	system.init(systemSize);
	//ParticleSystem.createBunch(10);
}

function ParticleSystem(){
	//this.init(systemSize);
}
ParticleSystem.prototype.init = function(_systemSize){
	log("init:"+_systemSize);
	
	this.list = [];
	var i = 0;
	for(i=0; i < _systemSize+1; i++){
		this.createParticle();
	}
	//log("LIST: "+this.list);
}

ParticleSystem.prototype.createParticle = function(){
	var newParticle = new Particle();
	newParticle.init();
	this.list.push(newParticle);
}

ParticleSystem.prototype.update = function(){
	var i = 0;
	for(i = 0; i < systemSize-1; i++){
		//this.list[i].x = Math.random()*700;
		//this.list[i].y = Math.random()*700;
		//log(i);
		this.list[i].draw();
	}
}


function Particle(){
	// Particle
}


Particle.prototype.init = function(){

	var colorTint = Math.round(Math.random() * 5);
	getColor(colorTint);
	
	this.color = 'rgb('+_r+','+_g+','+_b+')';
	this.x = Math.random() * 600;
	this.y = Math.random() * 400;
	this.vel = Math.random() * 5 + 1;
	this.ang = Math.random() * (Math.PI);
	this.diameter = Math.random() * 5 + 1;;
}

Particle.prototype.draw = function(){
	log("drawX:"+this.x);
	ctx.fillStyle = this.color;
	var _x = this.x;
	var _y = this.y;
	var _d = this.diameter;
	var _vel = this.vel;
	var _ang = this.ang;
	
	_ang += .01;
	_x += _vel * Math.cos(_ang);
	_y += _vel * Math.sin(_ang);
	
	if (_x + _d > WIDTH || _x - _d < 0){
    	_ang = (1 * Math.PI) - _ang;
    }
    
	if (_y - _d < 0 || _y + _d > HEIGHT ) {
    	_ang = (2 * Math.PI) - _ang;
	}

	//x += dx;
	//y += dy;
	
	
	circle(_x, _y, _d);
	
	this.x = _x;
	this.y = _y;
	this.vel = _vel;
	this.ang = _ang;
	
	/*
	if (_x + _d > WIDTH || _x - _d < 0)
    dx = -dx;

	if (y + dy - ballr < 0)
	    dy = -dy;
	else if (y + dy + ballr > HEIGHT ) {
		dy = -dy;
	}

	x += dx;
	y += dy;
	*/
}


function getColor(cType){
	if (cType == 1){
		_r = Math.round(Math.random() * 155 + 100);
		_g = Math.round(Math.random() * 150 + 20);
		_b = Math.round(Math.random() * 150 + 20);
	} else if (cType == 2){
		_r = Math.round(Math.random() * 70);
		_g = Math.round(Math.random() * 155 + 100);
		_b = Math.round(Math.random() * 70);	
	} else if (cType == 3){
		_r = Math.round(Math.random() * 60);
		_g = Math.round(Math.random() * 60);
		_b = Math.round(Math.random() * 155 + 100);	
	} else if (cType == 4){
		_r = Math.round(Math.random() * 55 + 200);
		_g = Math.round(Math.random() * 55 + 200);
		_b = Math.round(Math.random() * 55 + 200);
	} else if (cType == 5){
		_r = Math.round(Math.random() * 75);
		_g = Math.round(Math.random() * 75);
		_b = Math.round(Math.random() * 75);
	}
}


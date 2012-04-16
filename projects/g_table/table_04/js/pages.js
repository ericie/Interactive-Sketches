
/*
function draw() {
	// FOR PARICLES NOT LINES
	//clear();
	
	// UPDATE PARTICLE SYSTEM
	if (system){
		system.update();
	}
		
	// FOR FADING LINES
	if (fadeStage){
		fade();	
	}
}
*/

var ambientPages, uiPages;
var ambientSize;
var yBaseline = -500;
var yMin = 1080;

ambientSize = 40;

function initParticleSystems(_n){
	ambientPages = new ParticleSystem();
	ambientPages.init(_n);
}

function randActivate(){
	ambientPages.randActivate();
}

function ParticleSystem(){}

ParticleSystem.prototype.init = function(_systemSize){
	this.list = [];
	this.systemSize = _systemSize;
	this.interval = setInterval(randActivate, 8000);  
	var i = 0;
	for(i=0; i < this.systemSize +1; i++){
		this.createParticle();
	}
}
ParticleSystem.prototype.randActivate = function(){
	var actNum = Math.round(Math.random() * this.systemSize);
	this.list[actNum].activate();
}
ParticleSystem.prototype.createParticle = function(_received, _v){
	var newPage = new Page();
	if(_received == true){
		//console.log(_v);
		newPage.receivePage(_v);
	} else {
		newPage.init();
		newPage.startSeek();
	}
	
	this.list.push(newPage);
	
}

ParticleSystem.prototype.update = function(){
	var i = 0;
	for(i = 0; i < this.list.length; i++){
		this.list[i].update();
	}
}



var groundPlanes = [
	{y:(yBaseline-10), z:-10, x:1500},
	{y:(yBaseline+20), z:-20, x:1500},
	{y:(yBaseline+45), z:-30, x:1500},
	{y:(yBaseline+65), z:-40, x:1500}
];

var receivePage = function(_v){
	ambientPages.createParticle(true, _v);	
}

/////////////////////////
// Page Object
// 
function Page(){}

// TODO: ALLOW INIT VALUES from THE MESSAGE RECEIVED
Page.prototype.init = function(_init){
	console.log("Init Page");
	
	// Layer settings, Front to Back
	
	this.planes = groundPlanes;
	this.startShape();
	this.repop = true;

	//TODO:
	scene.add(this.plane);
}

Page.prototype.receivePage = function(_v){
	//console.log("Got Page");
	this.active = true;
	this.repop = false;

	var c = _v.color;
	//console.log(_v);
	this.dim = {h:45,w:35};
	this.color = new THREE.Color( 0xff00ff );
	this.color.setRGB(c.r,c.g,c.b);

	this.material = new THREE.MeshBasicMaterial();
	this.material.color = this.color;
	
	this.target = {};

	///
	this.geom = new THREE.PlaneGeometry(30, 50);
	this.plane = new THREE.Mesh(this.geom,this.material);

	this.plane.position.x = _v.position.x;
	this.plane.position.z = _v.position.z;
	this.plane.position.y = 0 - (1080/2);//_v.position.y * -1;
	this.velocity = new THREE.Vector3(_v.velocity.x, _v.velocity.y, _v.velocity.z);
	console.log(this.velocity);
	scene.add(this.plane);
}

Page.prototype.startShape = function(){
	this.active = false;
	

	var colorArray = _.keys(colors);
	var colorNum = Math.round(Math.random() * (colorArray.length-1));
	var c = colors[colorArray[colorNum]];

	this.dim = {h:45,w:35};
	this.color = new THREE.Color( 0xff00ff );
	this.color.setRGB(c[0],c[1],c[2]);
	this.material = new THREE.MeshBasicMaterial();
	this.material.color = this.color;
	
	this.target = {};

	

	///
	this.geom = new THREE.PlaneGeometry(30, 50);
	this.plane = new THREE.Mesh(this.geom,this.material);

	//this.plane.position.x = rangeNum(0, this.xRange);
	
	//var modY = Math.abs(this.plane.position.x) * .02; // to account for curvature
	//this.plane.position.y = rangeNum(this.yRange.base, this.yRange.amp) - modY;
	//this.plane.position.z = this.zSet;

	this.randomPos()
}

Page.prototype.randomPos = function(){
	var pNum = Math.round(Math.random()*3);
	this.pSet = this.planes[pNum];

	this.xRange = this.pSet.x;
	this.zSet = this.pSet.z;
	this.yRange = {amp: 10, base:this.pSet.y}

	this.active = false;
	this.plane.position.x = rangeNum(0, this.xRange);
	var modY = Math.abs(this.plane.position.x) * .02; // to account for curvature
	this.plane.position.y = rangeNum(this.yRange.base, this.yRange.amp) - modY;
	this.plane.position.z = this.pSet.z;

	this.velocity = new THREE.Vector3(0, -Math.random(), 0);
}

Page.prototype.create = function(){
	console.log("Create Page");
}
Page.prototype.activate = function(){
	this.active = true;
}
Page.prototype.startSeek = function(){
	var vector = new THREE.Vector3(),
	_acceleration, _width = 500, _height = 500, _depth = 200, _goal, _neighborhoodRadius = 100,
	_maxSpeed = 4, _maxSteerForce = 0.1, _avoidWalls = false;

	this.maxVel = new THREE.Vector3(2,2,2);
	this.seekTarg = new THREE.Vector3(100,100,0);
	this.position = this.plane.position;
	//this.velocity = this.velocity;
	_acceleration = new THREE.Vector3();
}
Page.prototype.seek = function(){
	this.active = true;

	var p = this.plane;
	var desiredVec = new THREE.Vector3().sub(this.seekTarg, p.position); 
	var _mult = new THREE.Vector3(.2,.2,.2);
	//_acceleration = desiredVec.multiplySelf(_mult);
	_acceleration = desiredVec.normalize();
	
	this.velocity.addSelf( _acceleration );

	var l = this.velocity.length();

	if ( l > _maxSpeed ) {
		this.velocity.divideScalar( l / _maxSpeed );
	}

	this.position.addSelf( this.velocity );
	_acceleration.set( 0, 0, 0 );
}

Page.prototype.update = function(){
	var p = this.plane;
	//function debugAction(_self) {
	var debugAction = function(_self) {
		//console.log(_self);
		_self.velocity.addSelf( new THREE.Vector3(0,.1,0) );
		p.position.addSelf(_self.velocity);
	}

	if (this.active == true && p.position){
		//debugAction(this);
		this.seek();
	}

	// Test Offscreen
	
	var screenPos = calc2Dpoint(p.position.x, p.position.y, p.position.z);
	if (screenPos.y > w.height) {
		if (upScreen){
			sendMessage(upScreen, this);
		}
		if (this.repop == true){
			this.randomPos();
		}
	}		

}

	// A method that calculates a steering vector towards a target
	// Takes a second argument, if true, it slows down as it approaches the target

	var steer = function(_target, _pos, _slowdown, _vel) {
		var steerVec = new THREE.Vector3(0,.010,0);  // The steering vector
		var desiredVec = new THREE.Vector3(0,0,0);
		var maxspeed = .5;

		desiredVec = _target.subSelf(_pos);  // A vector pointing from the location to the target
		//console.log("-|- -|- -|-");
		var d = desiredVec.distanceTo(_pos); // Distance from the target is the magnitude of the vector
		console.log(d);

		// If the distance is greater than 0, calc steering (otherwise return zero vector)
		
		if (d > 0) {
		  // Normalize desired
		  desiredVec.normalize();
		  // Two options for desired vector magnitude (1 -- based on distance, 2 -- maxspeed)
		  //if ((slowdown) && (d < 100.0)) desired.mult(maxspeed*(d/100.0)); // This damping is somewhat arbitrary
		  //else desired.multiplySelf(maxspeed);
		  // Steering = Desired minus Velocity
		  steerVec = new THREE.Vector3().sub(desiredVec,_vel);
		  //steerVec.limit(maxforce);  // Limit to maximum steering force
		} else {
		  steer = new THREE.Vector3(0,0,0);
		}
		
		return steerVec;
	}

  

/*

  // A method that calculates a steering vector towards a target
  // Takes a second argument, if true, it slows down as it approaches the target
  PVector steer(PVector target, boolean slowdown) {
    PVector steer;  // The steering vector
    PVector desired = PVector.sub(target,loc);  // A vector pointing from the location to the target
    float d = desired.mag(); // Distance from the target is the magnitude of the vector
    // If the distance is greater than 0, calc steering (otherwise return zero vector)
    if (d > 0) {
      // Normalize desired
      desired.normalize();
      // Two options for desired vector magnitude (1 -- based on distance, 2 -- maxspeed)
      if ((slowdown) && (d < 100.0f)) desired.mult(maxspeed*(d/100.0f)); // This damping is somewhat arbitrary
      else desired.mult(maxspeed);
      // Steering = Desired minus Velocity
      steer = PVector.sub(desired,vel);
      steer.limit(maxforce);  // Limit to maximum steering force
    } else {
      steer = new PVector(0,0);
    }
    return steer;
  }
  
*/


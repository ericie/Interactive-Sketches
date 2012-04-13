
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
	this.systemSize = _systemSize;
	this.list = [];
	this.interval = setInterval(randActivate, 1000);  
	var i = 0;
	for(i=0; i < this.systemSize +1; i++){
		this.createParticle();
	}
}
ParticleSystem.prototype.randActivate = function(){
	var actNum = Math.round(Math.random() * this.systemSize);
	//console.log(this);
	//console.log(this.list);
	this.list[actNum].activate();
}
ParticleSystem.prototype.createParticle = function(){
	var newPage = new Page();
	newPage.init();
	this.list.push(newPage);
	
}

ParticleSystem.prototype.update = function(){
	var i = 0;
	for(i = 0; i < this.list.length-1; i++){
		this.list[i].update();
	}
}



var groundPlanes = [
	{y:-420, z:-10, x:1500},
	{y:-380, z:-20, x:1500},
	{y:-340, z:-30, x:1500},
	{y:-300, z:-40, x:1500}
];

var addPage = function(){
	ambientPages.addPage();
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
Page.prototype.update = function(){
	var p = this.plane;
	//function debugAction(_self) {
	var debugAction = function(_self) {
		if (_self.active == true){
			_self.velocity.addSelf( new THREE.Vector3(0,.1,0) );
			p.position.addSelf(_self.velocity);
		}
	}
	
	debugAction(this);

	// Test Offscreen
	
	var screenPos = calc2Dpoint(p.position.x, p.position.y, p.position.z);
	if (screenPos.y > 1080){
		if (upScreen){
			sendMessage(upScreen, this);
		}
		this.randomPos();
	}		

}

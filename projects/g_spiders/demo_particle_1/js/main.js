//main.js
/*
var counter = new SPARKS.SteadyCounter( 500 );
var emitter = new SPARKS.Emitter( counter );

emitter.start();

emitterpos = new THREE.Vector3( 0, 0, 0 );
emitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone ( emitterpos) ) );
emitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
var vector = new THREE.Vector3( 0, -5, 1);
emitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( vector ) ) );

emitter.addAction( new SPARKS.Age() );
emitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
emitter.addAction( new SPARKS.Move() );
emitter.addAction( new SPARKS.RandomDrift( 90, 100, 2000 ) );
*/


var clock = new THREE.Clock();
var container, stats;
var camera, scene, renderer, mesh;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var threexSparks;

// setup Sparks
threexSparks = new THREEx.Sparks({
	maxParticles	: 400,
	counter		: new SPARKS.SteadyCounter(300)
});

// setup the emitter
var emitter	= threexSparks.emitter();

var initColorSize	= function(){
	this.initialize = function( emitter, particle ){
		particle.target.color().setHSV(0.3, 0.9, 0.4);
		particle.target.size(150);
	};
};


if( !init() ){
	animate();
}

function init(){
	if( Detector.webgl ){
		renderer = new THREE.WebGLRenderer({
			antialias		: true,
			preserveDrawingBuffer	: true
		});
		renderer.setClearColor( 0x000000, 1 );
	}else{
		Detector.addGetWebGLMessage();
		return true;
	}
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.getElementById('container').appendChild(renderer.domElement);
	
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(0, 0, 100); 
	camera.lookAt(scene.position);
	scene.add(camera);
	
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed		= 0.1;
	controls.staticMoving		= false;
	controls.dynamicDampingFactor	= 0.3;

	THREEx.WindowResize(renderer, camera);

	// add Stats.js - https://github.com/mrdoob/stats.js
	stats = new Stats();
	stats.domElement.style.position	= 'absolute';
	stats.domElement.style.bottom	= '0px';
	stats.domElement.style.right	= '0px';
	document.body.appendChild( stats.domElement );
			
	var geometry	= new THREE.CylinderGeometry( 5, 5, 20, 32 );
	//var geometry	= new THREE.CubeGeometry( 10, 10, 10 );
	var mesh	= new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
	mesh.position.y	= -10;
	scene.add( mesh );

	startSparks();
}

function startSparks(){
 	//emitter = new SPARKS.Emitter( counter );
	emitter.addInitializer(new initColorSize());
	emitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( new THREE.Vector3(0,0,0) ) ) );
	emitter.addInitializer(new SPARKS.Lifetime(0,0.8));
	emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,250,00))));

	emitter.addAction(new SPARKS.Age());
	emitter.addAction(new SPARKS.Move());
	emitter.addAction(new SPARKS.RandomDrift(1000,0,1000));
	emitter.addAction(new SPARKS.Accelerate(0,-200,0));
}

function animate() {
	requestAnimationFrame( animate );

	render();

	stats.update();
}

function render() {

	controls.update( clock.getDelta() );
	
	threexSparks && threexSparks.update();

	// FIXME this should be INSIDE webgl renderer... bug
	renderer.context.depthMask( true );

	renderer.render( scene, camera );
}
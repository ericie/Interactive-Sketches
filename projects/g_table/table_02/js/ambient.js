//ambient.js

var container, stats;
var camera, scene, projector, renderer;
//var cameraVars;

var cameraVars = function() {
	this.x = 0;
	this.y = -100;
	this.z = 900;
};

init();
animate();

var FizzyText = function() {
  this.message = 'dat.gui';
  this.speed = 0.8;
  this.displayOutline = false;
  //this.explode = function() { ... };
  // Define render logic ...
};

window.onload = function() {
	initGUI();
	/*
  var text = new FizzyText();
  var gui = new dat.GUI();
  gui.add(text, 'message');
  gui.add(text, 'speed', -5, 5);
  gui.add(text, 'displayOutline');
  gui.add(text, 'explode');
  	*/
};

function initGUI(){
	//var text = new FizzyText();
	var cVars = new cameraVars;
	var gui = new dat.GUI();
	var guiController;
	var fCam = gui.addFolder('Camera');
	//gui.add(text, 'message');
	//gui.add(text, 'speed', -5, 5);
	guiCamX = fCam.add(cVars, 'x', -2000, 2000);
	guiCamY = fCam.add(cVars, 'y', -2000, 2000);
	guiCamZ = fCam.add(cVars, 'z', -2000, 2000);

	guiCamX.onChange(function(value) {
		camera.position.x = value;
	});
	guiCamY.onChange(function(value) {
		camera.position.y = value;
	});
	guiCamZ.onChange(function(value) {
		camera.position.z = value;
	});
}

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = 'ambient demo;';
	container.appendChild( info );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	//camera = new THREE.OrthographicCamera(  window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
	camera.position.y = -100;
	camera.position.z = 900;

	scene = new THREE.Scene();

	scene.add( camera );

	var geometry = new THREE.CubeGeometry( 100, 100, 5 );

	for ( var i = 0; i < 20; i ++ ) {

		var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.9 } ) );
		object.position.x = Math.random() * 800 - 400;
		object.position.y = Math.random() * 800 - 400;
		object.position.z = 400;
		object.scale.x = .2; //Math.random() * 2 + 1;
		object.scale.y = .2; //Math.random() * 2 + 1;
		object.scale.z = .2; //Math.random() * 2 + 1;

		// RANDOM EVERYTHING
		/*
		object.position.x = Math.random() * 800 - 400;
		object.position.y = Math.random() * 800 - 400;
		object.position.z = Math.random() * 800 - 400;
		object.scale.x = Math.random() * 2 + 1;
		object.scale.y = Math.random() * 2 + 1;
		object.scale.z = Math.random() * 2 + 1;
		*/

		/*
		object.rotation.x = ( Math.random() * 360 ) * Math.PI / 180;
		object.rotation.y = ( Math.random() * 360 ) * Math.PI / 180;
		object.rotation.z = ( Math.random() * 360 ) * Math.PI / 180;
		*/

		scene.add( object );

	}

	projector = new THREE.Projector();

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild(renderer.domElement);

	stats = new Stats();
	stats.getDomElement().style.position = 'absolute';
	stats.getDomElement().style.left = '0px';
	stats.getDomElement().style.top = '0px';

	document.body.appendChild( stats.getDomElement() );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	
}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
	projector.unprojectVector( vector, camera );

	var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

	var intersects = ray.intersectScene( scene );


	/*
	var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.9 } ) );
		object.position.x = Math.random() * 800 - 400;
		object.position.y = Math.random() * 800 - 400;
		object.position.z = 400;
		object.scale.x = .2; //Math.random() * 2 + 1;
		object.scale.y = .2; //Math.random() * 2 + 1;
		object.scale.z = .2; //Math.random() * 2 + 1;
	*/

	if ( intersects.length > 0 ) {
		console.log(intersects);
		new TWEEN.Tween( intersects[ 0 ].object.scale ).to( {
			z: 100 }, 2000 )
		.easing( TWEEN.Easing.Elastic.EaseOut).start();
	}

	/*
	if ( intersects.length > 0 ) {
		console.log(intersects);
		new TWEEN.Tween( intersects[ 0 ].object.position ).to( {
			x: Math.random() * 800 - 400,
			y: Math.random() * 800 - 400,
			z: Math.random() * 800 - 400 }, 2000 )
		.easing( TWEEN.Easing.Elastic.EaseOut).start();

		new TWEEN.Tween( intersects[ 0 ].object.rotation ).to( {
			x: ( Math.random() * 360 ) * Math.PI / 180,
			y: ( Math.random() * 360 ) * Math.PI / 180,
			z: ( Math.random() * 360 ) * Math.PI / 180 }, 2000 )
		.easing( TWEEN.Easing.Elastic.EaseOut).start();
	}
	*/
}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

var radius = 600;
var theta = 0;

function render() {

	TWEEN.update();

	theta += 0.2;

	//camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
	//camera.position.y = radius * Math.sin( theta * Math.PI / 360 );
	//camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
	//camera.lookAt( scene.position );

	renderer.render( scene, camera );

}



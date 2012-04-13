var screen1, screen2, s1Status, s2Status
var myScreen

$(function() {
	key('1', function(){ openScreen(1) });

	myScreen = 1;

	function openScreen(_num){
		if (_num == 1){
			if (!s1Status){
				screen1 = window.open('index.html','screen1','width=1024,height=800');  
			}
		}

	}

});


var container, stats;
var camera, scene, renderer;
var objects = [];
var w = {};
var geomCube;


init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    w.width = window.innerWidth;
    w.height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(70, w.width / w.height, 1, 10000);
    camera.position.z = 1000;
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0x505050));

    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    light.castShadow = true;

    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;

    light.shadowBias = -0.000222;
    light.shadowDarkness = 0.5;

    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;

    scene.add(light);

    geomCube = new THREE.CubeGeometry(40, 40, 40);

    for (var i = 0; i < 3; i++) {
    	var obj = {};
    	obj.color = Math.random() * 0xffffff;
    	obj.position = {};
		obj.position.x = Math.random() * 1000 - 500;
		obj.position.y = Math.random() * 600 - 300;
		obj.position.z = Math.random() * 800 - 400;

		obj.speed = new THREE.Vector3();
		obj.speed.x = 0;
		obj.speed.y = 0;
		obj.speed.z = 0;

		obj.rotation = {};
		obj.rotation.x = (Math.random() * 360) * Math.PI / 180;
		obj.rotation.y = (Math.random() * 360) * Math.PI / 180;
		obj.rotation.z = (Math.random() * 360) * Math.PI / 180;

		obj.scale = {};
		obj.scale.x = Math.random() * 2 + 1;
		obj.scale.y = Math.random() * 2 + 1;
		obj.scale.z = Math.random() * 2 + 1;

    	addBox(obj);
    }




    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.sortObjects = false;
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    container.appendChild(renderer.domElement);

    // activate Drag Controls
    var dragcontrols = new THREE.DragControls(camera, scene, renderer.domElement);



}

function addBox(_obj){
	var object = new THREE.Mesh(geomCube, new THREE.MeshLambertMaterial({
        color: _obj.color
    }));

	object.baseColor = _obj.color;
    object.material.ambient = object.material.color;

    object.position.x = _obj.position.x;
    object.position.y = _obj.position.y;
    object.position.z = _obj.position.z;

    object.speed = new THREE.Vector3();
    object.speed.x = _obj.speed.x;
    object.speed.y = _obj.speed.y;
    object.speed.z = _obj.speed.z;

    object.rotation.x = _obj.rotation.x;
    object.rotation.y = _obj.rotation.y;
    object.rotation.z = _obj.rotation.z;

    object.scale.x = _obj.scale.x;
    object.scale.y = _obj.scale.y;
    object.scale.z = _obj.scale.z;

    object.castShadow = true;
    object.receiveShadow = true;

    scene.add(object);
    objects.push(object);

}

function mapBox(_obj) {
	var object = {};
	//console.log(_obj.baseColor);
	object.color = _obj.baseColor;
	object.position = {};
	object.position.x = _obj.position.x;
    object.position.y = _obj.position.y;
    object.position.z = _obj.position.z;

    object.speed = new THREE.Vector3();
    object.speed.x = _obj.speed.x;
    object.speed.y = _obj.speed.y;
    object.speed.z = _obj.speed.z;

    object.rotation = {};
    object.rotation.x = _obj.rotation.x;
    object.rotation.y = _obj.rotation.y;
    object.rotation.z = _obj.rotation.z;

	object.scale = {};
    object.scale.x = _obj.scale.x;
    object.scale.y = _obj.scale.y;
    object.scale.z = _obj.scale.z;

    return object;
}

//
function calc2Dpoint(x,y,z) {
    var projector = new THREE.Projector();
    var vector = projector.projectVector( new THREE.Vector3( x, y, z ), camera );

    var result = new Object();
    result.x = Math.round(vector.x * (w.width/2) + w.width/2);
    result.y = Math.round(vector.y * (w.height/2) + w.height/2);

    return result;
}

var offScreen = function(_o){
	console.log( "OFF SCREEN");

	/*
    _o.position.x = 0;
    _o.position.y = 0;
    _o.speed.x = 0;
    _o.speed.y = 0;
    _o.speed.z = 0;
	*/
    


    if (screen1){
    	if (_o.realPos.x > w.width || _o.realPos.x < 0){
			_o.position.x *= -1;
		}
		
		if (_o.realPos.y < 0 || _o.realPos.y > w.height){
			_o.position.y *= -1;
		}
		

	    //_o.position.y = 0;
	    //_o.speed.x = 0;
	    //_o.speed.y = 0;
	    //_o.speed.z = 0;

	    var _oo = mapBox(_o);

	    screen1.postMessage(_oo, window.location.origin); 
	    
	    _o.position.x = 0;
	    _o.position.y = 0;
	    _o.speed.x = 0;
	    _o.speed.y = 0;
	    _o.speed.z = 0;
	    
    } else {
    	/*
    	if (_o.realPos.x > w.width || _o.realPos.x < 0){
			_o.position.x *= -1;
		}
		if (_o.realPos.y < 0 || _o.realPos.y > w.height){
			_o.position.y *= -1;
		}
		*/
    }
}

function receiveMessage(event)  
{  
  // Do we trust the sender of this message?  (might be  
  // different from what we originally opened, for example).  
  //if (event.origin !== "http://example.org")  
  //  return;  
  
  console.log(event);
  var newData = event.data;
  console.log(newData);
  addBox(newData);
  // event.source is popup  
  // event.data is "hi there yourself!  the secret response is: rheeeeet!"  
}  
window.addEventListener("message", receiveMessage, false);  

//
var delayCheck = 100;
function animate() {
    for (var i=0; i<objects.length; i++) {
        // each added object requires a separate WebGL draw call
        //scene.add(createNewObject(objects[i]));
        var o = objects[i];
        o.position.x += o.speed.x;
        o.position.y += o.speed.y;
        o.position.z += o.speed.z;

        o.realPos = calc2Dpoint(o.position.x, o.position.y, o.position.z);
        delayCheck--;
        if (delayCheck <= 0){
        	
	        if (o.realPos.x > w.width || o.realPos.x < 0 || o.realPos.y < 0 || o.realPos.y > w.height){
	            offScreen(o);
	        }
        }
      o.speed.multiplyScalar(.98)
    }
    requestAnimationFrame(animate);
    render();
    //stats.update();
}

//
function render() { 
    renderer.render(scene, camera); 
}
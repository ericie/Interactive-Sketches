function initBoxes(){
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

function boxCheckEdges(){
    for (var i=0; i<objects.length; i++) {
        var o = objects[i];
        o.position.x += o.speed.x;
        o.position.y += o.speed.y;
        o.position.z += o.speed.z;

        
        o.realPos = calc2Dpoint(o.position.x, o.position.y, o.position.z);
        if (delayCheck > 0) delayCheck--;
        if (delayCheck <= 0){
            
            if (o.realPos.x > w.width || o.realPos.x < 0 || o.realPos.y < 0 || o.realPos.y > w.height){
                boxOffScreen(o);
            }
        }
        
      o.speed.multiplyScalar(.98)
    }
}

var boxOffScreen = function(_o){
    if (screen1){
    	if (_o.realPos.x > w.width || _o.realPos.x < 0){
			_o.position.x *= -1;
		}
		
		if (_o.realPos.y < 0 || _o.realPos.y > w.height){
			_o.position.y *= -1;
		}

	    var _oo = mapBox(_o);

	    screen1.postMessage(_oo, window.location.origin); 
	    
	    _o.position.x = 0;
	    _o.position.y = 0;
	    _o.speed.x = 0;
	    _o.speed.y = 0;
	    _o.speed.z = 0;
	    
    } 
}
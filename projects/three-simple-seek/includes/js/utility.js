//
function calc2Dpoint(x,y,z) {
    var projector = new THREE.Projector();
    var vector = projector.projectVector( new THREE.Vector3( x, y, z ), camera );

    var result = new Object();
    result.x = Math.round(vector.x * (w.width/2) + w.width/2);
    result.y = Math.round(vector.y * (w.height/2) + w.height/2);

	//result.x = Math.round(vector.x * (w.width/2) + w.width/2);
    //result.y = Math.round(vector.y * (w.height/2) + w.height/2);

    return result;
}

function rangeNum(_b, _r){
	var n = _b + (Math.random() * _r - Math.random() * _r);
	return n;
}
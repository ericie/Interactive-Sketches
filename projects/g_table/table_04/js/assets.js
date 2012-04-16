
var colors = {
	y1 : [235, 141, 33],
	y2 : [255, 205, 68],
	y3 : [231, 228, 27],
	b1 : [24, 31, 170],
	b2 : [20, 104, 251],
	b3 : [111, 188, 238],
	g1 : [95, 200, 161],
	g2 : [0, 196, 5],
	g3 : [0, 136, 9],
	r1 : [251, 20, 20],
	r2 : [159, 2, 43],
	r3 : [235, 58, 119]
}

// convert 255 colors to 0-1 range
_.each(colors, function(num, key){ 
	 //console.log(colors[key]);
	 var r = colors[key][0] / 255;
	 var g = colors[key][1] / 255;
	 var b = colors[key][2] / 255;
	 colors[key] = [r,g,b];
});


var targets = [
	{ pos: new THREE.Vector3(0, 0, 0), c:0xfff000  },
	{ pos: new THREE.Vector3(120, 100, 0), c:0xfff000 },
	{ pos: new THREE.Vector3(240, 200, 0), c:0xfff000 },
	{ pos: new THREE.Vector3(360, 300, 0), c:0xfff000 }
]

var startTargets = function(){
	//this.color = new THREE.Color( 0xff00ff );
	_.each(targets, function(num, key){ 
		var my = targets[key];
		//var myColor = targets[key].c;
		console.log(my.pos);
		//var np = 
		newPlane(20, 20, 1, my.pos, 0xff00ff);
		//scene.add(ground4);
		//var np
	});

}

var staticPath = "images/";
var ground = {
	layer1: {},
	layer2: {},
	layer3: {},
	layer4: {}
};

var assets = {
	ground1:{
		path: staticPath + "earth-1.png",
		width: 1920,
		height: 256,
		pos: {x:0, y:-640, z:-10}
	},
	ground2:{
		path: staticPath + "earth-1.png",
		width: 1920,
		height: 256,
		pos: {x:0, y:-610, z:-20}
	},
	ground3:{
		path: staticPath + "earth-1.png",
		width: 1920,
		height: 256,
		pos: {x:0, y:-581, z:-30}
	},
	ground4:{
		path: staticPath + "earth-1.png",
		width: 1920,
		height: 256,
		pos: {x:0, y:-560, z:-40}
	}
}

var ground1, ground2, ground3, ground4;
var groundStart = function(_n){
	//var material = new THREE.MeshLambertMaterial({map: assets.bg1 });
	var plane, asset;
	switch(_n)
	{
		case 1:
			plane = ground1;
			asset = assets.ground1;
			break;
		case 2:
			plane = ground2;
			asset = assets.ground2;
			break;
		case 3:
			plane = ground3;
			asset = assets.ground3;
			break;
		case 4:
			plane = ground4;
			asset = assets.ground4;
			break;
		default:
			return;
	}

	var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
		map:THREE.ImageUtils.loadTexture(asset.path)
    });
	plane = new THREE.Mesh(new THREE.PlaneGeometry(asset.width, asset.height),img);
	plane.scale.set(1.35,1.35,1.35);
	console.log(plane);
	plane.position.y = asset.pos.y;
	plane.position.x = asset.pos.x;
	plane.position.z = asset.pos.z;
	
	// TODO: There's got to be something better than 2 switch statements!
	switch(_n)
	{
		case 1:
			ground1 = plane;
			scene.add(ground1);
			break;
		case 2:
			ground2 = plane;
			scene.add(ground2);
			break;
		case 3:
			ground3 = plane;
			scene.add(ground3);
			break;
		case 4:
			ground4 = plane;
			scene.add(ground4);
			break;
		default:
			return;
	}
	
}

var newPlane = function(_h, _w, _s, _p, _c){
	if (!_h) _h = 20;
	if (!_w) _w = 20;
	if (!_s) _s = 1;
	if (!_c) _c = 0xfff000;
	if (!_p) _p = new THREE.Vector3(0, 0, 0);

	mat = new THREE.MeshBasicMaterial();
	mat.color = new THREE.Color( _c );

	var p = new THREE.Mesh(new THREE.PlaneGeometry(_w, _h),mat);
	p.scale.set(_s,_s,_s);
	p.position = _p;

	scene.add(p);

	return p;
}

// TODO: Add a bunch of pages
var questions = [];
var startQuestions = function() {

}



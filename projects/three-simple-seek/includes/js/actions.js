var w = {};
var screen1, screen2, screen3, screen4, s1Status, s2Status
var myScreen, upScreen, downScreen

var container, stats;
var camera, scene, renderer;
var objects = [];
var w = {};

var plane, planeGeom, planeMat;
var targ, targGeom, targMat;
var seekers, targets;

$(function() {
    init();
    animate();
});

/* 
TODO:
-----------------
+ Targets in the screen dimensions
+ Tween Type is changable with dropdown
+ Post to Open.Adapted
+ 
*/

var init = function() {

    container = document.createElement('div');
    document.body.appendChild(container);
    $('div').addClass("fullHeight");
    scene = new THREE.Scene();

    w.width = $("div.fullHeight").width();
    w.height = $("div.fullHeight").height();

    camera = new THREE.PerspectiveCamera(70, w.width / w.height, 1, 10000);
    camera.position.z = 1000;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.sortObjects = false;
    renderer.setSize(w.width, w.height);

    baseObjects();
    container.appendChild(renderer.domElement);

    startGui();
    startTargets();
    startSeekers();
}
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    render();
}

//
function render() { 
    renderer.render(scene, camera); 
}


var seekGui = function() {
  //this.useTweens = false;
  this.newPlane = function() { 
    //alert("Explode");
    var np = {
        width: 30,
        height: 50,
        position: new THREE.Vector3(rangeNum(0,900),rangeNum(0,400),rangeNum(0,400))
    };
    //this.newColor = Math.random() * 0x666666;
    var tempColor = {
        r: Math.random() * .5 + .5,
        g: Math.random() * .5 + .5,
        b: Math.random() * .5 + .5
    }

    var newShape = addPlane(np, planeGeom, planeMat, tempColor);
    //startSeek(newSeeker);
    var newSeeker = new Seeker(newShape);
    //newSeeker.set("Okay");
    newSeeker.target();
  };
  // Define render logic ...
};


startGui = function() {
    var seekGuiPanel = new seekGui();
    var gui = new dat.GUI();
    //var modeSwitch = gui.add(seekGuiPanel, 'useTweens');
    gui.add(seekGuiPanel, 'newPlane');
};

var startTargets = function (){
    targets = [];
    var i = 0;
    for(var i=0; i < 5; i++){
        var np = {
            width: 30,
            height: 50,
            position: new THREE.Vector3(rangeNum(0,w.width*.75),rangeNum(0,w.height*.75),rangeNum(0,400)),
            rotation: 45
        };
        targets.push(addPlane(np, targGeom, targMat));
    }
};

var baseObjects = function(){
    planeMat = new THREE.MeshBasicMaterial();
    planeMat.color = new THREE.Color( Math.random() * 0x666666 );
    planeGeom = new THREE.PlaneGeometry(60, 60);

    targMat = new THREE.MeshBasicMaterial();
    targMat.color = new THREE.Color( 0x111111 );
    targGeom = new THREE.PlaneGeometry(15, 15);
}

var tween1;

var startSeekers = function(){
    console.log("Start Seekers");
    var position = { x : 0, y: 300 };
    var target = { x : 400, y: 50 };
}

var Seeker = function(_shape){
    console.log("New Seeker")
    this.targ = 0;
    this.shape = _shape;
}

var randomTarg = function(){
    var rTarg = targets[ Math.round(Math.random()*(targets.length-1) ) ];
    return rTarg;
}
var animDone = function(_s, _m1, _m2){
   console.log("DONE: "+ _m1);
   //_s.target();
}
Seeker.prototype = {

    constructor: Seeker,

    set: function(_m){
        console.log("SET")
    },
    target: function(){
        var tObj = randomTarg();
        //var t = { x : 0, y: 300, z: 200 };
        var p = { x : this.shape.position.x, y: this.shape.position.y, z: this.shape.position.z };
        var dur = Math.random() * 3000 + 1000;
        tween1 = new TWEEN.Tween( { x: p.x, y: p.y, z:p.z, obj:this } )
        .to( { x: tObj.position.x, y:tObj.position.y, z:tObj.position.z-10 }, dur )
        //.easing( TWEEN.Easing.Sinusoidal.InOut )
        .easing( TWEEN.Easing.Cubic.InOut )
        //.easing( TWEEN.Easing.Elastic.InOut )
        .onComplete( function () { 
            //animDone( this, "myParameter1", "myParameter2" ) 
            this.obj.target();
            //this.target();
        })
        .onUpdate( function () {
            //console.log(this);
            
            this.obj.shape.position.x = this.x;
            this.obj.shape.position.y = this.y;
            this.obj.shape.position.z = this.z;
            
            //output.innerHTML = 'x == ' + Math.round( this.x );
            //target.style.left = this.x + 'px';

        } )
        .start();
    }
}

var addPlane = function(_v, _g, _m, _c){
    var newPlane;
    if (_c){
        planeMat = new THREE.MeshBasicMaterial();
        planeMat.color = new THREE.Color( 0x666666 );
        planeMat.color.setRGB(_c.r, _c.g, _c.b);
        _m = planeMat;
    }

    newPlane = new THREE.Mesh(_g,_m);

    newPlane.width = _v.width;
    newPlane.height = _v.height;
    newPlane.position = _v.position;
    if (_v.rotation){
        newPlane.rotation.z = _v.rotation;
    }
    scene.add(newPlane);
   // console.log(newPlane);
    return newPlane;
}


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
  this.useTweens = false;
  this.newPlane = function() { 
    //alert("Explode");
    var np = {
        width: 30,
        height: 50,
        position: new THREE.Vector3(rangeNum(0,900),rangeNum(0,400),rangeNum(0,400))
    };
    var newShape = addPlane(np, planeGeom, planeMat);
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
  gui.add(seekGuiPanel, 'useTweens');
  gui.add(seekGuiPanel, 'newPlane');
};

var startTargets = function (){
    targets = [];
    var i = 0;
    for(var i=0; i < 5; i++){
        var np = {
            width: 30,
            height: 50,
            position: new THREE.Vector3(rangeNum(0,1900),rangeNum(0,800),rangeNum(0,400))
        };
        targets.push(addPlane(np, targGeom, targMat));
    }
};

var baseObjects = function(){
    planeMat = new THREE.MeshBasicMaterial();
    planeMat.color = new THREE.Color( 0xff00ff );
    planeGeom = new THREE.PlaneGeometry(60, 60);

    targMat = new THREE.MeshBasicMaterial();
    targMat.color = new THREE.Color( 0x000000 );
    targGeom = new THREE.PlaneGeometry(20, 20);
}

var tween1;
console.log(TWEEN);

var startSeekers = function(){
    console.log("Start Seekers");
    var position = { x : 0, y: 300 };
    var target = { x : 400, y: 50 };
    //var target = { x : 400, y: 50 };
    //tween = new TWEEN.Tween(position).to(target, 2000);
    //tween1 = new TWEEN.Tween(position).to({x: 400}, 2000).onUpdate(update).start();
    

}




var Seeker = function(_shape){
    console.log("New Seeker")
    this.targ = 0;
    this.shape = _shape;
}
var randomTarg = function(){
    var rTarg = targets[ Math.round(Math.random()*targets.length-1) ];
    console.log("--- ---");
    console.log(rTarg);
    return rTarg;
    //return {x:rTarg.x, y:rTarg.y, z:rTarg.z}
}
Seeker.prototype = {

    constructor: Seeker,

    set: function(_m){
        console.log("SET")
    },
    target: function(){
        var tObj = randomTarg();
        var t = { x : 0, y: 300, z: 200 };
        var p = { x : this.shape.position.x, y: this.shape.position.y, z: this.shape.position.z };
        tween1 = new TWEEN.Tween( { x: 50, y: 0, z:200, obj:this } )
        .to( { x: tObj.position.x, y:tObj.position.y, z:tObj.position.z }, 2000 )
        .easing( TWEEN.Easing.Elastic.InOut )
        .onUpdate( function () {
            console.log(this);
            
            this.obj.shape.position.x = this.x;
            this.obj.shape.position.y = this.y;
            this.obj.shape.position.z = this.z;
            
            //output.innerHTML = 'x == ' + Math.round( this.x );
            //target.style.left = this.x + 'px';

        } )
        .start();
    }
}

var addPlane = function(_v, _g, _m){
    var newPlane;
    newPlane = new THREE.Mesh(_g,_m);

    newPlane.width = _v.width;
    newPlane.height = _v.height;
    newPlane.position = _v.position;
    scene.add(newPlane);
   // console.log(newPlane);
    return newPlane;
}


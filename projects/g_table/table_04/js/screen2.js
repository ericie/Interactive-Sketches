var screen1, screen2, s1Status, s2Status
var myScreen

$(function() {
    key('shift+1', function(){ openScreen(1) });
    key('1', function(){ loadScreen(1) });
    key('2', function(){ loadScreen(2) });
    
    myScreen = 2;
    loadScreen(myScreen);
});

var container, stats;
var camera, scene, renderer;
var objects = [];
var w = {};
var geomCube;


$(function() {
    init();
    animate();
});

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

    // Start Boxes
    // initBoxes();


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
    
    // Load Some Assets
    /*
    groundStart(1);
    groundStart(2);
    groundStart(3);
    groundStart(4);

    // Put in some Pages
    initParticleSystems();
    */
}

function receiveMessage(event)  
{  
  console.log(event);
  var newData = event.data;
  console.log(newData);


  addBox(newData);
}  
window.addEventListener("message", receiveMessage, false);

//
var delayCheck = 100;
function animate() {
    //ambientPages.update();

    boxCheckEdges()
    requestAnimationFrame(animate);
    render();

}

//
function render() { 
    renderer.render(scene, camera); 
}
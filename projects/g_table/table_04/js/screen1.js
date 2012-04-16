var screen1, screen2, screen3, screen4, s1Status, s2Status
var myScreen, upScreen, downScreen

$(function() {
	key('shift+1', function(){ openScreen(1) });
    //key('1', function(){ loadScreen(1) });
    //key('2', function(){ loadScreen(2) });

	myScreen = gScreen;
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
    $('div').addClass("fullHeight");
    scene = new THREE.Scene();

    //w.width = window.innerWidth;
    //w.height = window.innerHeight;
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

    container.appendChild(renderer.domElement);

    // activate Drag Controls
    var dragcontrols = new THREE.DragControls(camera, scene, renderer.domElement);

    // Start Boxes
    // initBoxes();

    switch(myScreen)
    {
        case 1:
            startScreen1();
            upScreen = screen2;
            break;
        case 2:
            startScreen2();
            upScreen = screen3;
            downScreen = screen4;
            break;
    }
    

    // TODO: Swap body.classes depending on screen
    
}

function startScreen1(){
    // Load Some Assets
    groundStart(1);
    groundStart(2);
    groundStart(3);
    groundStart(4);

    startTargets();
    
    loadScreen(1);

    // Put in some Pages
    initParticleSystems(50);
}

function startScreen2(){
    loadScreen(2);
    initParticleSystems(0);
}

//
var delayCheck = 100;
function animate() {
    ambientPages.update();

    boxCheckEdges()
    requestAnimationFrame(animate);
    render();
    //stats.update();
}

//
function render() { 
    renderer.render(scene, camera); 
}
/*
 * @author zz85
 */
THREE.DragControls = function(_camera, _objects, _domElement) {

    if (_objects instanceof THREE.Scene) {
        _objects = _objects.children;
    }
    var _projector = new THREE.Projector();

    var _mouse = new THREE.Vector3(),
        _offset = new THREE.Vector3();
    var _selected;

    _domElement.addEventListener('mousemove', onDocumentMouseMove, false);
    _domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    _domElement.addEventListener('mouseup', onDocumentMouseUp, false);

    function onDocumentMouseMove(event) {

        event.preventDefault();

        _mouse.x = (event.clientX / _domElement.width) * 2 - 1;
        _mouse.y = -(event.clientY / _domElement.height) * 2 + 1;

        var ray = _projector.pickingRay(_mouse, _camera);
        
        if (_selected) {
            var targetPos = ray.direction.clone().multiplyScalar(_selected.distance).addSelf(ray.origin);
            


            var oldPos = _selected.object.position;

            //console.log(targetPos.x);
            //console.log(oldPos);
            console.log(calc2Dpoint(oldPos.x, oldPos.y, oldPos.z));

            var _speeds = new THREE.Vector3().sub(targetPos,oldPos);//delta vector
            _speeds.z = 0;


            //_speeds.sub(targetPos, oldPos);
            //console.log(_speeds);

            _selected.object.speed = _speeds;

            return;

        }

        var intersects = ray.intersectObjects(_objects);

        if (intersects.length > 0) {

            _domElement.style.cursor = 'pointer';

        } else {

            _domElement.style.cursor = 'auto';

        }

    }

    function onDocumentMouseDown(event) {

        event.preventDefault();

        _mouse.x = (event.clientX / _domElement.width) * 2 - 1;
        _mouse.y = -(event.clientY / _domElement.height) * 2 + 1;

        var ray = _projector.pickingRay(_mouse, _camera);
        var intersects = ray.intersectObjects(_objects);

        if (intersects.length > 0) {
            _selected = intersects[0];

            _offset.copy(_selected.point).subSelf(_selected.object.position);

            _domElement.style.cursor = 'move';

        }


    }

    function onDocumentMouseUp(event) {

        event.preventDefault();

        if (_selected) {
            _selected = null;
        }

        _domElement.style.cursor = 'auto';

    }

}

var container, stats;
var camera, scene, renderer;
var objects = [];
var w = {};

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

    var geometry = new THREE.CubeGeometry(40, 40, 40);

    for (var i = 0; i < 3; i++) {

        var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff
        }));

        object.material.ambient = object.material.color;

        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600 - 300;
        object.position.z = Math.random() * 800 - 400;

        object.speed = new THREE.Vector3();
        object.speed.x = 0;
        object.speed.y = 0;
        object.speed.z = 0;

        object.rotation.x = (Math.random() * 360) * Math.PI / 180;
        object.rotation.y = (Math.random() * 360) * Math.PI / 180;
        object.rotation.z = (Math.random() * 360) * Math.PI / 180;

        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;

        object.castShadow = true;
        object.receiveShadow = true;

        scene.add(object);

        objects.push(object);

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


//
function calc2Dpoint(x,y,z) {
    var projector = new THREE.Projector();
    var vector = projector.projectVector( new THREE.Vector3( x, y, z ), camera );

    var result = new Object();
    result.x = Math.round(vector.x * (w.width/2) + w.width/2);
    result.y = Math.round(vector.y * (w.height/2) + w.height/2);

    return result;
}


//
function animate() {
    for (var i=0; i<objects.length; i++) {
        // each added object requires a separate WebGL draw call
        //scene.add(createNewObject(objects[i]));
        var o = objects[i];
        o.position.x += o.speed.x;
        o.position.y += o.speed.y;
        o.position.z += o.speed.z;

        o.realPos = calc2Dpoint(o.position.x, o.position.y, o.position.z);

        
        if (o.realPos.x > w.width || o.realPos.x < 0 || o.realPos.y < 0 || o.realPos.y > w.height){
            o.position.x = 0;
            o.position.y = 0;
            o.speed.x = 0;
            o.speed.y = 0;
            o.speed.z = 0;
        }
        
        //if ()
        //if (i == 0){
            //console.log(calc2Dpoint(o.position.x, o.position.y, o.position.z).x);
        //}
        
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



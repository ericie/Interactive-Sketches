//alert("YES!");

function initGui(){
	var gui = new dat.GUI();

	var f1 = gui.addFolder('Flow Field');
	f1.add(text, 'speed');
	f1.add(text, 'noiseStrength');

	var f2 = gui.addFolder('Letters');
	f2.add(text, 'growthSpeed');
	f2.add(text, 'maxSize');
	f2.add(text, 'message');

	f2.open();

}

$(function() {
	initGui();
});

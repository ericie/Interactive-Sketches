console.log("Loaded Plain Text Example");

require(["eelib/main", "eelib/text", "js/lib/zepto.js"], function(util) {
	// console.log("Ready.");
});

function init() {
	console.log("INIT");
}

var tX = 20, tY = 60;
function draw() {
	//console.log("draw");

	writeText({
		text:"Some Text Here", 
		x:tX,
		y:tY,
		color:"rgba(255,255,0,1)"
	});

	writeText({
		text:"Bloody Text", 
		x:tX,
		y:140,
		size: "60px",
		font: "Holtwood One SC"
	});

	writeText({
		text:"Even more text", 
		x:tX,
		y:200,
		size: "60px",
		font: "Bevan"
	});

	writeText({
		text:"Even more text", 
		x:tX,
		y:260,
		size: "60px",
		font: "EB Garamond"
	});

}
console.log("EE: Main Lib loaded.");

// Global Configs
var eeAnimated, eeShapes, ee2d;

eeAnimated = true;
eeShapes = true;
ee2d = true;


// Global Drawing Vars
var g, c, bg;


require(["eelib/main"], function(util) {

	init();
	
    if (eeAnimated == true){
		require(["eelib/animation"]);
	}

	if (eeShapes == true){
		require(["eelib/shapes"]);
	}

	if (ee2d == true){
		var canvasDom = document.getElementById("canvas");
		g = {
			context : canvasDom.getContext('2d'),
			height : window.innerHeight,
			width : window.innerWidth,
			trails : false,
			clear : true,
			bg : bg
		}

		c = g.context;
		canvasDom.width = g.width;
		canvasDom.height = g.height;
	}

});

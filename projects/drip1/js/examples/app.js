
var COLOURS = [ '#60F0C0', '#FF360E', '#F0D442' ];
var radius = 0;
var bufferCanvas, bufferCanvasCtx;

var drips = [];
var d1;

var demo = Sketch.create({

	container: document.getElementById( 'container' ),
	autoclear: false,

	setup: function() {
		console.log( 'setup' );

		//d1 = new Drop(demo);
		//d1.init("INIT");

		for (var i = 200; i >= 0; i--) {
			var newD = new Drop(demo);
			drips.push(newD);
		};

		//Buffer Canvas
        bufferCanvas = document.createElement("canvas");
        bufferCanvasCtx = bufferCanvas.getContext("2d");
        bufferCanvasCtx.canvas.width = demo.canvas.width;
        bufferCanvasCtx.canvas.height = demo.canvas.height;
	},

	update: function() {
		//radius = 2 + Math.abs( Math.sin( demo.millis * 0.003 ) * 50 );
		//d1.update();
		for (var i = drips.length - 1; i >= 0; i--) {
			drips[i].update();
		};
	},

	// Event handlers

	keydown: function() {
		if ( demo.keys.C ) demo.clear();
	},

	// Mouse & touch events are merged, so handling touch events by default
	// and powering sketches using the touches array is recommended for easy
	// scalability. If you only need to handle the mouse / desktop browsers,
	// use the 0th touch element and you get wider device support for free.
	touchmove: function( e ) {
		/*
		for ( var i = demo.touches.length - 1, touch; i >= 0; i-- ) {

			touch = demo.touches[i];

			demo.lineCap = 'round';
			demo.lineJoin = 'round';
			demo.fillStyle = demo.strokeStyle = COLOURS[ i % COLOURS.length ];
			demo.lineWidth = radius;

			demo.beginPath();
			demo.moveTo( touch.ox, touch.oy );
			demo.lineTo( touch.x, touch.y );
			demo.stroke();
		}*/
	}
});

demo.start();
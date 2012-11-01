
var COLOURS = [ '#60F0C0', '#FF360E', '#F0D442' ];
var radius = 0;
var buffer, bufferCtx, imageBuffer;

var drips = [];
var d1;
var terrain;
var demoCTX;

var demo = Sketch.create({

	container: document.getElementById( 'container' ),
	autoclear: false,

	setup: function() {
		console.log( 'setup' );

		//d1 = new Drop(demo);
		//d1.init("INIT");

		//Buffer Canvas
        buffer = document.createElement("canvas");
        bufferCtx = buffer.getContext("2d");
        bufferCtx.canvas.width = demo.canvas.width;
        bufferCtx.canvas.height = demo.canvas.height;
        
  		// bufferCtx.shadowOffsetX = 4;
		// bufferCtx.shadowOffsetY = 4;
		// bufferCtx.shadowBlur = 20;
		// bufferCtx.shadowColor = "rgba(0,0,0,.25)";

        //demoCtx = demo.getContext("2d");

        imageBuffer = new Image(demo.canvas.width, demo.canvas.height);

		for (var i = 30; i >= 0; i--) {
			//var newD = new Drop(demo);
			var newD = new Drop(bufferCtx);
			drips.push(newD);
		};

        //this.drawTerrain();
	},

	drawTerrain: function(){
		terrain = new Terrain(demo, 100);
		terrain.init();
	},

	renderBuffer: function(){
		// imageBuffer.src = buffer.toDataURL();
		// demo.shadowOffsetX = 4;
		// demo.shadowOffsetY = 4;
		// demo.shadowBlur = 10;
		// demo.shadowColor = "rgba(0,0,0,.55)";


		//this.c.drawImage(this.buffer, 0, 0);
		//boxBlurCanvasRGBA( buffer, bufferCtx, 0, 0, bufferCtx.canvas.width, bufferCtx.canvas.height, 20, 0 );

		demo.drawImage(buffer, 0, 0);
	},

	update: function() {
		//radius = 2 + Math.abs( Math.sin( demo.millis * 0.003 ) * 50 );
		//d1.update();
		demo.clearRect(0,0,demo.canvas.width,demo.canvas.height);
		bufferCtx.clearRect(0,0,demo.canvas.width,demo.canvas.height);

		for (var i = drips.length - 1; i >= 0; i--) {
			var dripGraphic = drips[i].update();
			//console.log(dripGraphic);

			bufferCtx.drawImage(dripGraphic, 0, 0);

		};

		this.renderBuffer();
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
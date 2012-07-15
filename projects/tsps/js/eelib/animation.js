console.log("EE: Animation Loaded")

require(["js/eelib/animation.raf-polyfill.js"], function(){

	function animate() {
		//console.log("ANIMATE");

		/*
		if (g.clear){
			if (!g.bg){
				g.context.clearRect(0, 0, g.width, g.width);
			} else {
				clear()
			}
		}
		*/
		
	    requestAnimationFrame( animate );
	    draw();
	}

	animate();
});

// Make clear function available globally

var clear = function() {
	var context = g.context;
	context.fillStyle = g.bg;
	context.beginPath();
	context.rect(0,0, g.width, g.width);
	context.closePath();
	context.fill();
}



/*
function fade() {
  ctx.fillStyle = "rgba(255, 255, 255, "+fadeRate+")"
  ctx.beginPath();
  ctx.rect(0,0,WIDTH,HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function wipe() {
  ctx.fillStyle = "rgba(255, 255, 255, 1)"
  ctx.beginPath();
  ctx.rect(0,0,WIDTH,HEIGHT);
  ctx.closePath();
  ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
*/
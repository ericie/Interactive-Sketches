var width, height, pathHeight, center;

var points = 4;
var count = 0;
var smooth = false;

var pad = 20;
var proxLimit = 100;
var passPoint;

var retainPath = new Path();
retainPath.fillColor = 'pink';

var path = new Path();
path.fillColor = 'gray';

initializePath();




function addPoint(xx, yy){
	console.log(Date.now());
	var point = new Point( 40, 40 );
	path.add(point);
	//path.segments[i]._point._y = myY;
	console.log(path.segments[i]);
}

function initializePath() {
	center = document.bounds.center;
	width = document.bounds.width - pad*2;
	height = document.bounds.height - pad*2;
	//path = new Path();
	path.segments = [];
	retainPath.segments = [];
	//path.add(document.bounds.topLeft);
	
	var i;
	
	// Top Line
	var topPoints = 2;
	for (i = 1; i < topPoints; i++) {		
		var myX = Math.round( ((width / topPoints) * i) + pad );
		var myY = Math.round(pad);
		console.log(i);

		var point = new Point( myX, myY );
		path.add(point);
	}
	
	// Side
	var sidePoints = 6;
	for (i = 0; i <= sidePoints; i++) {
		myX = Math.round( width + pad );
		myY = Math.round( height / sidePoints * i + pad );
		point = new Point( myX, myY);
		path.add(point);
	}
	
	// Bottom Line
	//var botPoints = 3;
	for (i = 1; i < topPoints; i++) {
		myX = Math.round( (width  + pad) - (width / topPoints * i) );
		myY = Math.round( height + pad );
		point = new Point( myX, myY);
		path.add(point);
	}
	
	// Left Side
	for (i = 0; i <= sidePoints; i++) {
		myX = Math.round( pad );
		myY = Math.round( (height + pad) - (height / sidePoints * i) );
		point = new Point( myX, myY );
		path.add(point);
	}
	
	//path.add(document.bounds.bottomRight);
	retainPath.segments = path.segments;
	path.selected = true;
}

function onFrame() {
	/*
	count++;
	for (var i = 1; i < points; i++) {
		var sinSeed = count + (i + i % 10) * 100 ;
		var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
		path.segments[i].point.y = yPos;
	}
	*/
	//console.log('onfFrame');
	
	if (smooth)
		path.smooth();

}

function onMouseMove(event) {
	//pathHeight = center.y - event.point.y;
	//pathHeight = height;//center.y - event.point.y;

	//console.log(path.segments.length);
	var maxI = path.segments.length;;
	for (var i = 0; i < maxI; i++) {
		var tempX = path.segments[i]._point._x;
		var tempY = path.segments[i]._point._y;
		//var mX = event.x;
		var dist = checkDistance(tempX, event.point.x, tempY, event.point.y);
		if (dist < proxLimit){
			console.log(i);
			var targX = event.point.x;
			var targY = event.point.y;
			var movedX = retainPath.segments[i]._point._x;
			var movedY = retainPath.segments[i]._point._y;
			var anim = false;
			
			if ( checkDistance(movedX, targX, movedY, targY) < 100 ){
				anim = true
			}
			
			// if we're cleared to animate go towards target otherwise return to origin.
			if ( anim = true ){
				path.segments[i]._point._x = event.point.x;
				path.segments[i]._point._y = event.point.y;
			} else {
				path.segments[i]._point._x = movedX;
				path.segments[i]._point._y = movedY;
			}
		}
		//console.log(dist);
	}
}

function checkDistance(_x1, _x2, _y1, _y2){
	var d, dx, dy;
	d = Math.sqrt( Math.pow((_x1-_x2),2) + Math.pow((_y1-_y2),2) );
	return d;
}

function onMouseDown(event) {
	smooth = !smooth;
	if (!smooth) {
		// If smooth has been turned off, we need to reset
		// the handles of the path:
		for (var i = 0, l = path.segments.length; i < l; i++) {
			var segment = path.segments[i];
			segment.handleIn = segment.handleOut = null;
		}
	}
}

// Reposition the path whenever the window is resized:
DomEvent.add(window, {
	resize: function(event) {
		initializePath();
		//onFrame();
		document.redraw();
	}
});
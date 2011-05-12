var width, height, pathHeight, center;

var points = 4;
var count = 0;
var smooth = false;

var pad = 20;
var proxLimit = 100;
var passPoint;
var mX = 0;
var mY = 0;

var mid = canvas.width / 2;
var topPoints = 1;
var sidePoints = 6;
	
var speeds = [];
var retainPath = new Path();
//retainPath.fillColor = 'pink';

var path = new Path();
var hLength = 10;
path.fillColor = '#ffffff';



initializePath();


function addPoint(xx, yy){
	var point = new Point( 40, 40 );
	path.add(point);
	//path.segments[i]._point._y = myY;
}

function initializePath() {
	
	center = document.bounds.center;
	width = document.bounds.width - pad*2;
	height = document.bounds.height + 600;// - pad*2;
	//path = new Path();
	path.segments = [];
	retainPath.segments = [];
	speeds = [];
	
	//path.add(document.bounds.topLeft);
	
	var i;
	
	// Top Line
	/*
	for (i = 1; i < topPoints; i++) {		
		var myX = Math.round( ((width / topPoints) * i) + pad );
		var myY = Math.round(pad);

		var point = new Point( myX, myY );
		path.add(point);
		speeds.push([0,0]);
	}*/
	
	// Side
	for (i = 0; i <= sidePoints; i++) {
		myX = Math.round( width + pad );
		myY = Math.round( height / sidePoints * i + pad );
		point = new Point( myX, myY);
		path.add(point);
		path.segments[i].handleIn.set(0, -hLength);
		path.segments[i].handleOut.set(0, hLength);
		speeds.push([0,0]);
	}
	
	// Bottom Line
	//var botPoints = 3;
	/*
	for (i = 1; i < topPoints; i++) {
		myX = Math.round( (width  + pad) - (width / topPoints * i) );
		myY = Math.round( height + pad );
		point = new Point( myX, myY);
		path.add(point);
		speeds.push([0,0]);
	}*/
	
	// Left Side
	for (i = 0; i <= sidePoints; i++) {
		myX = Math.round( pad );
		myY = Math.round( (height + pad) - (height / sidePoints * i) );
		point = new Point( myX, myY );
		path.add(point);
		speeds.push([0,0]);
	}
	
	//path.add(document.bounds.bottomRight);
	retainPath.segments = path.segments;
	//path.selected = true;
}

function onFrame() {
	
	var maxI = path.segments.length;
	for (var i = 0; i < maxI; i++) {
		if (i != 0 && i != sidePoints && i != sidePoints + 1 && i != sidePoints * 2 + 1  ){
		var tempX = path.segments[i]._point._x;
		var tempY = path.segments[i]._point._y;
		//var mX = event.x;
		//var dist = checkDistance(tempX, event.point.x, tempY, event.point.y);
		//if (dist < proxLimit){
			//console.log(i);
			var targX = mX;
			var targY = mY;
			var originX = retainPath.segments[i]._point._x;
			var originY = retainPath.segments[i]._point._y;
			var anim = false;
			var limitDist = 100;
			
			
			if ( checkDistance(originX, targX, originY, targY) < limitDist ){
				anim = true
			}
			
			// if we're cleared to animate go towards target otherwise return to origin.
			var targSpeed;
			var speedX;
			var speedY;
			var modifier = (originX > mid) ? 1 : -1;
										
			if ( anim == true ){
				//if (originX > mid){ 
				//	modifier

				targX = originX - (mX - ((originX - limitDist) * modifier)) + pad;
				speedX = ease(path.segments[i]._point._x, targX, speeds[i][0]);
				speedY = ease(path.segments[i]._point._y, mY, speeds[i][1]) / 2;
				speeds[i] = [speedX,speedY];
				path.segments[i]._point._x += speedX;
				path.segments[i]._point._y += speedY;
			} else {
				speedX = ease(path.segments[i]._point._x, originX, speeds[i][0]);
				speedY = ease(path.segments[i]._point._y, originY, speeds[i][1]);
				speeds[i] = [speedX,speedY];
				path.segments[i]._point._x += speedX;
				path.segments[i]._point._y += speedY;
			}
			
			//console.log(modifier);
			var myHandleLength = (originX - path.segments[i]._point._x) * modifier;
			var minHandle = 25;
			var maxHandle = 220;
			if (myHandleLength < minHandle) myHandleLength = minHandle;
			if (myHandleLength > maxHandle) myHandleLength = maxHandle;

			path.segments[i].handleIn.set(0, -myHandleLength * modifier);
			path.segments[i].handleOut.set(0, myHandleLength * modifier);
				
		//}
		//console.log(dist);
		}
	}
	
	/*
	if (smooth)
		path.smooth();
	*/
	
}



function onMouseMove(event) {
	//pathHeight = center.y - event.point.y;
	//pathHeight = height;//center.y - event.point.y;
	mX = event.point.x;
	mY = event.point.y;
	
}

function ease(_cur, _targ, _curSpeed){
	var targSpeed = (_targ - _cur) / 5;
	var curSpeed = _curSpeed;//speeds[_i];
	var newSpeed = 0;
	if (Math.abs(targSpeed) > Math.abs(curSpeed)) {
		// add speed
		if (targSpeed > 0){
			newSpeed = curSpeed + .5;
		} else {
			newSpeed = curSpeed - .5;		
		}
	} else {
		newSpeed = targSpeed;
	}
	//speeds[_i] = newSpeed;
	return newSpeed;
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


/////////////
// External Content Show

function showContent(_i){
	console.log(_i);
}
var width, height, pathHeight, center;

var points = 4;
var count = 0;
var smooth = true;
var path = new Path();
path.fillColor = 'black';
initializePath();

function initializePath() {
	center = document.bounds.center;
	width = document.bounds.width;
	height = document.bounds.height / 2;
	path.segments = [];
	path.add(document.bounds.bottomLeft);
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
	path.add(document.bounds.bottomRight);
	path.selected = true;
}

function onFrame() {
	count++;
	for (var i = 1; i < points; i++) {
		var sinSeed = count + (i + i % 10) * 100 ;
		var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
		path.segments[i].point.y = yPos;
	}
	if (smooth)
		path.smooth();
}

function onMouseMove(event) {
	pathHeight = center.y - event.point.y;
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
		onFrame();
		document.redraw();
	}
});
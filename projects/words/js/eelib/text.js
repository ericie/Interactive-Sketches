var writeText = function(_p){
	var tFont, tSize, tColor, tString, tX, tY;

	// Use Supplied font or default
	if (_p.font) {
		tFont = _p.font;
	} else {
		tFont = textFont;
	};

	// Use Supplied font or default
	if (_p.size) {
		tSize = _p.size;
	} else {
		tSize = textSize;
	};

	// Use Supplied font or default
	if (_p.color) {
		tColor = _p.color;
	} else {
		tColor = textColor;
	};

	// Make sure there was a string!
	if (_p.text) {
		tString = _p.text;
	} else {
		tString = "No text sent :(";
	};

	// Check for X
	if (_p.x) {
		tX = _p.x;
	} else {
		tX = 0;
	};

	// Check for Y
	if (_p.y) {
		tY = _p.y;
	} else {
		tY = 0;
	};

	// Write the String to our canvas
	c.fillStyle = tColor;
	c.font = tSize + " " + tFont;
    c.fillText(tString, tX, tY);
}

// Global textDefaults
var textFont = "Helvetica";
var textSize = "24px";
var textColor = "rgba(255,255,255,1)";
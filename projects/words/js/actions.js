console.log("Loaded Actions.");

//require(["eelib/main", "eelib/text", "js/lib/zepto.js"], function(util) {
require(["eelib/main", "eelib/text", "js/lib/jquery-1.7.1.min.js"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});


var socket;
var TSPSObjects = [];

var vid_width		= 640;
var vid_height		= 480;

var tsps;


function init() {
	console.log("INIT");
	bg = "rgba(50, 0, 50, 1)";

	tsps = new TSPS.Connection();
	tsps.connect();
	//tsps.onConnectionOpened = function(){ console.log("hey")};
	//tsps.onConnectionClosed = function(){ console.log("uh oh")};

}

var tX = 20, tY = 60;

function draw() {
	//console.log("draw");
	//console.log(tsps.people);

	writeText({
		text:"A message for you.", 
		x:tX,
		y:200,
		size: "60px",
		font: "Bevan"
	});


	// Check for px colors
	// Get the CanvasPixelArray from the given coordinates and dimensions.


	
	var imgd = c.getImageData(20, 60, 600, 300);
	var pix = imgd.data;

	// Loop over each pixel and invert the color.
	for (var i = 0, n = pix.length; i < n; i += 4) {
		
		//Invert color of dection area
	    pix[i  ] = 255 - pix[i  ]; // red
	    pix[i+1] = 255 - pix[i+1]; // green
	    pix[i+2] = 255 - pix[i+2]; // blue
	    // i+3 is alpha (the fourth element)
	   
	    //console.log(n % 10);
	    if (i % 8 == 0){
		    if ( pix[i] != 50 || pix[i+1] != 0 || pix[i+2] != 50 ) {
		    	//console.log(pix[i]);
		    	pix[i  ] = 0; // red
			    pix[i+1] = 155; // green
			    pix[i+2] = 255; // blue
		    }
		}
	}

	//Uncomment next line to see dection area then uncomment next line to see it
	c.putImageData(imgd, 20, 60);

	//TODO: Make an array or points
	//TODO: clear();

	//TODO: Place particles

	
	/*

	// Shape Example
	c.fillStyle = "rgba(0, 255, 255, .5)"
	circle(200, 200, 200);

	c.fillStyle = "rgba(255, 255, 0, .5)"
	rect(200, 200, 100);

	c.fillStyle = "rgba(100, 255, 100, .5)"
	triangle(250, 250, 200, 100);

	c.fillStyle = "rgba(100, 155, 155, .5)"
	rTriangle(250, 250, 200, 200);
	*/
}
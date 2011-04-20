// Global vars
var windowWidth, windowHeight, pageWidth, pageHeight;

/*
$(document).ready(function() {
	
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	pageHeight = $("#page").height();
	pageWidth = $("#page").width();
	
	setUpPage2();
});
*/

window.onload = function () {
	setUpPage2();
};

function setUpPage2() {
    var W = 640,
        H = 480,
        r = Raphael("pageBackground", W, H),
        values = [],
        // let's us know if it's a vertical box
        vert = true,
        // len defines how many points in the line
        len = 4;
    for (var i = len; i--;) {
    	// push the starting Y value.. it's a percentage of total height
        values.push(200*i );
    }
    
    function translate(x, y) {
    	if (vert != true){
	    	return [
	            50 + (W - 60) / (values.length - 1) * x,
	            H - 10 - (H - 20) / 100 * y
	        ];
    	} else {
    		return [
	            50,
	            y
	        ];
    	}
        
    }
    
    
    
    function getSimpleAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
    	var d = 100;
    	
    	var dx1 = 0,
    	dx2 = 0,
    	dy1 = d,
    	dy2 = -1 * d;
    	
        return {
            x1: p2x - dx1,
            y1: p2y + dy1,
            x2: p2x + dx2,
            y2: p2y + dy2
        };
    }
    
    /*
      function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
        var l1 = (p2x - p1x) / 2,
            l2 = (p3x - p2x) / 2,
            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
        a = p1y < p2y ? Math.PI - a : a;
        b = p3y < p2y ? Math.PI - b : b;
        var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
            dx1 = l1 * Math.sin(alpha + a),
            dy1 = l1 * Math.cos(alpha + a),
            dx2 = l2 * Math.sin(alpha + b),
            dy2 = l2 * Math.cos(alpha + b);
        return {
            x1: p2x - dx1,
            y1: p2y + dy1,
            x2: p2x + dx2,
            y2: p2y + dy2
        };
    }
    */
     
    // TODO: Figure out the anchor handles
    function drawPath() {
        for (var j = 0, jj = X.length - 1; j < jj; j++) {
            if (j) {
                //var a = getAnchors(X[j - 1], Y[j - 1], X[j], Y[j], X[j + 1], Y[j + 1]);
            	// Path Handles
            	var hDist = 80;//(Y[0] - Y[1])*.80;  	// Handle Distance
            	var hC = [ X[j], Y[j] ];		// Handle Center
            	//console.log(hDist + "  hC:"+hC);
            	var a = getSimpleAnchors( hC[0] , hC[1] - hDist, hC[0] , hC[1], hC[0] , hC[1] + hDist);
            	
                //p = p.concat([a.x1, a.y1, X[j], Y[j], a.x2, a.y2]);
            	p = p.concat([a.x1, a.y1, X[j], Y[j], a.x2, a.y2]);
            	
            } else {
                p = ["M", X[j], Y[j], "C", X[j], Y[j]];
            }
        }
        
        p = p.concat([X[jj], Y[jj], X[jj], Y[jj]]);
        

        
        var subaddon = "L" + (W - 10) + "," + (10) + ",L" + (W - 10) + "," + (100) + "z";
        path.attr({path: p});
        sub.attr({path: p + subaddon});
        
        /*
        var xx = Math.random() * 200;
        var circle = r.circle(xx, 40, 10);
        // Sets the fill attribute of the circle to red (#f00)
        circle.attr("fill", "#f00");

        // Sets the stroke attribute of the circle to white
        circle.attr("stroke", "#fff");
        */
    }
    
    var p = [["M"].concat(translate(0, values[0]))],
        color = "rgba(255, 255, 255, 255)",
        X = [],
        Y = [],
        blankets = r.set(),
        buttons = r.set(),
        w = (W - 60) / values.length,
        isDrag = -1,
        start = null,
        sub = r.path().attr({stroke: "none", fill: color}),
        path = r.path().attr({stroke: color, "stroke-width": 2}),
        unhighlight = function () {};
    var ii;
    
    for (i = 0, ii = values.length - 1; i < ii; i++) {
        var xy = translate(i, values[i]),
            xy1 = translate(i + 1, i + 1),
            f;
        X[i] = xy[0];
        Y[i] = xy[1];
        (f = function (i, xy) {
            buttons.push(r.circle(xy[0], xy[1], 5).attr({fill: color, stroke: "none"}));
            blankets.push(r.circle(xy[0], xy[1], w / 2).attr({stroke: "none", fill: "#fff", opacity: 0}).mouseover(function () {
            	//console.load("okay");
                if (isDrag + 1) {
                    unhighlight = function () {};
                } else {
                    buttons.items[i].animate({r: 10}, 200);
                }
            }).mouseout(function () {
                if (isDrag + 1) {
                    unhighlight = function () {
                        buttons.items[i].animate({r: 5}, 200);
                    };
                } else {
                    buttons.items[i].animate({r: 5}, 200);
                }
            }).drag(function (dx, dy) {
                var start = this.start;
                var myX = start.i + dx;
                var myY = start.p;// + dy;
                
                xy1 = [myX,myY];
                X[i] = myX;
                Y[i] = myY;
                
                start && update(start.i, myX, myY);
                //start && update(start.i + dx, start.p);
                
            }, function (x, y) {
                this.start = {i: i, m: y, p: Y[i]};
            }));
            blankets.items[blankets.items.length - 1].node.style.cursor = "move";
        })(i, xy);
        
        if (i == ii - 1) {
            f(i + 1, xy1);
        }
    }
    xy = translate(ii, ii);
    X.push(xy[0]);
    Y.push(xy[1]);
    
    drawPath();
    var update = function (i, d, y) {
        (d > H - 10) && (d = H - 10);
        (d < 10) && (d = 10);
        //Y[i] = d;
        X[i] = d;
        drawPath();
        //buttons.items[i].attr({cy: d});
        //blankets.items[i].attr({cy: d});
        buttons.items[i].attr({cx: d});
        blankets.items[i].attr({cx: d});
        
        r.safari();
    };
};

/*

function setUpPage() {
// Each of the following examples create a canvas that is 320px wide by 200px high
// Canvas is created at the viewportÕs 10,50 coordinate
//var paper = Raphael(0, 0, 320, 200);
// Canvas is created at the top left corner of the #notepad element
// (or its top right corner in dir="rtl" elements)
//var paper = Raphael(document.getElementById("pageBackground"), pageWidth, pageHeight);
// Same as above
//var paper = Raphael("pageBackground", pageWidth, pageHeight);
// Image dump
var set = Raphael(["pageBackground", pageWidth, pageHeight, {
    type: "rect",
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    stroke: "#f00"
}, {
    type: "text",
    x: 30,
    y: 40,
    text: "Dumper"
}]);

};

*/

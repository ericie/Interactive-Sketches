/**
 * @author ericie
 */

Terrain = function ( c, count ) {

	this.x = random(0,1000);
	this.y = random(0,600);
	this.z = 0;
	this.ctx = c;
	this.count = 1000;
	this.color = "rgba(20,20,255,1)";

};


Terrain.prototype = {
	constructor: Terrain,

	init: function (m) {
		console.log("INIT TERRAIN");
		this.ctx.fillStyle = "rgba(20,20,255,1)";
		for (var i = 100; i >= 0; i--) {
			this.x = Math.random() * 1000;
			this.y = Math.random() * 1000;
			this.circle(this.x, this.y, this.r);
		};
	},

	update: function () {
	},

	circle: function (x,y,r) {
	  this.ctx.beginPath();
	  this.ctx.arc(x, y, r, 0, Math.PI*2, true);
	  this.ctx.closePath();
	  this.ctx.fill();
	},

	setColor: function(){
		//return 'rgba(255,0,144,.8)';
		//if (grayScale){
		//	var gryV = Math.round(Math.random()*100);
		//	var gryA = (Math.random()*.35);
		//	targ.color = 'rgba('+gryV+','+gryV+','+gryV+','+gryA+')';
		//} else {
		
			var colorTint = Math.round(Math.random() * 7);
			var newColor = 'rgba(255,255,255,.8)'; //;
			_a = 1;//Math.random();

			if (colorTint <= 1){
				_r = 255;
				_g = 0;
				_b = 144;
				newColor = 'rgba(255,0,144,'+_a+')';
			} else if (colorTint == 2){
				_r = 0;
				_g = 209;
				_b = 255;	
				newColor = 'rgba(0,209,255,'+_a+')';
			} else if (colorTint == 3){
				_r = 0;
				_g = 255;
				_b = 4;	
				newColor = 'rgba(0,255,4,'+_a+')';
			} else if (colorTint == 4){
				_r = 100;
				_g = 0;
				_b = 255;
				newColor = 'rgba(100,0,255,'+_a+')';
			} else if (colorTint == 5){
				_r = 255;
				_g = 70;
				_b = 0;
				newColor = 'rgba(255,70,0,'+_a+')';
			} else if (colorTint > 5){
				_r = 255;
				_g = 255;
				_b = 255;
				newColor = 'rgba(255,255,255,'+_a+')';
			}
		
			return newColor;
		//}
	}


};
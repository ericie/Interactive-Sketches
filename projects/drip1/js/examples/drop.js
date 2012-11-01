/**
 * @author ericie
 */

Drop = function ( c, r, x, y ) {

	//this.x = x || 0;
	//this.y = y || 0;
	//this.z = z || 0;
	this.ctx = c;
	this.r = r || 4 + Math.round( Math.random() * 40);
	this.x = x || 200 + Math.round( Math.random() * 400);
	this.y = y || -20 + Math.round( Math.random() * -200);
	this.a = random(0.78539816339, 2.35619449019);
	this.velocity = Math.random() * 4 + 1;
	this.alive = true;
	this.color = this.setColor();
};


Drop.prototype = {
	constructor: Drop,

	init: function (m) {
		//return ( x < a ) ? a : ( ( x > b ) ? b : x );
		console.log("Init",m);
	},

	update: function () {
		//console.log("Update");
		//this.y += this.velocity;

		this.x += this.velocity * cos(this.a);
		this.y += this.velocity * sin(this.a);

		this.ctx.fillStyle = this.color;
		this.circle(this.x, this.y, this.r);

		if (this.y > this.ctx.height){
			this.y = -40;
			this.a = random(0.78539816339, 2.35619449019);
			this.x = Math.random() * this.ctx.width;
			this.alive = false;
		}
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
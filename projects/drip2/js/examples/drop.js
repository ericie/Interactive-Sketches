/**
 * @author ericie
 */

Drop = function ( c, r, x, y ) {

	//this.x = x || 0;
	//this.y = y || 0;
	//this.z = z || 0;
	this.init(c, r, x, y );
	this.memoryLength = 30;
	this.positionBuffer = [];
};


Drop.prototype = {
	constructor: Drop,

	init: function (c, r, x, y ) {
		//return ( x < a ) ? a : ( ( x > b ) ? b : x );
			this.c = c;
			this.r = r || 4 + Math.round( Math.random() * 40);
			this.x = x || 200 + Math.round( Math.random() * 400);
			this.y = y || -20 + Math.round( Math.random() * -200);
			this.a = random(0.78539816339, 2.35619449019);
			this.velocity = Math.random() * 4 + 1;
			this.alive = true;
			this.color = this.setColor();

			this.buffer = document.createElement("canvas");
			this.btx = this.buffer.getContext("2d");
			this.btx.canvas.width = demo.canvas.width;
			this.btx.canvas.height = demo.canvas.height;
			this.btx.lineWidth = r || 4 + Math.round( Math.random() * 40);
			this.btx.strokeStyle = this.color;

			this.btx.shadowOffsetX = 4;
			this.btx.shadowOffsetY = 4;
			this.btx.shadowBlur = 10;
			this.btx.shadowColor = "rgba(0,0,0,.25)";
	},

	update: function () {
		//console.log("Update");
		//this.y += this.velocity;

		//boxBlurCanvasRGBA( this.buffer, this.btx, 0, 0, this.btx.canvas.width, this.btx.canvas.height, 5, 1 );
		this.btx.clearRect(0, 0, this.btx.canvas.width, this.btx.canvas.height);

		this.x += this.velocity * cos(this.a);
		this.y += this.velocity * sin(this.a);
		this.loc = {x:this.x, y:this.y};

		this.positionBuffer.push(this.loc);
		if ( this.positionBuffer.length > this.memoryLength){
			this.positionBuffer.shift();
		}


		this.btx.fillStyle = this.color;

		// this.btx.shadowOffsetX = 0;
		// this.btx.shadowOffsetY = 0;
		// this.btx.shadowBlur = 0;
		// this.btx.shadowColor = "rgba(0,0,0,0)";

		var s = this.positionBuffer[ (this.positionBuffer.length - 1)];
		this.btx.moveTo(s.x,s.y);
		this.btx.beginPath();
		for (var i = this.positionBuffer.length - 2; i >= 0; i--) {
			var p = this.positionBuffer[i];
			//this.circle(p.x, p.y, this.r);
			this.btx.lineTo(p.x,p.y);
		};
		this.btx.closePath();
		this.btx.stroke();


		//this.circle(this.x, this.y, this.r);

		if (s.y > this.btx.canvas.height + 100){
			this.reset();
		}
		

		return this.buffer;
	},

	reset: function(){
		this.y = -40;
		this.a = random(0.78539816339, 2.35619449019);
		this.x = Math.random() * this.btx.canvas.width;
		this.alive = false;
		this.positionBuffer = [];

		this.btx.clearRect(0, 0, this.btx.canvas.width, this.btx.canvas.height);
	},

	circle: function (x,y,r) {
		this.btx.beginPath();
		this.btx.arc(x, y, r, 0, Math.PI*2, true);
		this.btx.closePath();

		this.btx.fill();
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
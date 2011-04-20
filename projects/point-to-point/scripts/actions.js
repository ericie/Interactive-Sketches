$(function(){

	log("init");
	
	$(function() {
		$( ".draggable" ).draggable();
	});
	
	$.particles.presets.example = function(items) {
		var radius = 50;
		var halfpi = Math.PI / 180;

		
		function pickTarg(){
			var tempNum = Math.round(Math.random() * 12);
			var newTarg;
			//log(tempNum);
			if (tempNum == 1){
				newTarg = "#targ1";
			} else if (tempNum == 1){
				newTarg = "#targ1";
			} else if (tempNum == 2){
				newTarg = "#targ2";
			} else if (tempNum == 3){
				newTarg = "#targ3";
			} else if (tempNum == 4){
				newTarg = "#targ4";
			} else if (tempNum == 5){
				newTarg = "#targ5";
			} else if (tempNum == 6){
				newTarg = "#targ6";
			} else if (tempNum == 7){
				newTarg = "#targ7";
			} else if (tempNum == 8){
				newTarg = "#targ8";
			} else if (tempNum == 9){
				newTarg = "#targ9";
			} else if (tempNum == 10){
				newTarg = "#targ10";
			} else if (tempNum == 11){
				newTarg = "#targ11";
			} else {
				newTarg = "#targ12";
			}
			
			//log(newTarg);
			return newTarg;
			
		}
		return function(item) {
			// Init Speeds
			var position = $(item).position();
			var curX = position.left;
			var curY = position.top;

			
			if ( $(item).data("targ") ){
			} else {
				var newTarg = pickTarg();
				//log(newTarg);
				$(item).data("targ", newTarg );
			}
			var targString = $(item).data("targ");
						
			if ( $(item).data("speedX") ){
			} else {
				var tempX = 0; //Math.random() * 3;
				var tempY = 0; //Math.random() * 3;
				$(item).data("speedX", tempX);
				$(item).data("speedY", tempY);
				
			}
			
			var speedX = $(item).data("speedX");
			var speedY = $(item).data("speedY");
			var targ = $(targString).position();
			// Some offset coming from the current CSS i think
			targ.left += 40;
			targ.top += 30;
			var targSpeedX = (targ.left - curX) / 30;
			var targSpeedY = (targ.top - curY) / 30;			
			var accell = .05;
			
			//speedX = targSpeedX;
			//speedY = targSpeedY;
			
			if (Math.abs(speedX) < Math.abs(targSpeedX)){
				if (targSpeedX > 0){
					speedX += accell;
				} else {
					speedX -= accell;
				}
			} else {
				speedX = targSpeedX;
			}
			
			//
			if (Math.abs(speedY) < Math.abs(targSpeedY)){
				if (targSpeedY > 0){
					speedY += accell;
				} else {
					speedY -= accell;
				}
			} else {
				speedY = targSpeedY;
			}
			
			
			if (Math.abs(speedX) < 1 && Math.abs(speedY) < 1){
				newTarg = pickTarg();	
				$(item).data("targ", newTarg );
			}
			
			//var angle = (360 / this.length) * this.index;
			var x = curX + speedX; //Math.round(radius * Math.cos(angle * halfpi));
			var y = curY + speedY; //Math.round(radius * Math.cos(angle * halfpi));
			$(item).css({left: x + 'px', top: y + 'px'});
			
			
			// set the speeds back to this item's data
			$(item).data("speedX", speedX);
			$(item).data("speedY", speedY);
				
		}
	}

	/*
	$('ul li').particles(function(item) {
	  var halfpi = Math.PI / 180;
	  var angle = (360 / this.length) * this.index;
	  var radius = 20;
	  var x = Math.round(radius * Math.cos(angle * halfpi));
	  var y = Math.round(radius * Math.sin(angle * halfpi));
	  $(item).css({left: x + 'px', top: y + 'px'});
	});
	*/
	$('ul li').particles('example');
	
	function log(m){
		console.log(m);
	}
	
});
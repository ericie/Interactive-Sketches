$(function(){
	log("Ready");
	
	/*
	var bg0 = $(".bg0");
	var bg1 = $(".bg1");
	var bg2 = $(".bg2");
	*/
	
	//startParallax();
	var targ1 = $("#reveal1").data("target");
	log(targ1);
	targ1 = $(targ1).offset();
	log(targ1);
	$("#reveal1").css({"top":targ1.top + "px", "left":targ1.left + "px"});
	
		
	
	$("article section").mousemove(function(event) {
		var myOffsets = $(this).offset();
		
		//log(myOffsets.left);
		
		var blurX = event.pageX;
		var blurY = event.pageY;
		
		var pageX = event.pageX;
		var pageY = event.pageY;
		
		var curBlur = $(this).find(".blur");
		blurX -= curBlur.width()/2;
		blurY -= curBlur.height()/2;
		
		blurX -= myOffsets.left;
		blurY -= myOffsets.top;
		
		curBlur.css({"top":blurY + "px", "left":blurX + "px"});
		
		
		// Reveal
		/*
		var curRev = $("#reveal1");
		revX = pageX - curRev.width()/2;
		revY = pageY - curRev.height()/2;
		
		curRev.css({"top":revY + "px", "left":revX + "px"});
		*/
		//$('#log').append('<div> + msg + '</div>');
	});

	$(".transform").mousemove(function(event) {
		var revX = event.pageX;
		var revY = event.pageY;
		var curRev = $("#reveal1");
		revX -= curRev.width()/2;
		revY -= curRev.height()/2;
		
		
		//revX -= revOffsets.left;
		//revY -= revOffsets.top;
		
		curRev.css({"top":revY + "px", "left":revX + "px"});	
	});


});

function getCenter(_targ){
	var targ = "#" + $("#reveal1").data("target");
	//log(targ);
	targ = $(targ).offset();
	targ.left += $(targ).width; 
	return(targ);
	//log(targ);
	//$("#reveal").css({"top":targ1.top + "px", "left":targ1.left + "px"});
}

function log(_m){
	console.log(_m);
}
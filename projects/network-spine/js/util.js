//General Global Utilities

key('ctrl+option+o', function(){ 
	display_mode = "outline";
	initDisplay();
	return false;
});
key('ctrl+option+2', function(){ 
	display_mode = "2d";
	initDisplay();
	return false;
});

function log(_m, _section){
	if (!_section){
		_section = "n/a";
	}
	console.log(_section + ": " + _m);
}

function initDisplay(){
	log(display_mode, "Util");
	if (display_mode == "outline"){
		$("#outline").show();
	} else {
		$("#outline").hide();
	}
	//console.log("Init Display");
}


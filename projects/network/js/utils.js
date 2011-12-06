/*
// KeyMaster Demo Code
// define short of 'a'
key('a', function(){ alert('you pressed a!') });

// returning false stops the event and prevents default browser events
key('ctrl+r', function(){ alert('stopped reload!'); return false });

// multiple shortcuts that do the same thing
key('⌘+r, ctrl+r', function(){ });
*/

//key('ctrl+option+m', function(){ alert('Cyle Modes!'); return false });
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


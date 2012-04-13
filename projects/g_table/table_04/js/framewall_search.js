var ecsConnection;

function gup( name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null ) {
        return "";
    } else {
        return results[1];
    }
}

setupECS = function () {
	ecsConnection = new ECS.connection( gup('host'), gup('port') );
	
	// override default function to "catch" incoming routes
	ecsConnection.onRouteReceived = this.onRouteReceived;
	ecsConnection.onMessageReceived = this.onMessageReceved;
}

onMessageReceved = function( msg ) {
	console.log( msg );
}

//receive search from ECS
onRouteReceived = function( key, value) {
	
}

/**
 * This contains all the javascript for the framewall's search page (minus the virutal keyboard)
 * It simply opens a websocket and passes search messages to the server in the form: 
 *
 *	{
 *		'msg'	: searchTerm
 *		'type'	: 'search' 
 *	}
 *
 */
submitSearch = function( term ) {
	if( term == "" )
		return;

	var msg = {}
	msg['msg'] = term;
	msg['type'] = "search";

	ecsConnection.send( JSON.stringify(msg) );

	// $('#submitCont').addClass('hidden');
	// $('#loadCont').removeClass('hidden');
}

$(document).ready( function() {
	$("#submitBtn").click( function(event) {
		event.preventDefault();
		submitSearch( $("#searchBar").val() );
	});

	var kb = new rgKeyboard();
	kb.appendTo( $('#keyboardCont') );
	kb.bindOutputTo( $('#searchBar') );

	setupECS();

	$('#searchBar').focus();
});
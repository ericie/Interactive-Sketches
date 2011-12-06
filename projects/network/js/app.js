// App
var display_mode = "outline";
var loop;
var loopRate = 60;
var ambientTimer = 1000;
var main;

window.App = {
	Models: {},
	Controllers: {},
	Views: {},
	Collections: {},
	
	// Global objects
	keyDict: {}
}
	
	//console.log(App);

//});

/*
function checkApp(){
	console.log(App);
}
*/

$(function(){
	var spider = new Spider();
	//var main = new Main();
	var main = MainController;
	
	
	var t1 = new Term({term:"Terminator"});
	var t2 = new Term({term:"Axl Rose"});
	var t3 = new Term({term:"Sad"});


	var terms = new TermCollection([t1,t2,t3]);
	var termsView = new TermCollectionView();
	var termsControl = new TermCollectionController(main,terms,termsView);

	main.init(terms, "outline");

});

function addAmbient(){
}

function update(){
	//log("Animating");
}

function initDisplay(){

}

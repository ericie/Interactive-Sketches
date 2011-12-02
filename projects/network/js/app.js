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

	//var termView = new TermView();

	/*
	var inactiveTerms = terms.filter(function(t) {
		return t.get("active") != true;
	});
	*/

	//var inactiveTerms = terms.inactive();
	//var activeTerms = terms.active();
	//var que = terms.que();

	/*
	termCollectionView.addList("Inactive Terms", inactiveTerms);
	termCollectionView.addList("Active Terms", activeTerms);
	termCollectionView.addList("Que", que);

	termCollectionView.update();
	*/

	main.init(terms, "outline");
	//MainController.init();

});

function addAmbient(){
}

function update(){
	//log("Animating");
}

function initDisplay(){

}

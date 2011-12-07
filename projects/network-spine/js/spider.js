// spider

var exports = this; 

var Result = Spine.Model.sub();
Result.configure("Result","name","connections","state","age");
//Result.extend(Spine.Model.Local); // Local Storage
Result.belongsTo('list', 'ResultList');
Result.extend({
	activate: function() {
		// TODO: Result Code
		log("Activate", "Result Model");
		this.state = "active";
	},
	deactivate: function() {
		// TODO: Deactivation Code
		log("Deactivate", "Result Model");
	},
	transition: function() {
		//console.log("Trans!");
	},
	connect: function() {
		log("Connect", "Result Model");
	}
});
/*Result.bind('activate', 
    function(){
        console.log("Activate Result");
        this.activate();
    }
);*/


var ResultList = Spine.Model.sub();
ResultList.configure("ResultList","name","items");
ResultList.hasMany('results', 'Result');
ResultList.extend({
	init: function() {
		log("Result List Init");
	},
	activate: function() {
		// TODO: Activation Code
		log("Activate", "Result Model");
	},
	list: function(){
		//return this.name;
	},
	deactivate: function() {
		// TODO: Deactivation Code
		log("Deactivate", "Result Model");
	},
	pushOne: function(_add){
		this.items.push(_add);
	},
	popOne: function(){
		return this.items.pop();
	},
	transition: function() {
		//console.log("Trans!");
	},
	connect: function() {
		log("Connect", "Result Model");
	}
});
ResultList.bind('getList', 
    function(){
        //console.log("getList", "Result List");
        console.log(this.results, "Results");
        //console.log(this.results(), "Result List");
        //this.activate();
    }
);

var ListController = Spine.Controller.sub({
	init: function(_list){
		// Called on instantiation
		log("Init", "ResultLists");
		//log(que, "ResultLists");
		this.list = _list;
		this.outline = this.$(".items");
	},
	respond: function(){
		log("Respond", "ListController")
		log(this.list.trigger("getList"), "ListController")
	}
});

var Spider = Spine.Model.sub();
Spider.configure("Spider","config","que","list");
Spider.extend({
	init: function() {
		log("Init", "Spider");
		this.config = {};
	},
	initQue: function(_list) {
		log("Que", "Spider");
		this.que = _list;
	},
	initActive: function(_list) {
		log("Active", "Spider");
		this.active = _list;
	}
});


var SpiderApp = Spine.Controller.sub({
	init: function(){
		// Called on instantiation
		log("Init", "Spider App");
		var spiderItem = Spider.first();
		log(spiderItem, "Spider App");
	},
	addQue: function(_m){ this.que = _m	},
	addActive: function(_m){ this.active = _m },
	respond: function(){
		log(this.que, "Spider App 1");
		log(this.active, "Spider App 2");

		log(this.que.name, "Spider App");
		log(this.que.items, "Spider App");
		log(this.que.results, "Spider App");
		//log( this.que.fullItems() );
	},
	beep: function(){
		log("Beep Beep!", "Spider App");
	}
});



$(function() {
	console.log("Ready!");

	var spider = new Spider();
	spider.config = {"display_mode":"outline"};

	var spiderApp = new SpiderApp({
		el: $("body")
	});

	var que = new ResultList();

	var r1 = new Result({name:"Cat", list:que});
	var r2 = new Result({name:"Dog", list:que});
	var r3 = new Result({name:"Elephant", list:que});
	var r4 = new Result({name:"Rhino", list:que});
	var r5 = new Result({name:"Cave Bear", list:que});

	que.items = ["Cat","Dog","Elephant","Wooly Mammoth","Cave Bear"];
	que.name = "Que";

	var active = new ResultList();
	active.items = [];
	active.name = "Active";

	var queController = new ListController(que);
	var activeController = new ListController(active);

	//spider.que = que;
	//spider.active = active;
	//spider.initActive(active);

	spiderApp.beep();
	spiderApp.addQue(que);
	spiderApp.addActive(active);
	spiderApp.respond();

	queController.respond();
	//var spider = new SpiderApp({
	//		el: $("body"),
	//  });


});



//app.js


var Node = Spine.Model.sub();
var ambLoop;

Node.configure( "Node", "state", "name", "query", "url", "keywords", "description" );

Node.extend({
	get_state: function(){
		return this.keywords;
	},
	toggle_state: function(){
		if (this.state != true){
			this.state = true;
		} else {
			this.state = false;
		}
	},
	outline: function(){
		return this.name;
	}

});



var AmbMode = Spine.Model.sub();

AmbMode.configure( "keywords", "delay");

AmbMode.extend({
	init: function(){
		console.log("AMB")
		//this.set_time(1000);
	},
	set_time: function(_t){
		console.log("set time");
		/*
		if (_t > 0){ 
			this.delay = _t;
		} else {
			this.delay = 1000;
		}
		this.start();
		*/
	},
	start: function(){
		console.log("start");
		ambLoop = setInterval(this.load, this.delay);
	},
	load: function(){
		console.log("LOAD");
	},
	pause: function(){
		if (this.state != true){
			this.state = true;
		} else {
			this.state = false;
		}
	}

});

var AmbModes = Spine.Controller.sub({
    events: {
    	"load": "load"
    },

    elements: {
    },

    init: function(){
		// Start Ambient Timer
		AmbMode.bind("refresh change", this.proxy(this.render));

		//this.item.bind("addOne", this.proxy(this.addOne));
		console.log("AMB");

    },

    render: function(){
    	//this.html(this.)
    	console.log("Render Amb Mode")
    	console.log(AmbMode.all());
    },
    addOne: function(t){
    	console.log(t);
    	console.log(this.input.val());
    	return "You got it";
    }

});


var amb;
var SpiderApp = Spine.Controller.sub({
    events: {
    },

    elements: {
    },
	refs: {
    	"amb": "This is Ref1"
    	//,"amb": new AmbModes({})
    },
    init: function(){
    	//console.log(this.refs.ref1);
		console.log("Spider Init-2");
		//var amb = new AmbMode({});
		//console.log(this.refs.amb);
		//this.refs.amb.add();

		//console.log(amb.addOne());
		console.log("--");
		this.refs.amb = AmbMode.create();
		this.refs.amb.load();

		this.addOne();
    },

    addOne: function(node){
    	var n1 = Node.create({state:"que", name:"First Node" });
		console.log(n1);
    },

    addAll: function(){
    },

    create: function(e) {
    },

    clear: function(){
    }
});


$(function() {
	console.log("Ready!");
	return new SpiderApp({
		el: $("#outline")
	});

});

//Node.create({state:"que", name:"nothing" });
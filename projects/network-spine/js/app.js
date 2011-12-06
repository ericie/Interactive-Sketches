var exports = this; 


//var spider = Spine.Class.create();
//var main = spider.init();

// Persist with Local Storage


var Dot = Spine.Model.sub();
Dot.configure("Dot","name","connections","state","age");
Dot.extend(Spine.Model.Local); // Local Storage
Dot.extend({
	activate: function() {
		// TODO: Activation Code
	},
	deactivate: function() {
		// TODO: Deactivation Code
	},
	transition: function() {
		console.log("Trans!");
	}
});
Dot.bind('beep', 
    function(){
        console.log("BEEP BEEP!");
        this.transition();
    }
);

//Dot.bind("create", function(rec){  
  //rec.fetchUrl();  
  //console.log("Dot Bind");
  //console.log(rec);
//});

//exports.Dots = Spine.Controller.create({  
var Dots = Spine.Controller.sub({   
	events: {
		"click .destroy": "destroy",  
		"click .toggleStats": "toggleStats"  
	},

	proxied: ["render","remove"],
	template: function(items){
		return $("#dotTemplate").tmpl(items);  
	},

  init: function(){
    this.item.bind("update", this.proxy(this.render));
    this.item.bind("destroy", this.proxy(this.remove));
  },
	
  //render: function(){  
	//	this.el.html(this.template(this.item));  
	//	return this;  
	//},

  activateOne: function(){
    log("Activate 1", "Dots");
  },

  render: function(){
    //console.log("Render");
    console.log(this.item);
    this.replace($("#dotTemplate").tmpl(this.item));
    return this;
  },

  remove: function(){
    this.el.remove();
    this.release();
  },

	destroy: function(){
		this.item.destroy();  
	}
});

var QueList = Dots.sub({
  
});
var ActiveList = Dots.sub({
  elements: {
    "#active_items": "items",
  }
});
var ArchiveList = Dots.sub({
  
});

var Spider = Spine.Model.sub();
Spider.configure("Spider","displayState","activeList","queList","archiveList");
Spider.extend(Spine.Model.Local); // Local Storage
Spider.extend({
});


var SpiderApp = Spine.Controller.sub({ 
//exports.SpiderApp = Spine.Controller.create({
    elements: {
      "#que_items": "items",
      "form":   "form",
      "input":  "input",
      ".render_button": "render_button",
      "#que_col": "queCol",
      "#active_col": "actCol",
      "#archive_col": "archCol"
    },
    events: {
      "submit form": "create",
      "click .render_button": "rend"
    },
    //proxied: ["render", "addAll", "addOne"],
    init: function(){
      //Dot.bind("create",  this.addOne);
      Dot.bind("create",  this.proxy(this.addOne));
      Dot.bind("refresh",  this.proxy(this.addAll));
      Dots.bind("activateOne", this.activateOne);
      //Dot.bind("ambLoop",  this.proxy(this.ambLoop));

      Dot.fetch();

      que = QueList.create();
    },
    addOne: function(url){
      var view = QueList.init({item: url});
      this.items.append(view.render().el);
    },

    addAll: function(){
      //Dot.each(this.addOne);
      Dot.each(this.proxy(this.addOne));
    },

    rend: function(){
      //console.log("Render B");
    },
    create: function(e){
      e.preventDefault();
      var value = this.input.val();
      Dot.create({name: this.input.val()});
      this.input.val("");
    },
    update: function(){
      // Every Frame
    },
    ambLoop: function(){
      // Add a new Term
      console.log("Activate");
      //console.log(Dot.first());
      var nt = Dot.first();
      //Spine.trigger('global_beep');
      //Dots.bee();
      Dot.trigger("beep", "some", "data");
      //Dots.trigger("beep");
      //Dots.beep();

      //log(que.activateOne(),"AmbLoop")
      //que = QueList.activateOne();
      //var newAct = Dot.first();
      //newAct.beep();
      //console.log(newAct);
      //console.log("newAct");
    }
});



$(function() {
	console.log("Ready!");
	var spider = new SpiderApp({
		el: $("body")
	});

  var loop = setInterval(spider.update,60);
  var ambLoop = setInterval(spider.ambLoop,2000);


});

var active, que, archived;


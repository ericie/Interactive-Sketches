//app.js

var Dot = Spine.Model.sub();

Dot.configure("Dot", "name", "done");

// Persist with Local Storage
Dot.extend(Spine.Model.Local);

Dot.extend({
  active: function(){
    return this.select(function(item) {
      return !item.done;
    });
  },

  done: function(){
    return this.select(function(item) {
      return !!item.done;
    });
  },

  destroyDone: function(){
    var items = this.done();
    console.log(items);
    for(var i=0; i < items.length; i++)
      items[i].destroy();
  }
});


var Dots = Spine.Controller.sub({ 
	events: {
		"change input[type=checkbox]": "toggle",
    "click .activate": "activate",
		"click .destroy": "destroyItem"
	}, 
	   
	init: function(){
		this.item.bind("update", this.proxy(this.render));
		this.item.bind("destroy", this.proxy(this.remove));
	},

	render: function(){
		this.replace($("#taskTemplate").tmpl(this.item));
		return this;
	},

	remove: function(){
		this.el.remove();
		this.release();
	},

	toggle: function(){
		this.item.done = !this.item.done;
		this.item.save();
	},

  activate: function(){
    console.log("Activate") ;
    console.log(activeEl);
  },

	destroyItem: function(){
		this.item.destroy();
	}

});


var DotApp = Spine.Controller.sub({
    events: {
      "submit form": "create",
      "click  .clear": "clear"
    },

    elements: {
      ".items": "items",
      "form input": "input",
      "#que_col":"queEl",
      "#active_col":"activeEl",
      "#archive_col":"archiveEl"
    },

    init: function(){
      Dot.bind("create",  this.proxy(this.addOne));
      Dot.bind("refresh", this.proxy(this.addAll));
      Dot.fetch();
    },

    addOne: function(task){
      var view = new Dots({
        item: task
      });
      this.items.append(view.render().el);
    },

    addAll: function(){
      Dot.each(this.proxy(this.addOne));
    },

    create: function(e) {
      e.preventDefault();
      console.log("Create");
      console.log(view.render().act);
      Dot.create({name: this.input.val()});
      this.input.val("");
    },

    clear: function(){
    	console.log("Destroy");
      Dot.destroyDone();
    }

});


$(function() {
	console.log("Ready!");
	return new DotApp({
		el: $("#queList"),
    act: $("#active_col")
	});
});


//app.js

var Task = Spine.Model.sub();

Task.configure("Task", "name", "done");

// Persist with Local Storage
Task.extend(Spine.Model.Local);

Task.extend({
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


var Tasks = Spine.Controller.sub({ 
	events: {
		"change input[type=checkbox]": "toggle",
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

	destroyItem: function(){
		this.item.destroy();
	}

});


var TaskApp = Spine.Controller.sub({
    events: {
      "submit form": "create",
      "click  .clear": "clear"
    },

    elements: {
      ".items": "items",
      "form input": "input"
    },

    init: function(){
      Task.bind("create",  this.proxy(this.addOne));
      Task.bind("refresh", this.proxy(this.addAll));
      Task.fetch();
    },

    addOne: function(task){
      var view = new Tasks({
        item: task
      });
      this.items.append(view.render().el);
    },

    addAll: function(){
      Task.each(this.proxy(this.addOne));
    },

    create: function(e) {
      e.preventDefault();
      Task.create({name: this.input.val()});
      this.input.val("");
    },

    clear: function(){
    	console.log("Destroy");
		Task.destroyDone();
    }

});


$(function() {
	console.log("Ready!");
	return new TaskApp({
		el: $("#tasks")
	});
});
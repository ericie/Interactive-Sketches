TermView = Backbone.View.extend({
	tagName : "div",
	className : "term",
	initialize: function() {
		console.log("Init Term View")
	},
	
	update: function() {
		console.log("Update");
		this.render();
	},
	
	render: function() {
		// show this term
		console.log("Render Term");
		//$(this.el).html(this.model.get('name'));  
	},
	
	setPosition: function() {
	
	},
  
  	removeSelf: function() {
  	
  	}
  
});

TermOutlineView = Backbone.View.extend({
	

});
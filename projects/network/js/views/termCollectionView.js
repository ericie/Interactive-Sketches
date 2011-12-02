//Term Collection View.js
TermCollectionView = Backbone.View.extend({
	tagName : "div",
	className : "term",
	outlines : [],
	initialize: function() {
		console.log("Init Term View");
	},
	
	addList: function(_name, _data){
		this.outlines.push({
			name : _name,
			data : _data
		});
	},

	update: function() {
		console.log("Update");
		//this.render();
		this.outline();
	},
	
	render: function() {
		// show this term
		console.log("Render Term");
		//$(this.el).html(this.model.get('name'));  
	},
	
	outline: function(){
		log("Outline!");

		var out = "<ul>";

		for(var i = 0; i < this.outlines.length; i++){
			var l = this.outlines[i];

			// List Open
			out += "<li class='level2'><h3>" + l.name + "</h3><ol>";

			for(var j = 0; j < l.data.length; j++){
				// Add Item
				log(l.data[j]);
				out += "<li>" + l.data[j].attributes.term + "</li>";
			}
			
			// List Close
			out += "</ol></li>";
		}

		out += "</ul>";
		//log(out);

		$('.outline').append(out);	
		return(out);
	},

	setPosition: function() {
	
	},
  
  	removeSelf: function() {
  	
  	}
  
});


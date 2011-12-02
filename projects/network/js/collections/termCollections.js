TermCollection = Backbone.Collection.extend({
	model: Term,
	inactive: function(){
		var _list = this.filter(function(t) {
			return t.get("active") != true;
		});
		return _list;
	},
	active: function(){
		var _list = this.filter(function(t) {
			return t.get("active") === true;
		});
		return _list;
	},
	que: function(){
		var _list = this.filter(function(t){
			return t.get("displayed") === false;
		});
		return _list;
	}
});



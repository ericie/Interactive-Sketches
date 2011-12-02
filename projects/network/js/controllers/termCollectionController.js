//Term Collection Controller


var TermCollectionController = Backbone.Controller.extend({  
		
		routes: {  
			"!/":"root",  
			"!/games":"games",  
		},
		root: function() {  
			// Prep the home page and render stuff  
		},

		games: function() {  
			// Re-render views to show a collection of books  
		}

});	


/*
var Hashbangs = Backbone.Controller.extend({  
  routes: {  
    "!/":                 "root",  
    "!/games":        "games",  
  },  
  root: function() {  
    // Prep the home page and render stuff  
  },  
  
  games: function() {  
    // Re-render views to show a collection of books  
  },  
});
    
*/
//App.Models.Spider = Backbone.Model.extend({
Spider = Backbone.Model.extend({

  defaults: {
    current: {
      term: "starting"
    },
    ambient_terms: [
      "cat",
      "dog",
      "wolf",
      "freedom",
      "tiger"
    ],
    terms: {},
    mode: "ambient",
    initialized: false
  },

  initialize: function() {
    // Set userID to id for searching
    console.log("Spider Initialized");
    //this.set({id: this.get("userID") });
  }

});
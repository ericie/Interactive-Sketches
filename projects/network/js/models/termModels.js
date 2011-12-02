//App.Models.Spider = Backbone.Model.extend({
Term = Backbone.Model.extend({

  defaults: {
    term: 0,
    language: "English",
    displayed: false,
    active: false,
    results: {
      links: [],
      images: [],
      description: 0,
      keywords: []
    }

  }

});
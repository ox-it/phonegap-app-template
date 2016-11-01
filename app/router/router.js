define([
			'backbone', 
			'app/collections/ExamplesCollection', 
			'app/views/ExampleView'
		], function(
			Backbone, 
			ExamplesCollection, 
			ExampleView
){

	var Router = Backbone.Router.extend({

		initialize: function() {

				//start the app
				Backbone.history.start();
				console.log("Started the app");
				this.contentView = new Backbone.View({el: $('.example')});
		},

		routes: {
			"": "home"
		},

		///routes
		home: function() {

			//Example
			this.examples = new ExamplesCollection();
			this.examples.fetch({success: function() {
				var anExample = this.examples.at(0);
				var exampleView = new ExampleView({model:anExample});
				this.contentView.setView(exampleView);
				exampleView.render();
			}.bind(this)});
			//End Example
		}

	});

	return Router;

});

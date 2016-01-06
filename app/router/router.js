define(['backbone', 'app/collections/ExamplesCollection', 'app/views/ExampleView'], function(Backbone, ExamplesCollection, ExampleView){

	var Router = Backbone.Router.extend({

		initialize: function() {

				//start the app
				Backbone.history.start();
				console.log("Started the app");

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
				var exampleView = new ExampleView({el:$('.example'), model:anExample});
				exampleView.render();
			}.bind(this)});
			//End Example
		}

	});

	return Router;

});
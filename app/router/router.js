define([
			'backbone', 
			'app/collections/ExamplesCollection',
			'app/views/AllView',
			'app/views/ExampleView'
		], function(
			Backbone, 
			ExamplesCollection, 
			AllView,
			ExampleView
){

	var Router = Backbone.Router.extend({

		initialize: function() {

				//start the app
				this.examples = new ExamplesCollection();
				this.examples.fetch({success: function () {
					Backbone.history.start();
				}});
				console.log("Started the app");

		},

		routes: {
			"": "home",
			"thing/:index":"thing"
		},

		///routes
		home: function() {
			allView = new AllView({el:$('.content'), collection:this.examples});
			allView.render();
		},
		
		thing: function (i) {
			var thing = this.examples.at(i);
			var thingView = new ExampleView({el:$('.content'), model:thing});
			thingView.render();
		}

	});

	return Router;

});

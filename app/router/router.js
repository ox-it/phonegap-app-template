define([
			'backbone', 
			'app/collections/ExamplesCollection',
			'es6!app/views/AllView',
			'es6!app/views/ExampleView'
		], function(
			Backbone, 
			ExamplesCollection, 
			AllView,
			ExampleView
){

	var Router = Backbone.Router.extend({

		initialize: function() {
			
				this.contentView = new Backbone.View({el: $('.content')});
				
				//start the app
				this.examples = new ExamplesCollection();
				this.examples.fetch({success: () => {
					Backbone.history.start();
					console.log("Started the app");
				}});
		},

		routes: {
			"": "home",
			"thing/:index":"thing"
		},

		///routes
		home: function() {
			var allView = new AllView({collection:this.examples});
			this.contentView.setView(allView);
			allView.render();
		},
		
		thing: function (id) {
			var thing = this.examples.get(id);
			var thingView = new ExampleView({model:thing});
			this.contentView.setView(thingView);
			thingView.render();
		}

	});

	return Router;
	
});

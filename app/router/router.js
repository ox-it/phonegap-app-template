define([
			'backbone',
			'es6!app/models/UIStateModel',
			'es6!app/collections/ExamplesCollection',
			'es6!app/views/HeaderView',
			'es6!app/views/AllView',
			'es6!app/views/ExampleView'
		], function(
			Backbone, 
			UIStateModel,
			ExamplesCollection,
			HeaderView,
			AllView,
			ExampleView
){
	let App = window.App || {};

	var Router = Backbone.Router.extend({

		initialize: function() {
				App.UIStateModel = new UIStateModel();
				this.headerView = new HeaderView({ el:$('#header'), model:App.UIStateModel });
				this.headerView.render();
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

		execute: function(callback, args) {
			//show back button for all except home, dismiss nav menu, show action button
			App.UIStateModel.set({ 
				showBack: true,
				backLink: null,
				confirmBack: false,
				backCallback: null,
				backLabel: 'Back',
				showNavMenu: false,
				showNavMenuButton: true,
				actionButton: null,
				footerButtons:[],
				footerNavigation:false,
				floatingFooterButton: null,
			});
			
			//call the relevant function
			if(callback) {
				callback.apply(this, args);
			}
			
			//re-render the nav menu view, to highlight current page
			this.navMenuView.render();
		},

		///routes
		home: function() {
			App.UIStateModel.set({ 
				showBack: false,
				showNavMenuButton: true,
			});
			var allView = new AllView({el:$('.content'), collection:this.examples});
			allView.render();
		},
		
		thing: function (id) {
			App.UIStateModel.set({ 
				showBack: true,
				confirmBack: true,
				backLabel: 'Back',
				showNavMenuButton: true,
				actionButton: false,
			});
			var thing = this.examples.get(id);
			var thingView = new ExampleView({model:thing});
			this.contentView.setView(thingView);
			thingView.render();
		}

	});

	return Router;
	
});

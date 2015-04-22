define(['backbone', 'underscore', 'layoutmanager', 'app/router/router'],
	function(Backbone, Layout, Router){

		var App = {
			onDeviceReady: function() {
				//callback for tests
				console.log("Device ready");

				//configure Layoutmanager to manage views by default
				Backbone.Layout.configure({ manage:true });

				//create router
				var router = new Router();

				//start the app
				Backbone.history.start();
				console.log("Started the app");
			},

			initialize: function(cb) {
				document.addEventListener('deviceready', _.bind(this.onDeviceReady, this), false);
			}
		};

		return App;
});

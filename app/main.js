define(['backbone', 'layoutmanager', 'app/router/router'],
	function(Backbone, Layout, Router){

		var App = {
			onDeviceReady: function() {
				console.log("Device ready");
				//configure Layoutmanager to manage views by default
				Backbone.Layout.configure({ manage:true });

				//create router
				var router = new Router();

				//start the app
				Backbone.history.start();
				console.log("Started the app");
			},

			initialize: function() {
				if (typeof(device) !== 'undefined') {
					//wait for device ready event
					document.addEventListener('deviceready', onDeviceReady, false);
				} else {
					//immediately ready in desktop browser
					this.onDeviceReady();
				}
			}
		};

		return App;
});

define([
			'backbone', 
			'underscore', 
			'layoutmanager', 
			'app/router/router'
		], function(
			Backbone, 
			_, 
			Layout, 
			Router
){

		var App = {
			onDeviceReady: function() {
				//callback for tests
				console.log("Device ready");

				//configure Layoutmanager to manage views by default
				Backbone.Layout.configure({ manage:true });

				//create router
				var router = new Router();

				if(this.onReady) {
					this.onReady();
				}
			},

			initialize: function(onReady) {
				//wait for device ready event. This is fired from the html when not on a device.
				//takes a custom callback to call when the app is ready
				this.onReady = onReady;
				document.addEventListener('deviceready', _.bind(this.onDeviceReady,this), false);
			}
		};

		return App;
});

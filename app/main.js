define([
			'backbone', 
			'underscore', 
			'layoutmanager', 
			'es6!app/router/router',
			'phonon-core'
		], function(
			Backbone, 
			_, 
			Layout, 
			Router,
			phonon
){

		var App = {
			onDeviceReady: function() {
				//callback for tests
				console.log("Device ready");

				//don't allow phonon to take over the window location hash
				phonon.navigator({useHash:false})

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

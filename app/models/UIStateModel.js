define([
			'backbone', 
			'underscore',
		], function(
			Backbone, 
			_
) {

	// Model for the state of the app header.

	var UIStateModel = Backbone.Model.extend({
		parse: function(response) {
			return response;
		},
		
		defaults: {
			headerText: 'app_template',
			showBack: false,
			backLink: null,
			confirmBack: false,
			backCallback: null,
			backLabel: 'Back',
			showNavMenuButton: true,
			showNavMenu: false,
			actionButton: { 
				text: null,
				callback: null,
				href: null,
			},
			links: [
				{
					label: "Home",
					route: "",
					current: false
				},
			]
		}
	})

	return UIStateModel;

});

define([
			'backbone', 
			'hbs!app/templates/example_template',
			'phonon-core',
			'phonon/panels'
		], function(
			Backbone, 
			exampleTemplate,
			phonon,
			panel
) {

	var ExampleView = Backbone.View.extend({

		template: exampleTemplate,

		initialize: function(params) {
			//initialisation of view from params
			this.model = params.model;
		},

		serialize: function() {
			//serialize relevant model data to send to template
			var data = this.model.toJSON();
			return data;
		},

		
		testActionButton: function () {
			console.log("Test Action Button");
		}
	});

	return ExampleView;

});

define([
			'backbone', 
			'hbs!app/templates/example_template',
			'jsx!app/jsxcomponents/example',
			'react', 'reactDOM'
		], function(
			Backbone, 
			exampleTemplate,
			exampleComponent,
			React, ReactDOM
) {

	var ExampleView = Backbone.View.extend({

		template: exampleComponent,
		
		component: exampleComponent,

		initialize: function(params) {
			//initialisation of view from params
			this.model = params.model;
		},

		serialize: function() {
			//serialize relevant model data to send to template
			var data = this.model.toJSON();
			return data;
		},

		render: function () {
			if(this.beforeRender){this.beforeRender();}
			console.log("RENDERING the example view")
			ReactDOM.render(React.createElement (this.component, this.serialize()), this.el);
			if(this.afterRender){this.afterRender();}
		},

		events: {},

	});

	return ExampleView;

});

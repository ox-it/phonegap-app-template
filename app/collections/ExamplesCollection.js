define([
			'backbone', 
			'underscore', 
			'app/models/ExampleModel'
		], function(
			Backbone, 
			_, 
			ExampleModel
) {

	var ExamplesCollection = Backbone.Collection.extend({

		//fetch data from local storage
		url: 'app/data/examples.json',

		model: ExampleModel
	})

	return ExamplesCollection;

});

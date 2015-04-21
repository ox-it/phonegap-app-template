define(['backbone', 'underscore'], function(Backbone, _) {

	var ExampleModel = Backbone.Model.extend({
		parse: function(response) {
			// parse model here
			return response;
		}
	})

	return ExampleModel;

});

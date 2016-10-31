define([
	'backbone',
	'hbs!app/templates/all',
	'phonon-core'
], function (
	Backbone,
	allTemplate,
	phonon
) {
	
	var AllView = Backbone.View.extend({
		template: allTemplate,
		
		initialize: function () {
			
		},
		
		serialize: function () {
			var data = {};
			data.items = this.collection.toJSON();
			return data;
		},
		
		events: {
			"click .thing": "dopopup"
		},
		
		dopopup: function (ev) {
			phonon.panel('#panelTest').open();
		}
	});
	
	return AllView;
})

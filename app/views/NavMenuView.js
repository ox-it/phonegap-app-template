define([
	'backbone',
	'phonon-core',
	'phonon/side-panels',
	'hbs!app/templates/nav_menu_template',
], function(
	Backbone,
	phonon,
	sidePanel,
	headerTemplate
) {

	var NavMenuView = Backbone.View.extend({

		template: headerTemplate,

		//should use the header model
		initialize: function(params) {
			this.model = params.model;
			this.listenTo(this.model, "change:showNavMenu", this.updateNavMenu);
			this.render();
		},

		serialize: function() {
			var data = this.model.toJSON();
			var windowHash = (window.location.hash == "") ? "#" : window.location.hash;
			_.each(data.links, function(link) {
				if( '#' + link.route == windowHash ) {
					link.current = true;
				}
			});
			return data;
		},

		afterRender : function() {
		},
				
		events: {
		},
		
		updateNavMenu: function() {
			if (this.model.attributes.showNavMenu) {
				phonon.sidePanel('#side-menu').open();
			} else {
				phonon.sidePanel('#side-menu').close();
			}
		}

	});

	return NavMenuView;

});

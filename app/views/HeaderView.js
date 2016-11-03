define([
	'backbone', 
	'hbs!app/templates/header_template'
], function(
	Backbone, 
	headerTemplate
) {

	//Header view. 
	// Specify behaviour by setting parameters on App.headerModel.
	// Can show/hide the back button, menu button, and show an action button with custom text and callback.
	// see GoalView for an example action button.

	var HeaderView = Backbone.View.extend({

		template: headerTemplate,

		initialize: function(params) {
			this.model = params.model;
			this.listenTo(this.model, 'change', this.render);
			document.addEventListener("backbutton", function() {
				var fragment = Backbone.history.getFragment();
				var isHome = fragment.substr(0, fragment.indexOf('?'));
				if (fragment == "home" || isHome =="home" || fragment =="") {
					navigator.app.exitApp();
				} else {
					this.onClickBack();
				}
			}.bind(this), false);
		},

		serialize: function() {
			//serialize relevant model data to send to template
			var data = this.model.toJSON();
			//show the action button if its text is null
			data.actionButton = data.actionButton || { text: null, href: null }
			data.showActionButton = data.actionButton.text !== null;
			
			if(data.showActionButton && data.showNavMenuButton)
			{
				console.warn('Attempting to show both nav menu button, and an action button at same time.');
			}
			return data;
		},

		afterRender : function() {
		},
				
		events: {
			"click #nav-menu-button": "toggleNavMenu",
			"click #nav-menu-action": "doAction",
			"click #header-back": "onClickBack"
		},
		
		toggleNavMenu: function(ev) {
			ev.preventDefault();
			//toggle value in model, which will trigger view to show/hide the menu
			this.model.set({showNavMenu: !this.model.attributes.showNavMenu});
		},
		
		doAction: function(ev) {
			var ab = this.model.attributes.actionButton;
			if(ab && ab.href) {
				//follow the link
				return;
			} else if (ab && ab.callback) {
				// execute the supplied callback
				ev.preventDefault();
				ab.callback();
			}
		},
		
		onClickBack: function(ev) {
			if(ev) ev.preventDefault();
			if(this.model.attributes.confirmBack) {
				if(navigator && navigator.notificiation && navigator.notification.alert) {
					navigator.notification.confirm("Unsaved changes will be lost. Are you sure you want to go back?", this.goBack.bind(this), ["Confirmation"], ["Continue", "Cancel"]);
				} else {
					if(confirm("Unsaved changes will be lost. Are you sure you want to go back?") == true) {
						this.goBack(1);
					} else {
						this.goBack(2);
					}
				}
			} else {
				this.goBack(1);
			}
			
		},
				
		goBack: function (choice) {
			if(choice == 1) {
				if (this.model.attributes.backCallback) {
					// execute the supplied callback
					this.model.attributes.backCallback();
				} else {
					if(this.model.attributes.backLink && typeof(this.model.attributes.backLink) == 'string') {
						//follow the link
						$.mobile.navigate(this.model.attributes.backLink);				
					} else {
						window.history.back();
					}
				}
			}
		}

	});

	return HeaderView;

});

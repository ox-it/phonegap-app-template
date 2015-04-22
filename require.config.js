/**
 * Created by ahaith on 20/04/15.
 */
require.config({
	shim: {

	},
	paths: {
	    almond: "app/libs/almond/almond",
	    backbone: "app/libs/backbone/backbone",
	    handlebars: "app/libs/handlebars/handlebars",
	    jquery: "app/libs/jquery/dist/jquery",
	    requirejs: "app/libs/requirejs/require",
	    underscore: "app/libs/underscore/underscore",
	    layoutmanager: "app/libs/layoutmanager/backbone.layoutmanager",
	    hbs: "app/libs/require-handlebars-plugin/hbs",
	},
	packages: [

	],
	//config for the 'require-handlebars-plugin'
	hbs: {
		helpers: true,
		i18n: false,
		templateExtension: 'handlebars',
		partialsUrl: ''
	}
});

require(['app/main']);
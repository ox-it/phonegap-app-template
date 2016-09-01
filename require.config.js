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
		JSXTransformer: "app/libs/jsx-requirejs-plugin/js/JSXTransformer",
		jsx: "app/libs/jsx-requirejs-plugin/js/jsx",
		text: "app/libs/text/text",
		react: "app/libs/react/react-with-addons",
		reactDOM: "app/libs/react/react-dom"
	},
	packages: [

	],
	//config for the 'require-handlebars-plugin'
	hbs: {
		helpers: true,
		i18n: false,
		templateExtension: 'handlebars',
		partialsUrl: ''
	},
	jsx: {
		fileExtension: '.jsx'	
	},
	stubModules: ['jsx', 'text', 'JSXTransformer']
});

require(['app/main']);

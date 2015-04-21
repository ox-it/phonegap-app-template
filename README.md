# Phonegap application template
A template to be used as a starting point for hybrid applications using Phonegap

###Features
* Backbone
* LayoutManager
* Handlebars
* Grunt
* Sass
* JQuery
* RequireJS
* Jasmine

###Installation
Assumes the following are installed

```
npm install -g bower
```
```
npm install -g cordova
```

Clone the project

```
git clone https://github.com/ox-it/phonegap-app-template
cd phonegap-app-template
npm install
bower install
cordova
```

####cordova setup
```
cordova platform add ios
cordova platform add android
```
All relevant plugins should be installed by virtue of the

##Customising
Duplicate and modify the example Model, Collection, View, Template and Router.

####Adding plugins
1. Run `cordova plugin add plugin.name`
2. Add to the list in `.cordova/hooks/after_platform_add` (The plugin will then be automatically added for others cloning the project)
3. Add to config.xml

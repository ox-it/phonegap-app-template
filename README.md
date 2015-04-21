# Phonegap application template
A template to be used as a starting point for hybrid applications using Phonegap, built upon the [yeoman cordova scaffold](https://github.com/dangeross/generator-cordova).

This template follows the structure and style used in applications such as [Sensing Evolution](https://github.com/ox-it/sensing-evolution) and the [University Museums App](https://github.com/ox-it/uma-client)

###Features
* **Backbone**
* **LayoutManager**
* **Handlebars** templating
* **Grunt** task runner
* **Sass** for styling
* **JQuery**
* **RequireJS** module management
* **Jasmine** testing

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

#Running
### Serve to web browser
To deploy as local web server and watch for changes requires the installation of [LiveReload](http://livereload.com/) browser extension.

`grunt serve --platform=ios`: prepares and serves the application as a local web server at [http://localhost:8000/](http://localhost:8000/), watching for changes then preparing/redeploying the web server.

`grunt ripple --platform=ios`: prepares and serves using ripple

### Serve to emulator
`grunt emulate`: builds and emulates all installed platforms

`grunt live-emulate`: builds and emulates all installed platforms, watching for changes then building/redeploying the emulator.

### Serve to device
`grunt device`: builds and runs all installed platforms

`grunt live-device`: builds and runs all installed platforms, watching for changes then building/redeploying.


### Options
`--platform`: sets a platform to build/emulate. eg. `--platform=ios`

`--family`: sets a family to build/emulate. eg. `--family=ipad`

#### Example
`grunt live-emulate --platform=ios --family=ipad`: builds and emulates the `ios` platform using the `ipad` family.


#Customising
Duplicate and modify the example Model, Collection, View, Template and Router.

####Adding plugins
1. Run `cordova plugin add plugin.name`
2. Add to the list in `.cordova/hooks/after_platform_add` (The plugin will then be automatically added for others cloning the project)
3. Add to config.xml

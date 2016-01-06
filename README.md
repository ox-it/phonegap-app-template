# Phonegap application template
A template to be used as a starting point for hybrid applications using Phonegap, built upon the [yeoman cordova scaffold](https://github.com/dangeross/generator-cordova).

This template follows the structure and style used in applications such as [Sensing Evolution](https://github.com/ox-it/sensing-evolution) and the [University Museums App](https://github.com/ox-it/uma-client)

### Features
* **Backbone**
* **LayoutManager**
* **Handlebars** templating
* **Grunt** task runner
* **Sass** for styling
* **JQuery**
* **RequireJS** module management
* **Jasmine** testing

### Installation
Assumes bower is installed, if not run `npm install -g bower`

Clone the project:
```
git clone https://github.com/ox-it/phonegap-app-template
cd phonegap-app-template
```
install dependencies:
```
npm install
bower install
```
initialise cordova:
```
cordova setup
```
This grunt command adds all platforms and plugins listed in the arrays in Gruntfile.js

### Run on device
build and runs all installed platforms on attached devices:
```
grunt device
```
build and runs all platforms on simulator/emulato:
```
grunt emulate
```

Add a platform option to specify a single platform:
```
grunt device --platform=ios
```


Or use specific task for either ios or android to device
`grunt ios`: builds and runs on ios device
`grunt android`: builds and runs on android device


## Customising
Duplicate and modify the example Model, Collection, View, Template and Router.

#### Adding plugins
1. Add the plugin to the array in the top of Gruntfile.js
2. Run `grunt plugins`

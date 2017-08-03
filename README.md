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

### Prerequisites:
[npm](https://node.js.org)

[SASS and Compass](http://thesassway.com/beginner/getting-started-with-sass-and-compass)

bower: run `npm install -g bower`

For running on Devices or native emulators:

[Android Studio](https://developer.android.com/studio/index.html)

[Xcode](https://developer.apple.com/xcode/) and an [Apple Developer Program] (https://developer.apple.com/programs/) account 

### Installation

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

### Run
Build & run on device or emulator with the following grunt tasks
```
grunt ios
grunt ios-sim
grunt android
grunt android-sim
```
### Start hot-code-push server and run app
Start hot-code-push server and build & run on device (using the hot-code-push plugin) with the following grunt tasks
```
grunt devel:android
grunt devel:ios
```

The app can be deployed to additional devices without restarting the hot-code-push server with the following grunt tasks
```
grunt develrun:android
grunt develrun:ios
```

### Opt out of the hot-code-push.
A project can opt out of the hot-code-push if the plugins are uninstalled
``
cordova plugin remove cordova-hot-code-push --save
cordova plugin remove cordova-hot-code-push-local-dev-addon --save
```


## Customising
Duplicate and modify the example Model, Collection, View, Template and Router.

#### Adding plugins
Add cordova plugins using --save flag:
```
cordova plugin add cordova-plugin-device --save
```

(function () {
    'use strict';
    var cordova = require('cordova');

    module.exports = function (grunt) {
        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        // configurable paths
        var yeomanConfig = {
            app: 'www'
        };

        try {
            yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
        } catch (e) {
        }

        var device = {
            platform: grunt.option('platform') || 'all',
            family: grunt.option('family') || 'default',
            target: grunt.option('target') || 'emulator'
        };

        grunt.initConfig({
            yeoman: yeomanConfig,
            jshint: {
                gruntfile: ['Gruntfile.js'],
                files: ['www/**/*.js', 'test/**/*.js'],
                options: {
                    // options here to override JSHint defaults
                    globals: {
                        console: true,
                        module: true
                    }
                }
            },
            watchfiles: {
                all: [
                    'www/{,*/}*.html',
                    'www/js/{,*/,*/}*.js',
                    'www/css/{,*/}*.css',
                    'www/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
	                'sass/*.scss'
                ]
            },
            watch: {
                scripts: {
                    files: [
                        'www/js/**/*.js',
                        'www/css/**/*.css'
                    ],
                    tasks: ['jshint']
                },
                liveserve: {
                    options: {
                        livereload: true,
                    },
                    files: ['<%=watchfiles.all %>'],
                    tasks: ['shell:serveend', 'cordova-prepareserve']
                },
                liveemulate: {
                    files: ['<%=watchfiles.all %>'],
                    tasks: ['cordova-emulate-end', 'cordova-buildemulate']
                },
                livedevice: {
                    files: ['<%=watchfiles.all %>'],
                    tasks: ['cordova-buildrun']
                },
	            styles: {
		            files: ['<%=watchfiles.all %>'],
		            tasks: ['compass']
	            }

            },
            shell: {
                iossimstart: {
                    command: 'ios-sim launch platforms/ios/build/yoco.app --exit' + (device.family !== 'default' ? ' --family ' + device.family : ''),
                    options: {
                        stdout: true
                    }
                },
                iossimend: {
                    command: 'killall -9 "iPhone Simulator"'
                },
                serveend: {
                    command: 'killall -9 "cordova serve"'
                },
                rippleend: {
                    command: 'killall -9 "cordova ripple"'
                }
            },
	        requirejs: {
		        compile: {
			        options: {
				        mainConfigFile: "require.config.js",
				        name: "app/libs/almond/almond.js",
				        out: "app/built.js",
				        include: ['app/main'],
				        optimize: 'none'
			        }
		        }
	        },
	        compass: {
		        dist: {
			        options: {
				        config: 'config.rb'
			        }
		        }
	        },
          clean: {
              src: ["www/*", "!www/config.xml"],
	          filter: 'isFile'
          },
	        copy: {
		        main: {
			        files: [
				        {
					        expand: true,
					        src: [
						        "app/built.js",
						        "app/data/**",
						        "img/**",
						        "css/**"
					        ],
					        dest:"www" },
				        {
					        src: ["index-built.html"],
					        dest: "www/index.html"
				        }
			        ]
		        }
	        },
            jasmine: {
		        testTask: {
			        src: [
				        'app/**/*.js',
				        '!app/built.js',
				        '!app/libs/**',
			        ],
			        options: {
				        specs: 'spec/index.js',
				        helpers: 'spec/helper.js',
				        template: require('grunt-template-jasmine-requirejs'),
				        templateOptions: {
					        requireConfigFile: './require.config.js'
				        }
			        }
		        }
	        }
        });

        // Cordova Tasks
        grunt.registerTask('cordova-prepare', 'Cordova prepare tasks', function () {
            var done = this.async();

            if (device.platform === 'all') {
                // Prepare all platforms
                cordova.prepare(done);
            } else {
                cordova.prepare(device.platform, done);
            }
        });

        grunt.registerTask('cordova-build', 'Cordova building tasks', function () {
            var done = this.async();

            if (device.platform === 'all') {
                // Build all platforms
                cordova.build(done);
            } else {
                cordova.build(device.platform, done);
            }
        });

        grunt.registerTask('cordova-run', 'Cordova running tasks', function () {
            var done = this.async();

            if (device.platform === 'all') {
                // Build all platforms
                cordova.run();
            } else {
                cordova.run(device.platform);
            }

            done();
        });

        grunt.registerTask('cordova-emulate', 'Cordova emulation tasks', function () {
            var done = this.async();

            if (device.platform === 'all') {
                // Emulate all platforms
                cordova.emulate();
            } else {
                if (device.platform === 'ios') {
                    grunt.task.run('shell:iossimstart');
                } else {
                    cordova.emulate(device.platform, function() {
                        grunt.task.run('cordova-emulate-end');
                    });
                }
            }

            done();
        });

        grunt.registerTask('cordova-serve', 'Cordova serve tasks', function () {
            var done = this.async();

            if (device.platform === 'all') {
                // Emulate all platforms
                grunt.fatal("Platform required. Eg. ` --platform=ios`");
            } else {
                cordova.serve(device.platform);
                done();
            }
        });

        grunt.registerTask('cordova-ripple', 'Cordova ripple tasks', function () {
            var done = this.async();

            if (device.platform === 'all') {
                // Emulate all platforms
                grunt.fatal("Platform required. Eg. ` --platform=ios`");
            } else {
                cordova.ripple(device.platform);
                done();
            }
        });

        grunt.registerTask('cordova-emulate-end', 'Cordova emulation tasks', function () {
            if (device.platform === 'all' || device.platform === 'ios') {
                grunt.task.run('shell:iossimend');
            }
        });

        grunt.registerTask('cordova-buildemulate', [
	        'package',
            'cordova-build',
            'cordova-emulate'
        ]);

        grunt.registerTask('cordova-buildrun', [
	        'package',
            'cordova-build',
            'cordova-run'
        ]);

        grunt.registerTask('cordova-prepareserve', [
	        'package',
            'cordova-prepare',
            'cordova-serve'
        ]);

        grunt.registerTask('serve', ['cordova-prepareserve', 'watch:liveserve']);
        grunt.registerTask('ripple', ['cordova-prepare', 'cordova-ripple', 'watch:liveripple']);

        grunt.registerTask('emulate', ['cordova-buildemulate']);
        grunt.registerTask('live-emulate', ['cordova-buildemulate', 'watch:liveemulate']);

        grunt.registerTask('device', ['cordova-buildrun']);
        grunt.registerTask('live-device', ['cordova-buildrun', 'watch:livedevice']);

        grunt.registerTask('default', ['serve']);

	    //
	    grunt.registerTask('package', 'prepare file for building', ['clean', 'requirejs', 'compass', 'copy'])



	    grunt.loadNpmTasks('grunt-contrib-requirejs');
	    grunt.loadNpmTasks('grunt-contrib-compass');
    };
}());

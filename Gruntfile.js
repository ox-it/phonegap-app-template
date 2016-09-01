(function () {
    'use strict';
    var cordova = require('cordova');
    
    var platforms = [
        'ios',
        'android@3.7.1'
        //add further platforms here
    ]
    

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
            platform: grunt.option('platform') || '',
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
                appfiles: {
                  files: [
                      'app/**/*',
                  ],
                  tasks: ['copy:dev']
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
                hcpserver: {
                    command: 'cordova-hcp server',
                    options: {
                      stderr: true,
                      stdout: true
                    }
                },
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
              src: ["www/*"],
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
						        "css/**",
						        "config.xml"
					        ],
					        dest:"www" },
				        {
					        src: ["index-built.html"],
					        dest: "www/index.html"
				        }
			        ]
		        },
            dev: {
              files: [
                {   expand: true,
                    src: ["app/**",
                        "css/**"
                        ],
                    dest: "www" },
                {   src: ["require.config.js"],
                    dest: "www/require.config.js" },
                {   src: ["index.html"],
                    dest: "www/index.html" }
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
	        },
            cordovacli: {
                options: {
                    path: '.',
                    cli: 'cordova',
                },
                build_ios: {
                    options: {
                        command: 'build',
                        platforms: ['ios']
                    }
                },
                build_android: {
                    options: {
                        command: 'build',
                        platforms: ['android']
                    }
                },
                ios: {
                    options: {
                        command: 'run',
                        args: ['--device'],
                        platforms: ['ios']
                    }
                },
                android: {
                    options: {
                        command: 'run',
                        args: ['--device'],
                        platforms: ['android']
                    }
                },
                emulate_android: {
                    options: {
                        command: 'run',
                        platforms: ['android']
                    }
                },
                emulate_ios: {
                    options: {
                        command: 'run',
                        platforms: ['ios']
                    }
                },
                add_platforms: {
                    options: {
                        command: 'platform',
                        action: 'add',
                        platforms: platforms 
                    }
                }
            }
        });
        
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.registerTask('default', ['shell']);
        
        grunt.registerTask('ios', [
            'package',
            'cordovacli:build_ios',
            'cordovacli:ios'
        ]);
        
        grunt.registerTask('android', [
            'package',
            'cordovacli:build_android',
            'cordovacli:android'
        ]);
        
        grunt.registerTask('ios-sim', [
            'package',
            'cordovacli:build_ios',
            'cordovacli:emulate_ios'
        ]);
        
        grunt.registerTask('android-sim', [
            'package',
            'cordovacli:build_android',
            'cordovacli:emulate_android'
        ]);

        grunt.registerTask('devbuild', "Copy app folder to www. Start the hot-push server", function(arg) {
           grunt.task.run('compass');
           grunt.task.run('clean');
           grunt.task.run('copy:dev');
           grunt.task.run('shell:hcpserver');
        });

        grunt.registerTask('devrun', "Run the app on the device, listen to hot-push server for changes", function(arg) {
          if (!arg) { arg='ios'; }
          grunt.task.run('cordovacli:' + arg);
          grunt.task.run('watch:appfiles');
        });
        
        grunt.registerTask('default', ['emulate']);

        grunt.registerTask('package', 'prepare file for building', ['clean', 'requirejs', 'compass', 'copy']);

        grunt.registerTask('platforms', 'cordovacli:add_platforms');

    };
}());

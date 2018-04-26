module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },
            build: ['Gruntfile.js', 'www/js/**/*.js']
        },
        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'www/js/dest/lib/appLibrary.min.js':[	'www/lib/js/angular/angular.min.js',
                                                    'www/lib/js/jquery/jquery-2.2.0.min.js',
                                                    'www/lib/js/jquery/jquery-ui.min.js',
                                                    'www/lib/ionic/js/ionic.bundle.min.js',
                                                    'www/lib/js/angularui/angular-ui-router.min.js',
                                                    'www/lib/js/angular/angular-animate.min.js',
                                                    'www/lib/js/angular/angular-touch.min.js',
                                                    'www/lib/js/angularDialog/ngDialog.min.js',
                                                    'www/lib/js/ngCordova/ng-cordova.min.js',
                                                    'www/lib/js/jquery/iscroll-probe.js',
                                                    'www/lib/js/jquery/StackBlur.js',
                                                    'www/lib/js/jquery/nsPopover.js',
                                                    'www/lib/js/ics.deps.min.js',
                                                    'www/lib/js/tooltip/tooltipster.bundle.min.js',
                                                    'www/lib/js/cryptojs/*.js'
										          ],
                    'www/js/dest/boot/appBootService.min.js':[ 'www/js/boot/mobileAppContext.js', 'www/js/boot/mobileAppService.js'],
                    'www/js/dest/services/appBasicUICordovaService.min.js':[ 'www/js/services/basic/*.js', 'www/js/services/ui/*.js', 'www/js/services/cordova/*.js'],
                    'www/js/dest/services/appEntities.min.js':  'www/js/services/entities/*.js',
                    'www/js/dest/services/appDataService.min.js':   'www/js/services/business/*.js',
                    'www/js/dest/directives/appDirectives.min.js':  'www/js/directives/*.js',
                    'www/js/dest/controllers/appControllers.min.js':    'www/js/controllers/**/*.js'
                }
            }
        },
      
        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'www/css/dest/appGenericLib.min.css': ['www/lib/css/angularDialog/ngDialog.css', 'www/lib/css/angularDialog/ngDialog-theme-default.css', 'www/css/common/animate.css', 'www/lib/css/tooltip/tooltipster.bundle.css'],
                    'www/css/dest/appCommonLib.min.css': ['www/css/common/common.css', 'www/css/common/controls.css', 'www/css/common/animation.css'],
                    'www/css/dest/style_android.min.css': ['www/css/common/mobile_fonts.css', 'www/css/android/*.css', 'www/css/tablet/style_tablet_16_9_10.css', 'www/css/tablet/style_tablet_4_3.css'],
                    'www/css/dest/style_ios.min.css': ['www/css/common/mobile_fonts.css', 'www/css/iphone/*.css', 'www/css/tablet/style_iPad.css'],
                    'www/css/dest/style_web.min.css': ['www/css/common/desktop_fonts.css', 'www/css/web/*.css']
                }
            }
        },
        
        /* Remove development code while making build */
        clean: {
            // Clean up common files
            js: ['www/js/controllers', 'www/js/services', 'www/js/directives'],
            css: ['www/css/android', 'www/css/common', 'www/css/iphone', 'www/css/tablet', 'www/css/web'],
            
            // Clean up for android
            /*css_dest: ['www/css/dest/style_ios.min.css', 'www/css/dest/style_web.min.css'],
            images: ['www/res/images/ios', 'www/res/images/web']*/
            
            // Clean up for iOS
            /*css_dest: ['www/css/dest/style_android.min.css', 'www/css/dest/style_web.min.css'],
            images: ['www/res/images/android', 'www/res/images/web']*/
            
            // clean up for Web
            css_dest: ['www/css/dest/style_android.min.css', 'www/css/dest/style_ios.min.css'],
            images: ['www/res/images/android', 'www/res/images/ios']
        },
        
        watch: {
            css: {
                files: ['www/css/**/*.css'],
                tasks: ['cssmin']
            },
            scripts: {
                files: ['www/js/**/*.js'],
                tasks: ['uglify']
            }
        }
    });

    // Load the plugin.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    
    // Registering css minification as a default task
	grunt.registerTask( 'default', [/*'jshint',*/ 'uglify', 'cssmin', 'clean']);
};
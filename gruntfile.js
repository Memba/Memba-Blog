//http://gruntjs.com/sample-gruntfile

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: ['src/styles/ap*.css'],
                dest: 'dist/styles/<%= pkg.name %>.css'
            },
            js: {
                options: {
                    separator: ';\n'
                },
                src: [/*'src/js/vendor/*.js',*/ 'src/js/app*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: 'dist/js/<%= pkg.name %>.map'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        /*
        qunit: {
            files: ['test/*.html']
        },
        */
        jshint: {
            files: ['gruntfile.js', 'src/js/app*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        kendo_lint: {
            files: ['src/js/app*.js']
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['src/styles/app.*.css']
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dist/styles/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
                }
            }
        }/*,
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'src/js/',
                    outdir: 'docs/yui/'
                }
            }
        }
        */
    });

    //File management
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Javascript
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kendo-lint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Styles
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //Documentation
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-blog');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'cssmin']);

};
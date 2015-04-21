//http://gruntjs.com/sample-gruntfile

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['src/styles/app.*.css']
            }
        },
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
        }
        /*
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


    //Javascript
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kendo-lint');

    //Styles
    grunt.loadNpmTasks('grunt-contrib-csslint');

    //Documentation
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('lint', ['jshint', 'kendo_lint', 'csslint']);
    grunt.registerTask('default', ['lint']);

};
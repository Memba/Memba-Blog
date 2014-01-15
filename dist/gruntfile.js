//http://gruntjs.com/sample-gruntfile

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        blog: {
            main: {
                options: {
                    newsRoot: 'dist/new',
                    archiveRoot: 'dist/archive'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-blog');
    grunt.registerTask('default', ['blog']);

};
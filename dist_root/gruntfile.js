//http://gruntjs.com/sample-gruntfile

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        blog: {
            main: {
                options: {
                    home: 'http://miniblog.memba.com', //The path to your Mini Blog Engine
                    newsRoot: 'new', //your news directory
                    archiveRoot: 'archive', //your archive directory
                    title: 'Memba Mini Blog Engine',
                    link: 'http://miniblog.memba.com',
                    description: 'A static blog engine which displays your markdown content live (What You Write Is What You Publish)',
                    copyright: 'Copyright (c) 2013-2014 Memba Sarl. All rights reserved.',
                    category: 'Web Development', //The default category for your blog posts
                    managingEditor: 'Memba'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-blog');
    grunt.registerTask('default', ['blog']);

};
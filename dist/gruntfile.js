//http://gruntjs.com/sample-gruntfile

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        blog: {
            main: {
                options: {
                    home: 'http://miniblog.memba.com', //The path to your Mini Blog Engine
                    newsRoot: 'news', //your news directory (with new blog posts)
                    postsRoot: 'posts', //your posts directory (with existing blog posts)
                    title: 'Memba Mini Blog Engine',
                    link: 'http://miniblog.memba.com/posts/index.rss',
                    description: 'A static blog engine which displays live markdown content (What You Write Is What You Publish)',
                    copyright: 'Copyright (c) 2013-2014 Memba Sarl. All rights reserved.',
                    category: 'Web Development', //The default category for your blog posts
                    managingEditor: 'Memba' //The default author for your blog posts
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-blog');
    grunt.registerTask('default', ['blog']);

};
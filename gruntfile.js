//http://gruntjs.com/sample-gruntfile

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        blog: {
            main: {
                options: {
                    homeRoot: 'src/',
                    newsRoot: 'src/news/',
                    postsRoot: 'src/posts/'
                }
            }
        },
        clean: ['dist/'],
        copy: {
            dist: {
                options: {
                    process: function(src, filepath) {
                        //Replace with min versions
                        var ret;
                        if (filepath === 'src/js/init.js'){
                            ret = src
                                .replace(/DEBUG[\s]*=[\s]*true/gm, 'DEBUG = false')
                                .replace(/init.js/gm, 'init.min.js');
                        }
                        return ret || src;
                    },
                    noProcess: ['**/*.{png,gif,jpg,ico,psd}'] //otherwise images are corrupeted
                },
                files: [
                    { cwd: 'dist_root', src: ['**'], dest: 'dist/', expand: true },
                    { cwd: 'src/posts', src: ['**'], dest: 'dist/posts', expand: true },
                    { cwd: 'src/pages', src: ['**'], dest: 'dist/pages', expand: true },
                    { cwd: 'src/js', src: ['init.js'], dest: 'dist/js', expand: true },
                    { cwd: 'src/js', src: ['vendor/bootstrap.min.js', 'vendor/highlight.min.js', 'vendor/marked.min.js', 'vendor/memba.widgets.min.js', 'vendor/memba.widgets.map', 'vendor/modernizr.min.js'], dest: 'dist/js', expand: true },
                    { cwd: 'src/styles', src: ['fonts/**'], dest: 'dist/styles', expand: true },
                    { cwd: 'src/styles', src: ['images/**'], dest: 'dist/styles', expand: true },
                    { cwd: 'src/styles', src: ['vendor/**/*.min.css', 'vendor/**/*.jpg', 'vendor/**/*.png'], dest: 'dist/styles', expand: true }
                ]
            }
        },
        concat: {
            css: {
                src: ['src/styles/app*.css'],
                dest: 'dist/styles/<%= pkg.name %>.css'
            },
            js: {
                options: {
                    separator: '\n;\n',
                    process: function(src /*, filepath*/) {
                        //Replace DEBUG = true with DEBUG = false
                        return src.replace(/DEBUG[\s]*=[\s]*true/gm, 'DEBUG = false');
                    }
                },
                src: ['src/js/app*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '// <%= pkg.name %> <%= pkg.version %> built on <%= grunt.template.today("dd-mm-yyyy") %> - <%= pkg.copyright %>\n'
            },
            dist: {
                files: [
                    { 'dist/js/init.min.js': ['src/js/init.js'] },
                    { 'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>'] }
                ]
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
                    banner: '/* <%= pkg.name %> <%= pkg.version %> built on <%= grunt.template.today("dd-mm-yyyy") %> - <%= pkg.copyright %> */\n'
                },
                files: {
                    'dist/styles/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
                }
            }
        }/*,
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    //removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                    //removeEmptyAttributes: true,
                    //removeOptionalTags: true,
                    //removeEmptyElements: true
                },
                files: {
                    'dist/index.html': 'src/index.html',
                    'dist/footer.tmpl.html': 'src/footer.tmpl.html',
                    'dist/header.tmpl.html': 'src/header.tmpl.html'
                }
            }
        },
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    //Javascript
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-kendo-lint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Styles
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //Html
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //Documentation
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-blog');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['blog', 'clean', 'jshint', 'qunit', 'copy', 'concat', 'uglify', 'cssmin', 'htmlmin']);

};
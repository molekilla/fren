/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/<%= pkg.title || pkg.name %>.js'],
                dest: 'dist/<%= pkg.title || pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        jasmine_node: {
            extensions: "js",
            specNameMatcher: "spec", // load only specs containing specNameMatcher
            projectRoot: ".",
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                savePath: "./build/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
            },
            all: ['/spec']
        },
        ts: {
            default: {
                files: [
                    {
                        expand: true,
                        //          cwd: "<%= cwd %>",
                        src: ["lib/**/*.ts"],
                        //          dest: "<%= cwd %>",
                        ext: ".js"
        }
    ],
                options: {
                    sourceMap: true,
                    module: 'commonjs'
                }
            }
        },
        babel: {
              es6: {
    files: [
        {
          expand: true,
//          cwd: "<%= cwd %>",
          src: ["lib/**/*.es6"],
//          dest: "<%= cwd %>",
          ext: ".js"
        }
    ],
    options: {
    }
  }
        },
        jasmine: {
            pivotal: {
                src: 'public/javascripts/*.js',
                options: {
                    specs: 'ui/spec/*Spec.js',
                    helpers: 'ui/spec/*Helper.js'
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('build', ['babel:es6']);
    grunt.registerTask('spec', ['jasmine_node', 'jasmine', 'jshint'])


};
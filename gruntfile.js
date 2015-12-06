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
                //src: ["**/*.ts", "!node_modules/**/*.ts"],
                files: [{ src: ["**/*.ts", "!node_modules/**/*.ts"], dest: 'lib/' }],
                options: {
                    fast: 'never',
                    //outDir: "lib/",
                    sourceMap: true,
                    module: 'commonjs',
                    declaration: true
                   // target: 'es6'
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
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('build', ['ts:default']);
    grunt.registerTask('spec', ['jasmine_node', 'jasmine'])


};

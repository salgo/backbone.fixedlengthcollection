/*global module:false*/

module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            files: ['<config:lint.files>',
                    'src/*.js',
                    'lib/*.js'],
            tasks: 'lint qunit'
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
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {}
        },
        jasmine: {
            src: ['lib/jquery.js',
                  'lib/json2.js',
                  'lib/underscore.js',
                  'lib/backbone.js',
                  'src/backbone.fixedlengthcollection.js'],
            specs: 'spec/*.js',
            timeout: 10000,
            junit: {
                output: 'junit/'
            },
            phantomjs: {
                'ignore-ssl-errors': true
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-runner');

    // Default task.
    grunt.registerTask('default', 'jasmine');

};

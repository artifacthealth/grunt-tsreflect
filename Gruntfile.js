module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-mocha-test");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.read("COPYRIGHT.txt"),

        clean: {
            build: {
                src: [
                    "build/",
                    "bin/lib.d.ts",
                    "bin/tsreflect.d.ts",
                    "bin/tsreflect.js"
                ]
            }
        },

        typescript: {
            build: {
                options: {
                    target: "es5",
                    sourceMap: true,
                    declaration: false,
                    noImplicitAny: true
                },
                src: ['src/tsreflect.ts'],
                dest: 'build/tsreflect.js'
            },
            tests: {
                options: {
                    target: "es5",
                    module: "commonjs",
                    sourceMap: true,
                    noImplicitAny: true,
                    basePath: 'tests/'
                },
                src: ['tests/run.ts'],
                dest: 'build/'
            }
        },

        concat: {
            build: {
                options: {
                    banner: grunt.file.read("COPYRIGHT.txt")
                },
                src: ['build/tsreflect.js'],
                dest: 'build/tsreflect.js'
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: [
                            'lib.d.ts'
                        ],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: [
                            'tsreflect.d.ts',
                            'lib.d.ts'
                        ],
                        dest: 'bin/'
                    },
                    {
                        expand: true,
                        cwd: 'build/',
                        src: [
                            'tsreflect.js'
                        ],
                        dest: 'bin/'
                    }
                ]
            }
        },

        watch: {
            typescript: {
                files: [
                    "src/**/*.ts",
                    "typings/**/*.ts"
                ],
                tasks: [ "typescript:build" ]
            }
        },

        mochaTest: {
            tests: {
                options: {
                    reporter: 'spec'
                },
                src: ['build/run.js']
            }
        }
    });

    // Default task(s).
    grunt.registerTask("default", [ "clean:build", "typescript:build", "concat:build", "copy:build" ]);
    grunt.registerTask("test", [ "typescript:tests", "mochaTest:tests" ]);
};
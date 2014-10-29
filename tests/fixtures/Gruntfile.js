module.exports = function(grunt) {

    grunt.loadTasks("../../tasks/");

    var config = grunt.file.readJSON("../cases/" + grunt.option('case') + ".json");
    grunt.initConfig(config);

    grunt.registerTask("default", [ "tsreflect" ]);
}
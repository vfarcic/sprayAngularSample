module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
        test: {
            src: [
                'bower_components/jasmine/lib/jasmine-core/jasmine.js',
                'bower_components/jasmine/lib/jasmine-core/jasmine-html.js',
                'bower_components/jasmine/lib/jasmine-core/boot.js',
                'bower_components/angular/angular.min.js',
                'bower_components/angular-route/angular-route.min.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/bootstrap/docs/assets/js/bootstrap.min.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'bower_components/ng-table/ng-table.min.js',
                'html/**/*.js'
            ],
            options: {
                specs: '../test/html/**/*.spec.js'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jasmine']);

};
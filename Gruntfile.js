module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
        test: {
            src: [
                'assets/javascripts/jasmine.js',
                'assets/javascripts/jasmine-html.js',
                'assets/javascripts/boot.js',
                'assets/javascripts/angular.min.js',
                'assets/javascripts/angular-route.min.js',
                'assets/javascripts/angular-mocks.js',
                'assets/javascripts/jquery.min.js',
                'assets/javascripts/bootstrap.min.js',
                'assets/javascripts/ui-bootstrap-tpls.min.js',
                'assets/javascripts/ng-table.min.js',
                'assets/html/**/*.js'
            ],
            options: {
                specs: 'test/html/**/*.spec.js'
            }
        }
    },
    watch: {
        files: ['assets/html/**/*.js', 'test/html/**/*.spec.js'],
        tasks: ['jasmine']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jasmine']);

};
module.exports = function (grunt) {

  grunt.initConfig({});

  grunt.config('webpack', require('./grunt/webpack.js'));
  grunt.loadNpmTasks('grunt-webpack');
  grunt.registerTask('dev', ['webpack']);

  grunt.config('react', require('./grunt/react.js'));
  grunt.loadNpmTasks('grunt-react');
  grunt.registerTask('build', ['react']);

};

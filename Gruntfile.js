module.exports = function (grunt) {

  grunt.initConfig({});

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-jsxhint-babel');
  grunt.loadNpmTasks('grunt-react');

  grunt.config('webpack', require('./grunt/webpack.js'));
  grunt.config('react', require('./grunt/react.js'));
  grunt.config('jshint', require('./grunt/jshint.js'));

  grunt.registerTask('dev', ['webpack']);
  grunt.registerTask('build', ['react']);

};

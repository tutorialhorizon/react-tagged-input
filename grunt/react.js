module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: 'src',
      src: ['**/*.jsx','**/*.js'],
      dest: 'dist',
      ext: '.js'
    }]
  },
  examples: {
    files: [{
      expand: true,
      cwd: 'examples',
      src: ['**/*.jsx'],
      dest: 'examples',
      ext: '.js'
    }]
  }
};

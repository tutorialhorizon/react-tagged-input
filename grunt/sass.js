module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: 'public/scss/',
      src: ['*.scss'],
      dest: 'public/stylesheets/',
      ext: '.css'
    }]
  }
};
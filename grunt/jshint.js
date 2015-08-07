module.exports = {
  foo: {
    src: ['src/*.jsx'],
    options: {
      expr: true,
      node: true,
      globals: {
        require: true
      }
    }
  }
};

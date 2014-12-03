var path = require('path'),
  CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  dev: {
    entry: {
      index: './examples/index.jsx',
    },
    output: {
      path: path.join(__dirname,'../examples'),
      filename: '[name].js'
    },
    stats: {
      // Configure the console output
      colors: true,
      modules: true,
      reasons: true
    },
    module: {
      loaders: [
        { jsx: /\.js$/, loader: 'jsx-loader' } // loaders can take parameters as a querystring
      ]
    },
    progress: true,
    keepalive: true,
    watch: true,
    watchDelay: 3000
  }
};

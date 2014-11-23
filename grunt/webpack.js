var path = require('path');

module.exports = {
  dev: {
    entry: {
        index: './grunt/webpack_entries/index.js'
    },
    output: {
        path: path.join(__dirname,'../public/js/build'),
        filename: 'bundle-[name].js'
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

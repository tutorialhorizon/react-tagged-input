var path = require('path');

module.exports = {
  dev: {
    entry: {
        index: './grunt/webpack_entries/index.js',
        anotherPage: './grunt/webpack_entries/anotherPage.js',
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
    progress: true,
    keepalive: true
  }
};
var jsdom = require('jsdom').jsdom;

// Based off http://www.hammerlab.org/2015/02/14/testing-react-web-apps-with-mocha/
module.exports = function(markup) {
  if (typeof document !== 'undefined') return;
  global.document = jsdom(markup || '');
  global.window = document.parentWindow;
  global.navigator = {
    userAgent: 'node.js'
  };
};

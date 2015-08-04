// require('../utils/testdom')('<html><body></body></html>');
var chai = require('chai');
var expect = chai.expect;
var TaggedInput;
var jsxTest;

describe('TaggedInput', function() {

  beforeEach(function () {
    require('../utils/testdom')('<html><body></body></html>');
    jsxTest = require('jsx-test');
    TaggedInput = require('../../src/TaggedInput.jsx');
  });

  it('returns an empty array when no initial args are passed', function () {
    var ti = jsxTest.renderComponent(TaggedInput);
    expect(ti.getTags()).to.deep.equal([]);
  });

  it('returns the array if nothing was modified', function () {
    var ti = jsxTest.renderComponent(TaggedInput, {
        tags: ['hello', 'world']
    });
    expect(ti.getTags()).to.deep.equal(['hello', 'world']);
  });

  it('adds tags when default delimiters are encountered', function () {
    var ti = jsxTest.renderComponent(TaggedInput, {
        tags: ['hello']
    });
    ti._handleChange({
      target: {value: 'world,'}
    });
    expect(ti.getTags()).to.deep.equal(['hello', 'world']);

    ti._handleChange({
      target: {value: 'again '}
    });
    expect(ti.getTags()).to.deep.equal(['hello', 'world', 'again']);
  });

});

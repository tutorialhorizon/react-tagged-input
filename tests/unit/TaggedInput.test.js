var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);
var jsxTest = require('jsx-test');
var TaggedInput = require('../../dist/TaggedInput');

describe('TaggedInput', function() {

  beforeEach(function () {
    require('../utils/testdom')('<html><body></body></html>');
  });

  it('returns an empty array when no initial args are passed', function () {
    var ti = jsxTest.renderComponent(TaggedInput);
    expect(ti.getTags()).to.deep.equal([]);
  });

  it('returns the array if nothing was modified', function () {
    var ti = jsxTest.renderComponent(TaggedInput, {
        tags: ['one', 'two']
    });
    expect(ti.getTags()).to.deep.equal(['one', 'two']);
  });

  it('adds tags when default delimiters are present in the input', function () {
    var ti = jsxTest.renderComponent(TaggedInput, {tags: ['one'] });

    ti._handleChange({target: {value: 'two,'} });
    expect(ti.getTags()).to.deep.equal(['one', 'two']);

    ti._handleChange({target: {value: 'three '} });
    expect(ti.getTags()).to.deep.equal(['one', 'two', 'three']);
  });

  describe('prop: unique', function () {
    it('disallows duplicate tags to be entered by default', function () {
      var ti = jsxTest.renderComponent(TaggedInput, {tags: ['one', 'two'] });
      ti._handleChange({target: {value: 'two,'} });
      expect(ti.getTags()).to.deep.equal(['one', 'two']);
    });

    it('allows duplicate tag entries if "unique" prop is set to "false"', function () {
      var ti = jsxTest.renderComponent(TaggedInput, {
        unique: false,
        tags: ['one', 'two']
      });
      ti._handleChange({target: {value: 'two,'} });
      expect(ti.getTags()).to.deep.equal(['one', 'two', 'two']);
    });

    it('invokes "unique" prop if it is a function to determine uniqueness', function () {
      var uniqueFn = sinon.stub().returns(true);
      var ti = jsxTest.renderComponent(TaggedInput, {
        unique: uniqueFn,
        tags: ['one']
      });
      ti._handleChange({target: {value: 'two,'} });

      expect(uniqueFn.calledWith(['one'], 'two')).to.be.true;
    });
  });

  describe('"onBeforeAddTag" and "onAddTag"', function () {
    it('invokes "onBeforeAddTag" before "onAddTag" with the correct args', function () {
      var onBeforeAddTag = sinon.stub().returns(true);
      var onAddTag = sinon.stub().returns(true);

      var ti = jsxTest.renderComponent(TaggedInput, {
        onBeforeAddTag: onBeforeAddTag,
        onAddTag: onAddTag,
        tags: ['one']
      });
      ti._handleChange({target: {value: 'two,'} });

      expect(onBeforeAddTag.calledWith('two')).to.be.true;
      expect(onAddTag.calledWith('two', ['one', 'two'])).to.be.true;
      expect(onBeforeAddTag.calledBefore(onAddTag)).to.be.true;
    });

    it('does not invoke "onAddTag" if "onBeforeAddTag" returns false', function () {
      var onBeforeAddTag = sinon.stub().returns(false);
      var onAddTag = sinon.stub();

      var ti = jsxTest.renderComponent(TaggedInput, {
        onBeforeAddTag: onBeforeAddTag,
        onAddTag: onAddTag,
        tags: ['one']
      });
      ti._handleChange({target: {value: 'two,'} });

      expect(onBeforeAddTag.called).to.be.true;
      expect(onAddTag.called).to.be.false;
    });
  });

  describe('"onBeforeRemoveTag" and "onRemoveTag"', function () {
    it('invokes "onBeforeRemoveTag" before "onRemoveTag" with the correct args', function () {
      var onBeforeRemoveTag = sinon.stub().returns(true);
      var onRemoveTag = sinon.stub().returns(true);

      var ti = jsxTest.renderComponent(TaggedInput, {
        onBeforeRemoveTag: onBeforeRemoveTag,
        onRemoveTag: onRemoveTag,
        tags: ['one', 'two']
      });
      ti._handleRemoveTag(1);

      expect(onBeforeRemoveTag.calledWith(1)).to.be.true;
      expect(onRemoveTag.calledWith('two', ['one'])).to.be.true;
      expect(onBeforeRemoveTag.calledBefore(onRemoveTag)).to.be.true;
    });

    it('does not invoke "onRemoveTag" if "onBeforeRemoveTag" returns false', function () {
      var onBeforeRemoveTag = sinon.stub().returns(false);
      var onRemoveTag = sinon.stub();

      var ti = jsxTest.renderComponent(TaggedInput, {
        onBeforeRemoveTag: onBeforeRemoveTag,
        onRemoveTag: onRemoveTag,
        tags: ['one', 'two']
      });
      ti._handleRemoveTag(1);

      expect(onBeforeRemoveTag.called).to.be.true;
      expect(onRemoveTag.called).to.be.false;
    });
  });

});

/**
 * @jsx React.DOM
 */

var React = require('react');

var delimiters = {' ': 'Space'};

var KEY_CODES = {
  ENTER: 13,
  BACKSPACE: 8
};

var wrapperStyles = {
  'borderWidth': '1px',
  'borderStyle': 'solid',
  'borderColor': '#dadada',
  'padding': '2px'
};

var tagItemStyles = {
  'display': 'inline-block',
  'marginLeft': '2px',
  'marginRight': '2px'
};

var inputFieldStyles = {
  'border':'none',
  'outline': 'none'
};

var DefaultTagComponent = React.createClass({

  render: function() {
    var self = this,
      p = self.props;

    return (
      <div className="tag" style={tagItemStyles}>
        {p.item}
      </div>
    );
  }

});

var TaggedInput = React.createClass({

  propTypes: {
    onAddTag: React.PropTypes.func,
    onRemoveTag: React.PropTypes.func,
    unique: React.PropTypes.bool
  },

  getInitialState: function () {
    return {
      tags: this.props.tags || [],
      unique: this.props.unique || true,
      currentInput: null
    };
  },

  render: function() {
    var self = this,
      s = self.state,
      p = self.props,
      tagComponents = [],
      i;

    var TagComponent = DefaultTagComponent;

    for (i = 0 ; i < s.tags.length; i++) {
      tagComponents.push(<TagComponent item={s.tags[i]} />);
    }

    var input = (
      <input type="text"
        style={inputFieldStyles}
        ref='input'
        onKeyUp={this._handleKeyUp}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        value={s.currentInput}>
      </input>
    );

    return (
      <div className="tagged-input-wrapper"
        onClick={self._handleClickOnWrapper}
        style={wrapperStyles}>
        {tagComponents}
        {input}
      </div>
    );
  },

  _handleKeyUp: function (e) {
    var self = this,
      s = self.state,
      p = self.props,
      enteredValue = e.target.value;

    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        self._validateAndTag(enteredValue);
        break;
    }
  },

  _handleKeyDown: function (e) {
    var self = this,
      s = self.state,
      p = self.props,
      poppedValue;

    switch (e.keyCode) {
      case KEY_CODES.BACKSPACE:
        if (!e.target.value || e.target.value.length < 0) {
          poppedValue = s.tags.pop();
          this.setState({
            currentInput: poppedValue
          });
          if (p.onRemoveTag) {
            p.onRemoveTag(poppedValue);
          }
        }
        break;
    }
  },

  _handleChange: function (e) {
    var self = this,
      s = self.state,
      p = this.props,
      value = e.target.value;
      lastChar = value.charAt(value.length - 1),
      tagText = value.substring(0, value.length - 1);

    if (delimiters[lastChar]) {
      self._validateAndTag(tagText);
    } else {
      this.setState({
        currentInput: e.target.value
      });
    }
  },

  _isUnique: function (tagText) {
    return (this.state.tags.indexOf(tagText) === -1);
  },

  _handleClickOnWrapper: function (e) {
    this.refs.input.getDOMNode().focus();
  },

  _validateAndTag: function (tagText) {
    var self = this,
      s = self.state,
      p = self.props;

    if (tagText && tagText.length > 0) {
      if (s.unique) {
        if (self._isUnique(tagText)) {
          s.tags.push(tagText);
          self.setState({currentInput: ''});
          if (p.onAddTag) {
            p.onAddTag(enteredValue);
          }
        }
      } else {
        s.tags.push(tagText);
        self.setState({currentInput: ''});
        if (p.onAddTag) {
          p.onAddTag(enteredValue);
        }
      }
    }
  },

  getTags: function () {
    return this.state.tags;
  }

});

module.exports = TaggedInput;

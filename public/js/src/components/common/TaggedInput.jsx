/**
 * @jsx React.DOM
 */

var React = require('react');

var delimiters = {' ': 'Space'};

var KEY_CODES = {
  ENTER: 13,
  BACKSPACE: 8
};

var tagItemStyles = {
  'display': 'inline-block',
  'marginLeft': '2px',
  'marginRight': '2px'
};

var DefaultTagComponent = React.createClass({

  render: function() {
    var self = this,
      p = self.props;

    return (
      <div style={tagItemStyles}>
        {p.item}
      </div>
    );
  }

});

var TaggedInput = React.createClass({

  propTypes: {
    onAddTag: React.PropTypes.func,
    onRemoveTag: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      tags: this.props.tags || [],
      currentInput: null
    };
  },

  render: function() {
    var self = this,
      s = self.state,
      p = self.props,
      tags = [],
      i;

    var TagComponent = p.tagComponent || DefaultTagComponent;

    for (i = 0 ; i < s.tags.length; i++) {
      tags.push(<TagComponent item={s.tags[i]} />);
    }

    var input = (
      <input type="text"
        ref='input'
        onKeyUp={this._handleKeyUp}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        value={s.currentInput}>
      </input>
    );

    return (
      <div className="tagged-input-wrapper">
        {tags}
        {input}
      </div>
    );
  },

  _handleKeyUp: function (e) {
    var s = this.state,
      enteredValue = e.target.value;

    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        s.tags.push(enteredValue);
        this.setState({
          currentInput: ''
        });
        if (p.onAddTag) {
          p.onAddTag(enteredValue);
        }
        break;
    }

  },

  _handleKeyDown: function (e) {
    var s = this.state,
      p = this.props,
      poppedValue;

    switch (e.keyCode) {
      case KEY_CODES.BACKSPACE:
        if (!e.target.value || e.target.value.length < 0) {
          poppedValue = s.tags.pop();
          this.forceUpdate();
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
      value = e.target.value;
      lastChar = value.charAt(value.length-1);

    if (delimiters[lastChar]) {
      s.tags.push(e.target.value.trim());
      this.setState({
        currentInput: ''
      });
    } else {
      this.setState({
        currentInput: e.target.value
      });
    }
  }

});

module.exports = TaggedInput;

/**
 * @jsx React.DOM
 */

var React = require('react');
var joinClasses = require('react/lib/joinClasses');

var KEY_CODES = {
  ENTER: 13,
  BACKSPACE: 8
};

var DefaultTagComponent = React.createClass({displayName: "DefaultTagComponent",
  render: function () {
    var self = this, p = self.props;

    return (
      React.createElement("div", {className: joinClasses("tag", p.classes)}, 
        React.createElement("div", {className: "tag-text", onClick: p.onEdit}, p.item), 
        React.createElement("div", {className: "remove", onClick: p.onRemove}, 
          p.removeTagLabel
        )
      )
      );
  }

});

var TaggedInput = React.createClass({displayName: "TaggedInput",
  propTypes: {
    onBeforeAddTag: React.PropTypes.func,
    onAddTag: React.PropTypes.func,
    onBeforeRemoveTag: React.PropTypes.func,
    onRemoveTag: React.PropTypes.func,
    onEnter: React.PropTypes.func,
    unique: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.func]),
    autofocus: React.PropTypes.bool,
    backspaceDeletesWord: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    tags: React.PropTypes.arrayOf(React.PropTypes.any),
    removeTagLabel: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    delimiters: React.PropTypes.arrayOf(function (props, propName, componentName) {
      if (typeof props[propName] !== 'string' || props[propName].length !== 1) {
        return new Error('TaggedInput prop delimiters must be an array of 1 character strings')
      }
    }),
    tagOnBlur: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    clickTagToEdit: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      delimiters: [' ', ','],
      unique: true,
      autofocus: false,
      backspaceDeletesWord: true,
      tagOnBlur: false,
      clickTagToEdit: false,
      onBeforeAddTag: function (tag) {
        return true;
      },
      onBeforeRemoveTag: function (index) {
        return true;
      }
    };
  },

  getInitialState: function () {
    return {
      tags: (this.props.tags || []).slice(0),
      currentInput: null
    };
  },

  render: function () {
    var self = this, s = self.state, p = self.props;

    var tagComponents = [],
      classes = "tagged-input-wrapper",
      placeholder,
      i;

    if (p.classes) {
      classes += ' ' + p.classes;
    }

    if (s.tags.length === 0) {
      placeholder = p.placeholder;
    }

    var TagComponent = DefaultTagComponent;

    for (i = 0; i < s.tags.length; i++) {
      tagComponents.push(
        React.createElement(TagComponent, {
          key: 'tag' + i, 
          item: s.tags[i], 
          itemIndex: i, 
          onRemove: self._handleRemoveTag.bind(this, i), 
          onEdit: p.clickTagToEdit ? self._handleEditTag.bind(this, i) : null, 
          classes: p.unique && (i === s.duplicateIndex) ? 'duplicate' : '', 
          removeTagLabel: p.removeTagLabel || "\u274C"}
        )
      );
    }

    var input = (
      React.createElement("input", {type: "text", 
        className: "tagged-input", 
        ref: "input", 
        onKeyUp: this._handleKeyUp, 
        onKeyDown: this._handleKeyDown, 
        onChange: this._handleChange, 
        onBlur: this._handleBlur, 
        value: s.currentInput, 
        placeholder: placeholder, 
        tabIndex: p.tabIndex}
      )
      );

    return (
      React.createElement("div", {className: classes, onClick: self._handleClickOnWrapper}, 
        tagComponents, 
        input
      )
      );
  },

  componentDidMount: function () {
    var self = this, s = self.state, p = self.props;

    if (p.autofocus) {
      self.refs.input.getDOMNode().focus();
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      tags: nextProps.tags
    })
  },

  _handleRemoveTag: function (index) {
    var self = this, s = self.state, p = self.props;

    if (p.onBeforeRemoveTag(index)) {
      var removedItems = s.tags.splice(index, 1);

      if (s.duplicateIndex) {
        self.setState({duplicateIndex: null}, function () {
          if (p.onRemoveTag) {
            p.onRemoveTag(removedItems[0]);
          }
        });
      } else {
        if (p.onRemoveTag) {
          p.onRemoveTag(removedItems[0]);
        }
        self.forceUpdate();
      }
    }
  },

  _handleEditTag: function (index) {
    var self = this, s = self.state, p = self.props;

    if (s.currentInput) {
      var trimmedInput = s.currentInput.trim();
      if (trimmedInput && (this.state.tags.indexOf(trimmedInput) < 0 || !p.unique)) {
        this._validateAndTag(s.currentInput);
      }
    }
    var removedItems = s.tags.splice(index, 1);
    if (s.duplicateIndex) {
      self.setState({duplicateIndex: null, currentInput: removedItems[0]}, function () {
        if (p.onRemoveTag) {
          p.onRemoveTag(removedItems[0]);
        }
      });
    } else {
      self.setState({currentInput: removedItems[0]}, function () {
        if (p.onRemoveTag) {
          p.onRemoveTag(removedItems[0]);
        }
      });
    }
  },

  _handleKeyUp: function (e) {
    var self = this, s = self.state, p = self.props;

    var enteredValue = e.target.value;

    switch (e.keyCode) {
      case KEY_CODES.ENTER:
        if (s.currentInput) {
          self._validateAndTag(s.currentInput, function (status) {
            if (p.onEnter) {
              p.onEnter(e, s.tags);
            }
          });
        }
        break;
    }
  },

  _handleKeyDown: function (e) {
    var self = this,
      s = self.state,
      p = self.props,
      poppedValue,
      newCurrentInput;

    switch (e.keyCode) {
      case KEY_CODES.BACKSPACE:
        if (!e.target.value || e.target.value.length < 0) {
          if (p.onBeforeRemoveTag(s.tags.length - 1)) {
            poppedValue = s.tags.pop();

            newCurrentInput = p.backspaceDeletesWord ? '' : poppedValue;

            this.setState({
              currentInput: newCurrentInput,
              duplicateIndex: null
            });
            if (p.onRemoveTag && poppedValue) {
              p.onRemoveTag(poppedValue);
            }
          }
        }
        break;
    }
  },

  _handleChange: function (e) {
    var self = this, s = self.state, p = self.props;

    var value = e.target.value,
      lastChar = value.charAt(value.length - 1),
      tagText = value.substring(0, value.length - 1);

    if (p.delimiters.indexOf(lastChar) !== -1) {
      self._validateAndTag(tagText);
    } else {
      this.setState({
        currentInput: e.target.value
      });
    }
  },

  _handleBlur: function (e) {
    if (this.props.tagOnBlur) {
      var value = e.target.value;
      if (value) {
        this._validateAndTag(value)
      }
    }
  },

  _handleClickOnWrapper: function (e) {
    this.refs.input.getDOMNode().focus();
  },

  _validateAndTag: function (tagText, callback) {
    var self = this, s = self.state, p = self.props;
    var duplicateIndex;
    var trimmedText;

    if (tagText && tagText.length > 0) {
      trimmedText = tagText.trim();
      if (p.unique) {

        // not a boolean, it's a function
        if (typeof p.unique === 'function') {
          duplicateIndex = p.unique(this.state.tags, trimmedText);
        } else {
          duplicateIndex = this.state.tags.indexOf(trimmedText);
        }

        if (duplicateIndex === -1) {
          if (!p.onBeforeAddTag(trimmedText)) {
            return;
          }

          s.tags.push(trimmedText);
          self.setState({
            currentInput: '',
            duplicateIndex: null
          }, function () {
            if (p.onAddTag) {
              p.onAddTag(tagText);
            }
            if (callback) {
              callback(true);
            }
          });
        } else {
          self.setState({duplicateIndex: duplicateIndex}, function () {
            if (callback) {
              callback(false);
            }
          });
        }
      } else {
        if (!p.onBeforeAddTag(trimmedText)) {
          return;
        }

        s.tags.push(trimmedText);
        self.setState({currentInput: ''}, function () {
          if (p.onAddTag) {
            p.onAddTag(tagText);
          }
          if (callback) {
            callback(true);
          }
        });
      }
    }
  },

  getTags: function () {
    return this.state.tags;
  },

  getEnteredText: function () {
    return this.state.currentInput;
  },

  getAllValues: function () {
    var self = this, s = this.state, p = this.props;

    if (s.currentInput && s.currentInput.length > 0) {
      return this.state.tags.concat(s.currentInput);
    } else {
      return this.state.tags;
    }
  }

});

module.exports = TaggedInput;

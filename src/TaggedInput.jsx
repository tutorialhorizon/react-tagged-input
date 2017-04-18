'use-strict';
var React = require('react');
var TagComponent = require('./TagComponent');

var KEY_CODES = {
  ENTER: 13,
  BACKSPACE: 8
};

var styles = {
  tagRootContainerStyle: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#dadada',
    padding: '2px',
  },
  inputStyle: {
    border: 'none',
    outline: 'none'
  }
}

module.exports = React.createClass({
  displayName: 'TaggedInput',

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
    clickTagToEdit: React.PropTypes.bool,
    tagRootContainerStyle: React.PropTypes.object,
    tagContainerStyle: React.PropTypes.object,
    tagTextStyle: React.PropTypes.object,
    tagRemoveStyle: React.PropTypes.object,
    inputStyle: React.PropTypes.object
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

    for (i = 0; i < s.tags.length; i++) {
      tagComponents.push(
        <TagComponent
          key={'tag' + i}
          item={s.tags[i]}
          itemIndex={i}
          onRemove={self._handleRemoveTag.bind(this, i)}
          onEdit={p.clickTagToEdit ? self._handleEditTag.bind(this, i) : null}
          duplicated={p.unique && (i === s.duplicateIndex)}
          removeTagLabel={p.removeTagLabel || "\u274C"}
          tagContainerStyle={p.tagContainerStyle}
          tagTextStyle={p.tagTextStyle}
          tagRemoveStyle={p.tagRemoveStyle}
          duplicatedColor={p.duplicatedColor}
        />
      );
    }

    var input = (
      <input type="text"
        className="tagged-input"
        style={Object.assign({}, styles.inputStyle, p.inputStyle || {})}
        ref="input"
        onKeyUp={this._handleKeyUp}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        onBlur={this._handleBlur}
        value={s.currentInput}
        placeholder={placeholder}
        tabIndex={p.tabIndex}>
      </input>
      );

    var tagRootContainerStyle = Object.assign({}, styles.tagRootContainerStyle , p.tagRootContainerStyle || {});

    return (
      <div className={classes} style={tagRootContainerStyle} onClick={self._handleClickOnWrapper}>
        {tagComponents}
        {input}
      </div>
      );
  },

  componentDidMount: function () {
    var self = this, s = self.state, p = self.props;

    if (p.autofocus) {
      self.refs.input;
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      tags: (nextProps.tags || []).slice(0)
    })
  },

  _handleRemoveTag: function (index) {
    var self = this, s = self.state, p = self.props;

    if (p.onBeforeRemoveTag(index)) {
      var removedItems = s.tags.splice(index, 1);

      if (s.duplicateIndex) {
        self.setState({duplicateIndex: null}, function () {
          p.onRemoveTag && p.onRemoveTag(removedItems[0], s.tags);
        });
      } else {
        p.onRemoveTag && p.onRemoveTag(removedItems[0], s.tags);
        self.forceUpdate();
      }
    }
  },

  _handleEditTag: function (index) {
    var self = this, s = self.state, p = self.props;
    var removedItems;

    if (s.currentInput) {
      var trimmedInput = s.currentInput.trim();
      if (trimmedInput && (this.state.tags.indexOf(trimmedInput) < 0 || !p.unique)) {
        this._validateAndTag(s.currentInput);
      }
    }

    removedItems = s.tags.splice(index, 1);
    if (s.duplicateIndex) {
      self.setState({duplicateIndex: null, currentInput: removedItems[0]}, function () {
        p.onRemoveTag && p.onRemoveTag(removedItems[0]);
      });
    } else {
      self.setState({currentInput: removedItems[0]}, function () {
        p.onRemoveTag && p.onRemoveTag(removedItems[0]);
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
    var self = this, s = self.state, p = self.props;
    var poppedValue, newCurrentInput;

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
              p.onRemoveTag(poppedValue, s.tags);
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
      value && this._validateAndTag(value);
    }
  },

  _handleClickOnWrapper: function (e) {
    this.refs.input.focus();
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
            p.onAddTag && p.onAddTag(tagText, s.tags);
            callback && callback(true);
          });
        } else {
          self.setState({duplicateIndex: duplicateIndex}, function () {
            callback && callback(false);
          });
        }
      } else {
        if (!p.onBeforeAddTag(trimmedText)) {
          return;
        }

        s.tags.push(trimmedText);
        self.setState({currentInput: ''}, function () {
          p.onAddTag && p.onAddTag(tagText);
          callback && callback(true);
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

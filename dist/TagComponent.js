'use-strict';
var React = require('react');

var styles = {
  tagContainerStyle: {
    display: 'inline-block',
    backgroundColor: '#E9E9E9',
    padding: '2px 0px 2px 2px',
    borderRadius: '2px',
    marginLeft: '2px',
    marginRight: '2px'
  },
  duplicatedColor: {
    backgroundColor: '#FFDB7B'
  },
  tagTextStyle: {
    paddingLeft: '5px',
    display: 'inline-block'
  },
  tagRemoveStyle: {
    color: '#a0a0a0',
    padding: '0px 4px',
    fontSize: '75%',
    lineHeight: '100%',
    cursor: 'pointer',
    display: 'inline-block'
  }
};

module.exports = React.createClass({
  displayName: 'TagComponent',

  propTypes: {
    classes: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    item: React.PropTypes.string,
    onRemove: React.PropTypes.func,
    removeTagLabel: React.PropTypes.string,
    duplicated: React.PropTypes.bool,
    tagContainerStyle: React.PropTypes.object,
    tagTextStyle: React.PropTypes.object,
    tagRemoveStyle: React.PropTypes.object
  },

  _getTagContainerStyle: function () {
    var p = this.props;
    var duplicatedBacgroundColor = p.duplicated ? {backgroundColor: p.duplicatedColor || styles.duplicatedColor.backgroundColor} : {};
    return Object.assign({}, styles.tagContainerStyle, p.tagContainerStyle || {}, duplicatedBacgroundColor);
  },

  render: function () {
    var p = this.props;
    var className = 'tag' + (p.classes ? (' ' + p.classes) : '');
    var tagTextStyle = Object.assign({}, styles.tagTextStyle, p.tagTextStyle || {});
    var tagRemoveStyle = Object.assign({}, styles.tagRemoveStyle, p.tagRemoveStyle || {});

    return (
      React.createElement("div", {className: className, style: this._getTagContainerStyle()}, 
        React.createElement("div", {className: "tag-text", style: tagTextStyle, onClick: p.onEdit}, p.item), 
        React.createElement("div", {className: "remove", style: tagRemoveStyle, onClick: p.onRemove}, 
          p.removeTagLabel
        )
      )
    );
  }
});


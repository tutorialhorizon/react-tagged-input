/**
 * @jsx React.DOM
 */

var React = require('react'),
  TaggedInput = require('../dist/TaggedInput.js'),
  mountPoint = document.querySelector('body');

React.render(
  <TaggedInput
    autofocus={true}
    backspaceDeletesWord={true}
    placeholder={'Name some fruits'}
    unique={true}
    onBeforeAddTag={function() { return true; }}
    onAddTag={function() { console.log('Tag added', arguments); }}
    onBeforeRemoveTag={function() { return false; }}
    onRemoveTag={function() { console.log('Tag removed', arguments); }}
    tags={['one', 'two', 'three']}
  />,
mountPoint );

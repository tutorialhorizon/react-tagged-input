/**
 * @jsx React.DOM
 */

var React = require('react'),
  TaggedInput = require('../src/TaggedInput.jsx'),
  mountPoint = document.querySelector('body');

React.render(
  <TaggedInput
    autofocus={true}
    backspaceDeletesWord={true}
    placeholder={'Name some fruits'}
  />,
  mountPoint );

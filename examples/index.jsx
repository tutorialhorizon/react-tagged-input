/**
 * @jsx React.DOM
 */

var React = require('react'),
  TaggedInput = require('../dist/TaggedInput'),
  mountPoint = document.querySelector('body');

React.render(
  <TaggedInput
    autofocus={true}
    backspaceDeletesWord={true}
  />,
  mountPoint );

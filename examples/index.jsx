/**
 * @jsx React.DOM
 */

var React = require('react'),
  TaggedInput = require('../dist/TaggedInput'),
  mountPoint = document.querySelector('body');

React.renderComponent( <TaggedInput autofocus={true} /> , mountPoint );

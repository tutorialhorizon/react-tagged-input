/**
 * @jsx React.DOM
 */

var React = require('react'),
  TaggedInput = require('../dist/TaggedInput.js'),
  mountPoint = document.querySelector('body');

function tagAdded (tag) {
  console.log(tag);
}

React.render(
  <TaggedInput
    autofocus={true}
    backspaceDeletesWord={true}
    placeholder={'Name some fruits'}
    onAddTag={tagAdded}
    unique={true}
  />,
mountPoint );

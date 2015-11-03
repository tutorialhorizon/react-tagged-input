var React = require('react'),
  ReactDOM = require('react-dom'),
  TaggedInput = require('../dist/TaggedInput.js'),
  mountPoint = document.querySelector('#app');

ReactDOM.render(
  <TaggedInput
    autofocus={true}
    backspaceDeletesWord={true}
    placeholder={'Name some fruits'}
    unique={true}
    onBeforeAddTag={function() { return true; }}
    onAddTag={function() { console.log('Tag added', arguments); }}
    onBeforeRemoveTag={function() { return true; }}
    onRemoveTag={function() { console.log('Tag removed', arguments); }}
    tags={['one', 'two', 'three']}
  />,
mountPoint );

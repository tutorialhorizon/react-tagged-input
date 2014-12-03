# react-tagged-input

Convert your ordinary text fields with a component that lets you render tags for each input word.

See the component proptypes in the src/ directory any more options.

More docs and features are on the way. Pull requests are welcome.

---
Install

```sh
npm install react-tagged-input
```

---

##Usage

```js
var React = require('react'),
  TaggedInput = require('react-tagged-input'),
  mountPoint = document.querySelector('body');

React.render(
  <TaggedInput
    autofocus={true} // Gives the component focus after it mounts
    backspaceDeletesWord={true} // false deletes one character at a time
    placeholder={'Your favorite npm modules'}
    onEnter={/*function*/}
    onAddTag={/*function*/} // argument - tag that was added
    onRemoveTag={/*function*/} // argument - tag that got removed
    unique={true} // Whether duplicate entries are allowed
  />,
  mountPoint );
```

---
###Dev

Before you begin editing the source component, just run the following grunt task that watches for your changes to the examples as well as the component.

```sh
grunt dev
```

## License

[MIT](LICENSE)

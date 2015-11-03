# react-tagged-input

A react component that lets you enter text and converts them to tags.
Pull requests are welcome.

[![Build Status](https://travis-ci.org/tutorialhorizon/react-tagged-input.svg)](https://travis-ci.org/tutorialhorizon/react-tagged-input)

---

### Install

```sh
npm install react-tagged-input
```

---

### Example

To see it in action, run the following npm script command that watches for your changes to the `/examples` as well as the component.

```sh
npm run dev
```

---

### Contributing

If you intend to contribute, make your changes, then do 

```sh
npm run build
```

---

### Usage

To use the default styles for this component, you can include [these styles](https://github.com/tutorialhorizon/react-tagged-input/blob/master/css/react-tagged-input.css) and namespace them appropriately using the `classes` property as shown below to customize them as per your liking.

Space and comma act as the default delimiters for user input.
Customise this with the `delimiters` prop, which should be set to an array of 1 character strings.

```js
var React = require('react'),
  ReactDOM = require('react-dom'),
  TaggedInput = require('react-tagged-input'),
  mountPoint = document.querySelector('body');

ReactDOM.render(
  <TaggedInput
    autofocus={true} // Gives the component focus after it mounts
    backspaceDeletesWord={true} // false deletes one character at a time
    placeholder={'Your favorite npm modules'}
    tags={['javascript', 'react']} // pre-assigned tags
    onEnter={/*function*/}
    onAddTag={/*function*/} // argument - tag that was added
    onRemoveTag={/*function*/} // argument - tag that got removed
    tagOnBlur={false}          // If true, creates a tag from any text entered when input box loses focus
    clickTagToEdit={false}          // If true, enables tag editing by clicking the tag text
    unique={true} // Whether duplicate entries are allowed, or a callback
    classes={'my-css-namespace'}
    removeTagLabel={"\u274C"} // Unicode of a symbol or an Object click to delete tags. Defaults to 'x',
    onBeforeAddTag={function (tagText) {return true;}} // Returning true from this function causes the tag to itself handle adding tags. Return false if you want a parent to pass in updated tags in props.
    onBeforeRemoveTag={function (tagText) {return true;}} // Returning true causes the tag to itself handle removing tags. Return false if you want a parent to pass in updated tags in props.
  />,
  mountPoint );
```

---

### API

#### getTags
Retrieves the tags as an array.

#### autofocus
If set to `true`, gives the component focus when it is mounted.
Default value - `true`

#### backspaceDeletesWord
If set to `true`, pressing the backspace when the cursor is at the boundary of a tag will delete the whole word. Setting it to `false` will delete one character at a time, just like regular backspace.
Default value - `true`

#### placeholder
Just the placeholder text

#### tags
An array of tags that you want to pre-fill the input field with.

#### getEnteredText
Retrieves the text from the input before it is entered as a tag.

#### getAllValues
Retrieves the tags as an array with input text concatenated if it exists.

#### unique
If the unique prop is set to be a function it will be called to obtain the duplicate index. The function will receive the array of
current tags and the new tag to be added. The function should return the index of the duplicate tag, or -1 if there the new tag does not have a duplicate. This can be used to do custom comparisons for uniqueness.

#### onEnter
Type: function

#### onAddTag
Type: function:
Takes and argument - tag that was added

#### onRemoveTag
Type: function
Takes and argument - tag that got removed

#### tagOnBlur
Default Vale: false
If set to true, creates a tag from any text entered when input box loses focus

#### clickTagToEdit
Default Value: false
If true, enables tag editing by clicking the tag text

#### unique
Default Value: true
Whether duplicate entries are allowed, or a callback

#### classes
Type: String
The CSS classname you want to apply to the component

#### removeTagLabel
Default Value: "\u274C"
Unicode of a symbol or an Object click to delete tags. By default, looks like an 'x'.

#### onBeforeAddTag
Type: function
function (tagText) {return true;}}
Returning true from this function causes the Component to continue handle adding tags. Return false if you want a parent to pass down updated tags in the props.

#### onBeforeAddTag
Type: function
function (tagText) {return true;}}
Returning true causes the Component to continue handle removing tags. Return false if you want a parent to pass down updated tags in the props.

---

## License

[MIT](LICENSE)

var React = require('react'),
	// Require the appropriate top level component
	Page = require('./components/anotherPage/Page'),
	mountPoint = document.querySelector('body');

React.renderComponent( Page(null) , mountPoint );
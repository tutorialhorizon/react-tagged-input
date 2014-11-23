var React = require('react'),
	// Require the appropriate top level component
	Page = require('./components/index/Page'),
	mountPoint = document.querySelector('body');

React.renderComponent( Page(null) , mountPoint );
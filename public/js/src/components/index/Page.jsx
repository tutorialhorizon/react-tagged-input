/**
 * @jsx React.DOM
 */

var React = require('react'),
	Hello = require('../common/Hello');

var Page = React.createClass({

	render: function() {

		return (
			<div>
					<Hello messageText="Index Page" />
			</div>
		);
		
	}

});

module.exports = Page;
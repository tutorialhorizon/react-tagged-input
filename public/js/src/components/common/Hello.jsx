/**
 * @jsx React.DOM
 */

var React = require('react');

var Hello = React.createClass({
	
	render: function() {

		return (
			<div>Hello from: {this.props.messageText}</div>
		);
	}

});

module.exports = Hello;
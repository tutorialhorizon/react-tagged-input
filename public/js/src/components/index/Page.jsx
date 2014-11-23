/**
 * @jsx React.DOM
 */

var React = require('react'),
	TaggedInput = require('../common/TaggedInput');

var Page = React.createClass({

	render: function() {

		return (
			<div>
					<TaggedInput />
			</div>
		);

	}

});

module.exports = Page;

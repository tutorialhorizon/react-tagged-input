/**
 * @jsx React.DOM
 */

var React = require('react'),
	TaggedInput = require('../common/TaggedInput');

var Page = React.createClass({

	render: function() {

		return (
			<div>
					<TaggedInput autofocus={true} />
			</div>
		);

	}

});

module.exports = Page;

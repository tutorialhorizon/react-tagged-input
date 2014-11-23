module.exports = {
	jsx: {
		files: [{
			expand: true,
			cwd: 'public/js/src',
			src: ['**/*.jsx','**/*.js'],
			dest: 'public/js/build',
			ext: '.js'
		}]
	}
};
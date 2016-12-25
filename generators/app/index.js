var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('babel');
	}

	method1() {
		console.log('method 1 just ran, wohoo');
	}

	method2() {
		console.log('method 2 just ran');
	}
};

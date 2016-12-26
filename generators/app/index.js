'use strict';

var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('babel');
	}

	prompting() {
		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message : 'Your project name',
			default : this.appname // Default to current folder name
		}, {
			type    : 'confirm',
			name    : 'cool',
			message : 'Would you like to enable the Cool feature?'
		}]).then((answers) => {
			this.log('app name', answers.name);
			this.log('cool feature', answers.cool);
		});
	}

	createProjectFileSystem() {
		const destRoot = this.destinationRoot();
		const appDir = path.join(destRoot, 'app');

		mkdirp(path.join(appDir, 'scripts'));
		mkdirp(path.join(appDir, 'img'));
	}

	method2() {
		this.log('method 2 just ran');
	}
};

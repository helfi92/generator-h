'use strict';

var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.option('babel');
	}

	_prompting() {
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

	_createProjectFileSystem() {
		const destRoot = this.destinationRoot();
		const sourceRoot = this.sourceRoot();
		const appDir = path.join(destRoot, 'app');

		mkdirp(path.join(appDir, 'scripts'));
		mkdirp(path.join(appDir, 'img'));

		this.fs.copy(path.join(sourceRoot, '.bowerrc'), path.join(destRoot, '.bowerrc'));
		this.fs.copy(path.join(sourceRoot, 'bower.json'), path.join(destRoot, 'bower.json'));
		this.fs.copy(path.join(sourceRoot, 'package.json'), path.join(destRoot, 'package.json'));
	}


	initializing() {
		const message = chalk.yellow.bold('Welcome to generator-h \n') + chalk.yellow('A solid JS stack to develop with');
		this.log(yosay(message, { maxLength: 17 }));
	}

	configuring() {
		this.log('configuring');
		this.config.save();
	}

	writing() {
		this.log('writing');
		this._createProjectFileSystem();
	}

	install() {
		this.log('install');
		this.bowerInstall();
		this.npmInstall();
	}
};

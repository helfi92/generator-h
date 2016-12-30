'use strict';

var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
		this.option('sass', { desc: 'Use classic SASS syntax instead of SCSS' });
		this.option('babel');
	}

	prompting() {
		const done = this.async();

		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message : 'Your project name',
			default : this.appname, // Default to current folder name
			store   : true
		}, {
			type    : 'input',
			name    : 'version',
			message : 'What is the version of your project?',
			default : '0.0.0',
		}, {
			type    : 'input',
			name    : 'author',
			message : 'Author?',
			default : this.appname,
			store   : true
		}, {
			type    : 'input',
			name    : 'description',
			message : 'What is a description of your project?',
			default : 'generator-h is awesome'
		}, {
			type    : 'input',
			name    : 'license',
			message : 'How is your project licensed?',
			default : 'MIT',
			store   : true
		}]).then((answers) => {
			this.appname = answers.name;
			this.appauthor = answers.author;
			this.appversion = answers.version;
			this.appdescription = answers.description;
			this.applicense = answers.license;
			done();
		});
	}

	_createProjectFileSystem() {
		const destRoot = this.destinationRoot();
		const sourceRoot = this.sourceRoot();
		const appDir = path.join(destRoot, 'app');
		const templateContext = {
			appname: this.appname,
			appdescription: this.appdescription,
			appversion: this.appversion,
			applicense: this.applicense,
			appauthor: this.appauthor,
			appmail: this.appmail
		};

		this.fs.copy(path.join(sourceRoot, '.babelrc'), path.join(destRoot, '.babelrc'));
		this.fs.copyTpl(path.join(sourceRoot, 'package.json'), path.join(destRoot, 'package.json'), templateContext);
		this.fs.copyTpl(path.join(sourceRoot, 'README.md'), path.join(destRoot, 'README.md'), templateContext);
		this.fs.copy(path.join(sourceRoot, 'webpack.config.js'), path.join(destRoot, 'webpack.config.js'));

		// SRC folder
		this.fs.copy(path.join(sourceRoot, 'src', 'index.html'), path.join(destRoot, 'src', 'index.html'));
		this.fs.copy(path.join(sourceRoot, 'src', 'app.jsx'), path.join(destRoot, 'src', 'app.jsx'));
		this.fs.copy(path.join(sourceRoot, 'src', 'partial.jsx'), path.join(destRoot, 'src', 'partial.jsx'));
		this.fs.copy(path.join(sourceRoot, 'src', 'img', 'bay-bridge.png'), path.join(destRoot, 'src', 'img', 'bay-bridge.png'));
		this.fs.copy(path.join(sourceRoot, 'src', 'style', 'globalStyle.css'), path.join(destRoot, 'src', 'style', 'globalStyle.css'));
	}


	initializing() {
		const message = chalk.yellow.bold('Welcome to generator-h \n') + chalk.yellow('A solid JS stack to develop with');
		this.log(yosay(message, { maxLength: 17 }));
	}

	configuring() {
		this.config.save();
	}

	writing() {
		this._createProjectFileSystem();
	}

	install() {
		this.npmInstall();
	}
};

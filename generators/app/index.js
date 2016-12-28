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
			this.appversion = answers.version;
			this.appdescription = answers.description;
			this.applicense = answers.license;
			this.log('app name', answers.name);
			this.log('cool feature', answers.cool);
			done();
		});
	}

	_createProjectFileSystem() {
		const destRoot = this.destinationRoot();
		const sourceRoot = this.sourceRoot();
		const appDir = path.join(destRoot, 'app');
		const sassFileExtension = this.options.sass ? '.sass' : '.scss';
		const templateContext = {
			appname: this.appname,
			appdescription: this.appdescription,
			appversion: this.appversion,
			applicense: this.applicense,
			appauthor: this.appauthor,
			appmail: this.appmail
		};

		mkdirp(path.join(appDir, 'scripts'));
		mkdirp(path.join(appDir, 'img'));
		mkdirp(path.join(appDir, 'sass'));

		this.fs.copy(path.join(sourceRoot, '.bowerrc'), path.join(destRoot, '.bowerrc'));
		this.fs.copyTpl(path.join(sourceRoot, 'bower.json'), path.join(destRoot, 'bower.json'), templateContext);
		this.fs.copyTpl(path.join(sourceRoot, 'package.json'), path.join(destRoot, 'package.json'), templateContext);
		this.fs.copyTpl(path.join(sourceRoot, 'README.md'), path.join(destRoot, 'README.md'), templateContext);
		this.fs.copy(path.join(sourceRoot, 'webpack.config.js'), path.join(destRoot, 'webpack.config.js'));
		this.fs.copy(path.join(sourceRoot, 'server.js'), path.join(destRoot, 'server.js'));

		// SASS
		this.fs.copyTpl(path.join(sourceRoot, 'sass','_vars' + sassFileExtension), path.join(destRoot, 'sass', '_vars' + sassFileExtension), templateContext);
		this.fs.copy(path.join(sourceRoot, 'sass', '_name-space' + sassFileExtension), path.join(destRoot, 'sass', '_name-space' + sassFileExtension));
		this.fs.copy(path.join(sourceRoot, 'sass', 'host' + sassFileExtension), path.join(destRoot, 'sass', 'host' + sassFileExtension));

		// HTML + JS
		this.fs.copy(path.join(sourceRoot, 'src', 'app.js'), path.join(destRoot, 'src', 'app.js'));
		this.fs.copy(path.join(sourceRoot, 'src', 'index.html'), path.join(destRoot, 'src', 'index.html'));
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

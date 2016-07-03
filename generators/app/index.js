'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

function copy (src, dest) {
  this.fs.copyTpl(
    this.templatePath(src),
    this.destinationPath(dest),
    this.props
  );
}

module.exports = yeoman.Base.extend({

  ////////////////////////////////////////////////////////////

  initializing: function () {
    this.copy = copy.bind(this);
  },

  ////////////////////////////////////////////////////////////

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-elm') + ' generator!'
    ));
    return this.prompt([
      {
        type: 'string',
        name: 'projectName',
        message: 'Project (and folder) name?',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'bootstrap',
        message: 'Want to use Twitter Bootstrap 3.x?',
        default: false
      }
    ]).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  ////////////////////////////////////////////////////////////

  configuring: function () {},

  writing: function () {
    // project root
    this.copy('README.md', 'README.md');
    this.copy('elm-package.json', 'elm-package.json');
    this.copy('package.json', 'package.json');
    this.copy('_gitignore', '.gitignore');
    this.copy('webpack.config.js', 'webpack.config.js');

    // src folder
    this.copy('src/Main.elm', 'src/Main.elm');
    this.copy('src/index.html', 'src/index.html');
    this.copy('src/index.js', 'src/index.js');
    this.copy('src/style.css', 'src/style.css');

    // public folder
    //this.copy('public/css/general.css', 'public/css/general.css');

    // twitter bootstrap
    //if (this.props.bootstrap) {
      //this.directory('public/vendor/bootstrap-3.3.5', 'public/vendor/bootstrap-3.3.5');
    //}
  },

  ////////////////////////////////////////////////////////////

  install: function () {
    this.log(yosay('Note: Webpack\'s dev dependencies take a while to install.'));
    this.npmInstall();
    this.spawnCommand('elm', ['package', 'install', '--yes']);
  },

  ////////////////////////////////////////////////////////////

  end: function () {
    this.log('===============================================================');
    this.log('  ' + chalk.green('Project generated'));
    this.log();
    this.log('  Check out the generated README.md for usage information.');
    this.log();
    this.log('  Quick-start: ' + chalk.cyan('npm start') + ' and visit <http://localhost:8080>.');
    this.log('===============================================================');
  }

  ////////////////////////////////////////////////////////////
});

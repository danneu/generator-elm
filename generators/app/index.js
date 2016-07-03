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

  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('folderPath', {
      type: String, 
      required: true, 
      desc: 'name of folder to create. can be a name, path, ".", etc.\n\t\t'
    });
  },

  ////////////////////////////////////////////////////////////

  initializing: function () {
    this.log(yosay('Welcome to the ' + chalk.green('Elm') + ' generator!'));
    this.copy = copy.bind(this);
  },

  ////////////////////////////////////////////////////////////

  prompting: function () {
    var newPath = this.destinationPath(this.folderPath)
    this.destinationRoot(newPath);
    this.log('Going to create project in folder:', chalk.cyan(this.destinationRoot()));
    var prompts = [{
        type: 'string',
        name: 'projectName',
        message: 'Project name?',
        default: path.basename(this.destinationRoot())
    }, {
        type: 'confirm',
        name: 'bootstrap',
        message: 'Want to use Twitter Bootstrap 3.x?',
        default: false
    }];
    return this.prompt(prompts).then(function (props) {
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

    // static folder
    this.copy('static/index.html', 'static/index.html');
    this.copy('static/index.js', 'static/index.js');
    this.copy('static/css/main.scss', 'static/css/main.scss');

    // twitter bootstrap
    if (this.props.bootstrap) {
      this.copy('_bootstraprc', '.bootstraprc');
      this.copy('static/css/bootstrap', 'static/css/bootstrap');
    }
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

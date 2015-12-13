'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

function copy(src, dest) {
  this.fs.copyTpl(
    this.templatePath(src),
    this.destinationPath(dest),
    this.props
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

module.exports = yeoman.generators.Base.extend({

  ////////////////////////////////////////////////////////////

  init: function () {
    this.copy = copy.bind(this);
  },

  ////////////////////////////////////////////////////////////

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the premium ' + chalk.red('generator-elm') + ' generator!'
    ));

    var prompts = [
      {
        type: 'string',
        name: 'projectName',
        message: 'Project (and folder) name?',
        default: this.destinationPath().split(path.sep).pop()
      },
      {
        type: 'string',
        name: 'rootComponentName',
        message: 'Name your root component (the one that will get imported into your Main.elm and used by StartApp):',
        default: 'RootComponent'
      },
      {
        type: 'confirm',
        name: 'bootstrap',
        message: 'Want to use Twitter Bootstrap?',
        default: false
      }
    ];


    this.prompt(prompts, function (props) {
      // Note: To access props later use this.props.{propKey}

      this.props = props;

      // Ensure rootComponentName is capitalized
      this.props.rootComponentName = capitalize(this.props.rootComponentName);

      done();
    }.bind(this));
  },

  ////////////////////////////////////////////////////////////

  writing: function () {
    // project root
    this.copy('README.md', 'README.md');
    this.copy('elm-package.json', 'elm-package.json');
    this.copy('package.json', 'package.json');
    this.copy('watch.js', 'watch.js');
    this.copy('_gitignore', '.gitignore');
    this.copy('index.template.html', 'index.template.html');
    this.copy('index.template.html', 'index.html');

    // src folder
    this.copy('src/Main.elm', 'src/Main.elm');
    var rootComponentPath = 'src/' + this.props.rootComponentName + '.elm';
    this.copy('src/RootComponent.elm', rootComponentPath);

    // public folder
    this.copy('public/css/general.css', 'public/css/general.css');

    // twitter bootstrap
    if (this.props.bootstrap) {
      this.directory('public/vendor/bootstrap-3.3.5', 'public/vendor/bootstrap-3.3.5');
    }
  },

  ////////////////////////////////////////////////////////////

  install: function () {
    this.npmInstall();

    // I'd prefer to use `elm-package install`, but elm-make has a --yes
    // option that skips the confirmation check and will still download
    // elm-package.json deps.
    this.spawnCommand('elm', [
      'make', '--yes', 'src/Main.elm', '--output', 'elm.js'
    ]);
  },

  ////////////////////////////////////////////////////////////

  end: function () {

    this.log('================================================================================');
    this.log('  ' + chalk.green('Project generated'));
    this.log();
    this.log('  ' + 'Check out the generated README.md for usage information.');
    this.log();
    this.log('  ' + chalk.red('If install fails,') + ' then run `npm install && elm package install` manually.');
    this.log('================================================================================');
  }

  ////////////////////////////////////////////////////////////
});

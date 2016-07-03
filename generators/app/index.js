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

var quickInstalls = {
  html: 'elm-lang/html',
  http: 'evancz/elm-http',
  websocket: 'elm-lang/websocket',
  svg: 'elm-lang/svg',
  markdown: 'evancz/elm-markdown',
  navigation: 'elm-lang/navigation',
  geolocation: 'elm-lang/geolocation'
};

// get array of elm package names from user-input string,
// delimited by spaces/commas.
function extractPackages (str) {
  if (!str) return [];
  return str.split(/[\s,]+/g).filter(Boolean);
}

module.exports = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('folderPath', {
      type: String, 
      required: true, 
      desc: 'name of folder to create. can be a name, path, ".", etc.'
    });
    for (var k in quickInstalls) {
      this.option(k, {
        type: Boolean,
        desc: 'install the ' + quickInstalls[k] + ' package'
      });
    }
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
    var prompts = [
      {
        type: 'string',
        name: 'projectName',
        message: 'Project name?',
        default: path.basename(this.destinationRoot())
      },
      {
        type: 'confirm',
        name: 'bootstrap',
        message: 'Want to use Twitter Bootstrap 3.x?',
        default: false
      },
      {
        type: 'string',
        name: 'extras',
        message: 'Want to install any additional packages? (space delimited)\n>'
      }
    ];
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
    this.npmInstall();
    this.spawnCommandSync('elm', ['package', 'install', '--yes']);
    for (var k in quickInstalls) {
      if (!this.options[k]) continue;
      var pkg = quickInstalls[k];
      this.log(chalk.green('Installing --' + k), pkg);
      this.spawnCommandSync('elm', ['package', 'install', '--yes', pkg]);
    }
    for (var pkg of extractPackages(this.props.extras)) {
      this.log(chalk.green('Installing'), pkg);
      this.spawnCommandSync('elm', ['package', 'install', '--yes', pkg]);
    }
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

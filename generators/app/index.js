'use strict'
const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('projectName', { type: String, required: true })

    // absolute path to the project folder
    const projectPath = path.resolve(this.contextRoot, this.options.projectName)
    // just the folder name
    const projectName = path.basename(projectPath)

    this.options.projectName = projectName
    this.options.projectPath = projectPath

    this.destinationRoot(projectPath)
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'projectName',
        default: this.options.projectName,
      },
    ])
  }

  writing() {
    const copyTpl = (src, dest = src) => {
      this.fs.copyTpl(
        this.templatePath(src),
        this.destinationPath(dest),
        this.options
      )
    }

    copyTpl('README.md')
    copyTpl('elm-package.json')
    copyTpl('package.json')
    copyTpl('webpack.config.js')
    // dotfiles
    copyTpl('_gitignore', '.gitignore')
    // src code
    copyTpl('src/Main.elm')
    // src assets
    copyTpl('src/index.html')
    copyTpl('src/index.js')
    copyTpl('src/css/index.scss')
    // binary data (cannot use copyTpl)
    this.fs.copy(this.templatePath('src/img'), this.destinationPath('src/img'))
    this.fs.copy(
      this.templatePath('src/favicon.ico'),
      this.destinationPath('src/favicon.ico')
    )
  }

  install() {
    this.npmInstall()
    this.runInstall('elm-package', [], { yes: true })
  }

  end() {
    this.log(`
    ${chalk.green('Project generated')}

    1. Start dev server: ${chalk.cyan('npm start')}
    2. Visit <http://localhost:3000>
    3. Make changes to src/Main.elm
    `)
  }
}

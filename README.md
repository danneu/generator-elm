
# generator-elm [![NPM version](https://badge.fury.io/js/generator-elm.svg)](http://badge.fury.io/js/generator-elm) [![Dependency Status](https://david-dm.org/danneu/generator-elm.svg)](https://david-dm.org/danneu/generator-elm)

Create the minimal Elm 0.17 + Webpack project boilerplate.

## Features

- **Optional [Twitter Bootstrap (Sass) v3](http://getbootstrap.com/):**
  You can opt-in during the generator prompt.
- **Hot reloading:** File changes are pushed to the browser without a refresh.
- **[Sass](http://sass-lang.com/) support:** Just write some `.scss` files.
- **CSS vendor autoprefixing:** Automatically adds prefixes like `-webkit` to your styles when necessary.
- **Package quick-install:** The generator will prompt you for a 
  space-delimited list of any extra packages you want to install at once.
  You can also invoke the generator with flags of some popular Elm packages.
  Ex: `yo elm my-app --http --websocket --svg`

## Install

    npm install -g yo generator-elm

## Generate

    yo elm <destinationFolder>

## Run

### Development

Start the local hot-reloading development server and 
visit <http://localhost:8080>.

    npm start

### Production

Bundle the app into a `dist` folder ready to be deployed.

    npm run build

    .
    └── dist
        ├── index.html 
        ├── 5df766af1ced8ff1fe0a.css
        └── 5df766af1ced8ff1fe0a.js

## License

MIT © [Dan Neumann](https://github.com/danneu)


# generator-elm [![NPM version](https://badge.fury.io/js/generator-elm.svg)](http://badge.fury.io/js/generator-elm) [![Dependency Status](https://david-dm.org/danneu/generator-elm.svg)](https://david-dm.org/danneu/generator-elm)

Create the minimal Elm 0.17 + Webpack project boilerplate.

## Usage

    npm install -g yo generator-elm
    yo elm <folder>

You will be prompted for a few options and then the Elm project will
be generated in the given folder.

Once your project is generated:

- **Development:** `npm start` and visit <http://localhost:8080>.
- **Production:** `npm run build` to generate a `dist` folder ready to be
  deployed.

        .
        └── dist
            ├── index.html 
            ├── 5df766af1ced8ff1fe0a.css
            └── 5df766af1ced8ff1fe0a.js

## Features

- Optional [Twitter Bootstrap v3.x](http://getbootstrap.com/) support if 
  you opt-in during the generator prompt. 
- Hot reloading: file changes are pushed to the browser without a refresh.
- Supports [Sass](http://sass-lang.com/) in `.css` or `.scss` files.
- Automatically adds browser vendor prefixes (like `-webkit-...`) to
  your styles.

## License

MIT © [Dan Neumann](https://github.com/danneu)

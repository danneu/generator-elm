
# generator-elm

Create the minimal Elm 0.17 + Webpack project boilerplate.

Once your project is generated:

- **Development:** `npm start` and visit <http://localhost:8080>.
- **Production:** `npm run build` to generate a `dist` folder ready to be
  deployed.

        .
        ├── dist
        │   ├── index.html 
        │   ├── 5df766af1ced8ff1fe0a.css
        │   └── 5df766af1ced8ff1fe0a.js


## Features

- Optional [Twitter Bootstrap v3.x](http://getbootstrap.com/) support if 
  you opt-in during the generator prompt. 
- Supports [Sass](http://sass-lang.com/) in `.css` or `.scss` files.
- Automatically adds browser vendor prefixes (like `-webkit-...`) to
  your styles.

## Installation

You must have [Node.js](https://nodejs.org) installed to use npm.

These commands install [Yeoman](http://yeoman.io) and generator-elm globally:

```bash
npm install -g yo
npm install -g generator-elm
```

Then generate your new project. 

**Note:** At the moment, you must run `yo elm` from inside an existing folder.

```bash
mkdir my-elm-project
cd my-elm-project
yo elm
```

## License

MIT © [Dan Neumann](https://github.com/danneu)


# generator-elm

Create the minimal StartApp-ready Elm project boilerplate.

## Features

- Generates `src/Main.elm` (StartApp root) and `src/{rootComponent}.elm` (select the name during prompt).
- Optional [Twitter Bootstrap v3.3.5](http://getbootstrap.com/) support if you opt-in during the generator prompt. It will include Bootstrap's files in `vendor/public/bootstrap-3.3.5/` and link the CSS in the generated index.html.

## Installation

You must have [Node.js](https://nodejs.org) installed to use npm.

These commands install [Yeoman](http://yeoman.io) and generator-elm globally:

```bash
npm install -g yo
npm install -g generator-elm
```

Then generate your new project, but at the moment you must run this
from inside the destination folder:

```bash
mkdir my-elm-project
cd my-elm-project
yo elm
```

## License

MIT © [Dan Neumann](https://github.com/danneu)

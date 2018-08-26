# <%= projectName %>

## Development

Start the hot-reloading webpack dev server:

    npm start

Navigate to <http://localhost:3000>.

Any changes you make to your files (.elm, .js, .css, etc.) will trigger
a hot reload.

## Production

When you're ready to deploy:

    npm run build

This will create a `dist` folder:

    .
    ├── dist
    │   ├── index.html
    │   ├── main-60b725f10c9c85c70d97.css
    │   └── main-5df766af1ced8ff1fe0a.js

Serve it locally to sanity-check the results:

    npm install -g serve
    serve dist

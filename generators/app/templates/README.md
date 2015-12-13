
# <%= projectName %>

## Development

Start local server in root directory:

    python -m SimpleHTTPServer 5000  (or `npm run server`)

Build project:

    npm run build  (or `npm run watch` for auto-rebuild on fs change)

Navigate to <http://localhost:5000> (which loads your `index.html`).

**Note:** Make your edits to `index.template.html` and consider `index.html` an ephemeral file. This is because index.html gets overwritten easily. For example, `elm make` overwrites it by default.

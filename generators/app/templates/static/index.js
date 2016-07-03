
// pull in desired CSS/SASS files
<% if (bootstrap) { -%>
require('./vendor/bootstrap-sass-3.3.6/stylesheets/_bootstrap.scss');
<% } -%>
require('./main.scss');

// inject bundled Elm app into div#main

var Elm = require('../src/Main');
Elm.Main.embed(document.getElementById('main'));

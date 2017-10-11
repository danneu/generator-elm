require('./css/index.scss')

const Elm = require('./Main.elm')

const app = Elm.Main.embed(document.getElementById('main'))

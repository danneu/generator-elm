require('./index.scss')

const { Main } = require('./Main.elm')

const app = Main.embed(document.querySelector('#main'))

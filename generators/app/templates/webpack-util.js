// Creates a function that is restricted to invoking func once.
function once(fn) {
  let called = false
  return function() {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

// Unlike webpack's --open browser-opener, this plugin attempts to focus
// an existing tab if there is one instead of opening new tabs incessantly.
class OpenBrowserPlugin {
  constructor(port, opts = {}) {
    if (!Number.isInteger(port)) {
      throw new Error('first argument to OpenBrowserPlugin must be a port')
    }
    this.port = port
    this.ignoreErrors = opts.ignoreErrors
  }

  apply(compiler) {
    const openBrowser = require('react-dev-utils/openBrowser')
    let isWatching = false
    const executeOpen = once(() => {
      // note: returns true if opened browser
      openBrowser(`http://localhost:${this.port}`)
    })

    compiler.plugin('watch-run', (_, done) => {
      isWatching = true
      done()
    })

    compiler.plugin('done', (stats) => {
      if (isWatching && (!stats.hasErrors() || this.ignoreErrors)) {
        executeOpen()
      }
    })
  }
}

module.exports = {
  OpenBrowserPlugin,
}

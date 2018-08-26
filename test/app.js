/* global describe, it */
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-elm:app', () => {
  it('generates a project', () => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withArguments(['foo'])
      .withOptions({ 'skip-install': true })
      .then(() => {
        assert.file('package.json')
        assert.file('src/Main.elm')
      })
  })

  it('loads', () => {
    assert(true)
  })
})

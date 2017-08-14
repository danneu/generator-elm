'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-elm:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments(['my-app'])
      .withOptions({ 'skip-install': true })
      .toPromise()
  })

  it('loads', () => {
    assert(true)
  })
})

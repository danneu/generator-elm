'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-elm:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
                  .withArguments(['my-app'])
                  .withOptions({ 'skip-install': true })
                  .toPromise();
  });

  it('loads', function () {
    assert(true);
  });
});

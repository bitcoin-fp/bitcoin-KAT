/* global describe, it */

var assert = require('assert')
var scriptPubKey = require('../src/script').scriptPubKey

describe('Script', function () {
  it('should be valid ScriptPubKey', function () {
    var address = '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH'
    assert.strictEqual(scriptPubKey(address).toString('hex'), '76a914751e76e8199196d454941c45d1b3a323f1433bd688ac')
  })
})

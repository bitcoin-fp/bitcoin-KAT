/* global describe, it */

var assert = require('assert')
var address = require('../src/address').address

describe('Address', function () {
  var publicKey = '0202a406624211f2abbdc68da3df929f938c3399dd79fac1b51b0e4ad1d26a47aa'
  it('should be valid bitcoin address', function () {
    var addr = address(publicKey)
    assert.strictEqual(addr, '1PRTTaJesdNovgne6Ehcdu1fpEdX7913CK')
  })
})

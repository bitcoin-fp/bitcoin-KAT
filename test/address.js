/* global describe, it */

var assert = require('assert')
var address = require('../src/address').address
var NETWORK = require('../src/const').NETWORK

describe('Address', function () {
  it('should be valid bitcoin address on main network', function () {
    var publicKey = '0202a406624211f2abbdc68da3df929f938c3399dd79fac1b51b0e4ad1d26a47aa'
    var mainAddress = address(NETWORK.MAINNET)
    assert.strictEqual(mainAddress(publicKey), '1PRTTaJesdNovgne6Ehcdu1fpEdX7913CK')
  })

  it('should be valid bitcoin address on test network', function () {
    var publicKey = '024289801366bcee6172b771cf5a7f13aaecd237a0b9a1ff9d769cabc2e6b70a34'
    var testAddress = address(NETWORK.TESTNET)
    assert.strictEqual(testAddress(publicKey), 'n1TteZiR3NiYojqKAV8fNxtTwsrjM7kVdj')
  })
})

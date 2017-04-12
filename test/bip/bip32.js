/* global describe, it */

var assert = require('assert')
var Bip32 = require('../../src/bip/bip32')
var address = require('../../src/address').address
var NETWORK = require('../../src/const').NETWORK

describe('BIP32', function () {
  var seed = '000102030405060708090a0b0c0d0e0f'
  var mk = Bip32.masterKeys(seed)
  it('should be valid WIF', function () {
    assert.strictEqual(mk.wif, 'L52XzL2cMkHxqxBXRyEpnPQZGUs3uKiL3R11XbAdHigRzDozKZeW')
  })

  it('should be valid chain code', function () {
    assert.strictEqual(mk.chainCode, '873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508')
  })

  it('should be valid public key', function () {
    assert.strictEqual(mk.publicKey.toLowerCase(), '0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2')
  })

  it('should be valid address', function () {
    assert.strictEqual(address(NETWORK.MAINNET)(mk.publicKey), '15mKKb2eos1hWa6tisdPwwDC1a5J1y9nma')
  })
})

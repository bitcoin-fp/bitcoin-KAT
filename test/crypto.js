/* global describe, it */

var assert = require('assert')
var crypto = require('../src/crypto')

describe('Crypto/Hash', function () {
  var b = Buffer.from('0000000000000001', 'hex')

  it('SHA256', function () {
    var hash = crypto.sha256(b).toString('hex')
    assert.strictEqual(hash, 'cd2662154e6d76b2b2b92e70c0cac3ccf534f9b74eb5b89819ec509083d00a50')
  })

  it('Double SHA256', function () {
    var hash = crypto.dsha256(b).toString('hex')
    assert.strictEqual(hash, '3ae5c198d17634e79059c2cd735491553d22c4e09d1d9fea3ecf214565df2284')
  })

  it('Ripemd160', function () {
    var hash = crypto.ripemd160(b).toString('hex')
    assert.strictEqual(hash, '8d1a05d1bc08870968eb8a81ad4393fd3aac6633')
  })

  it('Double hash: Ripemd160 + SHA256', function () {
    var hash = crypto.dhash(b).toString('hex')
    assert.strictEqual(hash, 'cdb00698f02afd929ffabea308340fa99ac2afa8')
  })
})

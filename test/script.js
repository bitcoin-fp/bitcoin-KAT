/* global describe, it */

var assert = require('assert')
var scriptPubKey = require('../src/script').scriptPubKey
var scriptSig = require('../src/script').scriptSig
var wifToPrivateKey = require('../src/ecpair').wifToPrivateKey
var utils = require('../src/utils')

// var ecurve = require('ecurve')
// var ecurveSecp256k1 = ecurve.getCurveByName('secp256k1')

describe('Script', function () {
  it('should be valid ScriptPubKey', function () {
    var address = '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH'
    var script = scriptPubKey(address).toString('hex')
    assert.strictEqual(script, '76a914751e76e8199196d454941c45d1b3a323f1433bd688ac')
  })

  it('should be valid ScriptSig', function () {
    var privateKey = wifToPrivateKey('5HvofFG7K1e2aeWESm5pbCzRHtCSiZNbfLYXBvxyA57DhKHV4U3')
    var rawTx = utils.bufferify('0100000001be66e10da854e7aea9338c1f91cd489768d1d6d7189f586d7a3613f2a24d5396000000001976a914dd6cce9f255a8cc17bda8ba0373df8e861cb866e88acffffffff0123ce0100000000001976a9142bc89c2702e0e618db7d59eb5ce2f0f147b4075488ac0000000001000000')
    var script = scriptSig(privateKey)(rawTx)
    assert.strictEqual(script.toString('hex'), '4830440220587ce0cf0252e2db3a7c3c91b355aa8f3385e128227cd8727c5f7777877ad7720220123af7483eb76e12ea54c73978fe627fffb91bbda6797e938147790e43ee57e50141042daa93315eebbe2cb9b5c3505df4c6fb6caca8b756786098567550d4820c09db988fe9997d049d687292f815ccd6e7fb5c1b1a91137999818d17c73d0f80aef9')

    // verify signature
    // var pubKey = ecurveSecp256k1.G.multiply(utils.bigify(privateKey))
    // assert.strictEqual(ecdsa.verify(crypto.dsha256(rawTx), signature, pubKey), true)
  })
})

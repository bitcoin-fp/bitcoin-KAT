/* global describe, it */

var assert = require('assert')
var makeRawTx = require('../src/transaction').makeRawTx
var makeSignedTx = require('../src/transaction').makeSignedTx

describe('Raw Transaction', function () {
  var rawTx = makeRawTx([{from: '1MBngSqZbMydscpzSoehjP8kznMaHAzh9y', to: '14zWNsgUMmHhYx4suzc2tZD6HieGbkQi5s', value: 0.00118307, prevHash: '96534da2f213367a6d589f18d7d6d1689748cd911f8c33a9aee754a80de166be', prevIndex: 0}])
  it('should be valid raw transaction', function () {
    assert.strictEqual(rawTx.toString('hex'), '0100000001be66e10da854e7aea9338c1f91cd489768d1d6d7189f586d7a3613f2a24d5396000000001976a914dd6cce9f255a8cc17bda8ba0373df8e861cb866e88acffffffff0123ce0100000000001976a9142bc89c2702e0e618db7d59eb5ce2f0f147b4075488ac0000000001000000')
  })
})

describe('Signed Transaction', function () {
  var signedTx = makeSignedTx('5HvofFG7K1e2aeWESm5pbCzRHtCSiZNbfLYXBvxyA57DhKHV4U3', [{from: '1MBngSqZbMydscpzSoehjP8kznMaHAzh9y', to: '14zWNsgUMmHhYx4suzc2tZD6HieGbkQi5s', value: 0.00118307, prevHash: '96534da2f213367a6d589f18d7d6d1689748cd911f8c33a9aee754a80de166be', prevIndex: 0}])
  it('should be valid signed transaction', function () {
    assert.strictEqual(signedTx.toString('hex'), '0100000001be66e10da854e7aea9338c1f91cd489768d1d6d7189f586d7a3613f2a24d5396000000008a4830440220587ce0cf0252e2db3a7c3c91b355aa8f3385e128227cd8727c5f7777877ad7720220123af7483eb76e12ea54c73978fe627fffb91bbda6797e938147790e43ee57e50141042daa93315eebbe2cb9b5c3505df4c6fb6caca8b756786098567550d4820c09db988fe9997d049d687292f815ccd6e7fb5c1b1a91137999818d17c73d0f80aef9ffffffff0123ce0100000000001976a9142bc89c2702e0e618db7d59eb5ce2f0f147b4075488ac00000000')
  })
})

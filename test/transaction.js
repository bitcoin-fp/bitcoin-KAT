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

describe('Real Signed Transaction', function () {
  var signedTx = makeSignedTx('91ms93ej64a3mt6NNZdq38XvBpfNHVFxcVtJYKee9uu99WCtQYq', [{from: 'n4j1MtzGZpivsqbvrcAqPV4GS74B3kS7qG', to: 'mwCwTceJvYV27KXBc3NJZys6CjsgsoeHmf', value: 0.64, prevHash: '0e512b5ab9220e473928b0c2728aaa74ec66a1cc827caa29a744eb508d15f850', prevIndex: 0}])
  it('should be valid signed transaction', function () {
    // txid: a027500c44b6e02d2587763b99751374294720e59630eeb3152e09a9fc7d8b04
    assert.strictEqual(signedTx.toString('hex'), '010000000150f8158d50eb44a729aa7c82cca166ec74aa8a72c2b02839470e22b95a2b510e000000008b483045022100e1702f14d8ce6778285d38b61499b405afbbd7a2eda3be7d342575258a6c1b2a0220176f3e7ae176f6fcefaa8b69e78051e51b657f0017ff012a7ed96c9620295dd9014104bbc099a8042ddeb1b3e47ec4e325a39f4b0a6bb957a4224e74216e5282c7d6e8c866d27c8adc495ed1d896fc0cd8471cfaf46f734080993c56d495a8c6c06c4fffffffff010090d003000000001976a914ac19d3fd17710e6b9a331022fe92c693fdf6659588ac00000000')
  })
})

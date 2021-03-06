/* global describe, it */

var assert = require('assert')
var ecpair = require('../src/ecpair')

describe('Keys', function () {
  var privateKey = '1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD'

  it('should be valid uncompressed public key', function () {
    var pub = ecpair.uncompressedPublicKey(privateKey)
    assert.strictEqual(pub, '04F028892BAD7ED57D2FB57BF33081D5CFCF6F9ED3D3D7F159C2E2FFF579DC341A07CF33DA18BD734C600B96A72BBC4749D5141C90EC8AC328AE52DDFE2E505BDB')
  })

  it('should be valid compressed public key', function () {
    var pub = ecpair.compressedPublicKey(privateKey)
    assert.strictEqual(pub, '03F028892BAD7ED57D2FB57BF33081D5CFCF6F9ED3D3D7F159C2E2FFF579DC341A')
  })

  it('should be valid WIF private key', function () {
    var wif = ecpair.wif(privateKey)
    assert.strictEqual(wif, '5J3mBbAH58CpQ3Y5RNJpUKPE62SQ5tfcvU2JpbnkeyhfsYB1Jcn')
  })

  it('should be valid private key from WIF', function () {
    var pri = ecpair.wifToPrivateKey('5J3mBbAH58CpQ3Y5RNJpUKPE62SQ5tfcvU2JpbnkeyhfsYB1Jcn').toString('hex').toUpperCase()
    assert.strictEqual(pri, '1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD')
  })

  it('should be valid compressed WIF private key', function () {
    var wif = ecpair.compressedWIF(privateKey)
    assert.strictEqual(wif, 'KxFC1jmwwCoACiCAWZ3eXa96mBM6tb3TYzGmf6YwgdGWZgawvrtJ')
  })

  it('should be valid private key from WIF', function () {
    var pri = ecpair.wifToPrivateKey('5HvofFG7K1e2aeWESm5pbCzRHtCSiZNbfLYXBvxyA57DhKHV4U3').toString('hex').toUpperCase()
    assert.strictEqual(pri, '0ECD20654C2E2BE708495853E8DA35C664247040C00BD10B9B13E5E86E6A808D')
  })

  it('should be valid private key from compressed WIF', function () {
    var pri = ecpair.wifToPrivateKey('KxFC1jmwwCoACiCAWZ3eXa96mBM6tb3TYzGmf6YwgdGWZgawvrtJ').toString('hex').toUpperCase()
    assert.strictEqual(pri, '1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD')
  })

  var privateKeyTestnet = '18DBC4E4D0679B11EAEE9A7C68498BBB58CF5B97178DB4A7ADBED71E4831B6FA'

  it('should be valid WIF private key(TestNet)', function () {
    var wif = ecpair.wifTestnet(privateKeyTestnet)
    assert.strictEqual(wif, '91ms93ej64a3mt6NNZdq38XvBpfNHVFxcVtJYKee9uu99WCtQYq')
  })

  it('should be valid compressed WIF private key(TestNet)', function () {
    var wif = ecpair.compressedWIFTestnet(privateKeyTestnet)
    assert.strictEqual(wif, 'cNR2JWhWmLksF6WhLB3Z2QFTkmNLwmj2TgVSRFK8zLV8xKAmUUtN')
  })
})

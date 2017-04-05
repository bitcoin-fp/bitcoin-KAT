/* global describe, it */

var assert = require('assert')
var ecpair = require('../src/ecpair').ecpair

describe('Keys', function () {
  var privateKey = '1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD'
  var keyPair = ecpair(privateKey)

  // it('should be valid uncompressed public key', function () {
  //   assert.strictEqual(keyPair.uncompressedPublicKey, '04F028892BAD7ED57D2FB57BF33081D5CFCF6F9ED3D3D7F159C2E2FFF579DC341A07CF33DA18BD734C600B96A72BBC4749D5141C90EC8AC328AE52DDFE2E505BDB')
  // })

  // it('should be valid compressed public key', function () {
  //   assert.strictEqual(keyPair.compressedPublicKey, '03F028892BAD7ED57D2FB57BF33081D5CFCF6F9ED3D3D7F159C2E2FFF579DC341A')
  // })

  it('should be valid WIF private key', function () {
    assert.strictEqual(keyPair.WIF, '5J3mBbAH58CpQ3Y5RNJpUKPE62SQ5tfcvU2JpbnkeyhfsYB1Jcn')
  })

  it('should be valid compressed WIF private key', function () {
    assert.strictEqual(keyPair.compressedWIF, 'KxFC1jmwwCoACiCAWZ3eXa96mBM6tb3TYzGmf6YwgdGWZgawvrtJ')
  })
})

// describe('Address', function () {
//   var publicKey = Buffer.from('0202a406624211f2abbdc68da3df929f938c3399dd79fac1b51b0e4ad1d26a47aa', 'hex')
//   var address = new Address(publicKey)

//   it('should be valid bitcoin address', function () {
//     var addressHex = address.generateAddress()
//     assert(addressHex, '1PRTTaJesdNovgne6Ehcdu1fpEdX7913CK')
//   })
// })

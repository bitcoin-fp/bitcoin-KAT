/* global describe, it */

var assert = require('assert')
var Bip39 = require('../../src/bip/bip39')

describe('BIP39', function () {
  it('128bits entropy without passphrase', function () {
    var bEntropy = Buffer.from('0c1e24e5917779d297e14d45f14e1a1a', 'hex')
    var mnemonic = Bip39.mnemonic(bEntropy)
    assert.strictEqual(mnemonic, 'army van defense carry jealous true garbage claim echo media make crunch')
    // assert(seed, '5b56c417303faa3fcba7e57400e120a0ca83ec5a4fc9ffba757fbe63fbd77a89a1a3be4c67196f57c39a88b76373733891bfaba16ed27a813ceed498804c0570')
  })

  it('128bits entropy with passphrase', function () {
    var bEntropy = Buffer.from('0c1e24e5917779d297e14d45f14e1a1a', 'hex')
    var mnemonic = Bip39.mnemonic(bEntropy)
    assert.strictEqual(mnemonic, 'army van defense carry jealous true garbage claim echo media make crunch')
  //   var seed = Bip39.getSeed({length: 128, entropy: '0c1e24e5917779d297e14d45f14e1a1a', salt: 'SuperDuperSecret'})
  //   assert(seed, '3b5df16df2157104cfdd22830162a5e170c0161653e3afe6c88defeefb0818c793dbb28ab3ab091897d0715861dc8a18358f80b79d49acf64142ae57037d1d54')
  })

  it('256bits entropy without passphrase', function () {
    var bEntropy = Buffer.from('2041546864449caff939d32d574753fe684d3c947c3346713dd8423e74abcf8c', 'hex')
    var mnemonic = Bip39.mnemonic(bEntropy)
    assert.strictEqual(mnemonic, 'cake apple borrow silk endorse fitness top denial coil riot stay wolf luggage oxygen faint major edit measure invite love trap field dilemma oblige')
  //   var seed = Bip39.getSeed({length: 256, entropy: '2041546864449caff939d32d574753fe684d3c947c3346713dd8423e74abcf8c'})
  //   assert(seed, '2041546864449caff939d32d574753fe684d3c947c3346713dd8423e74abcf8c')
  })
})

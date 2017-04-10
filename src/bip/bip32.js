var crypto = require('../crypto')
var utils = require('../utils')
var R = require('ramda')

var wif = require('../ecpair').compressedWIF
var pk = require('../ecpair').compressedPublicKey
var hmac512 = R.compose(crypto.hmac512, utils.bufferifyString)('Bitcoin seed')

var masterKeys = (seed) => {
  var I = R.compose(hmac512, utils.bufferify)(seed)
  var IL = I.slice(0, 32)
  var IR = I.slice(32)
  return {
    wif: wif(IL),
    publicKey: pk(IL),
    chainCode: IR.toString('hex')
  }
}

var extendedKey = () => {}

module.exports = {
  masterKeys: masterKeys,
  extendedKey: extendedKey
}

var crypto = require('./crypto')
var R = require('ramda')
var utils = require('./utils')
var VERSION = require('./const').VERSION
var base58 = require('bs58')

// var publicKey = (isCompressed, privateKey) => {

// }

var wifPayload = (isCompressed) => (payload) => {
  var bPayload = Buffer.from(payload, 'hex')
  var fPrefix = utils.prefixBy(VERSION.WIF)
  var fSuffix = utils.suffixBy([0x01])

  bPayload = fPrefix(bPayload)
  if (isCompressed) bPayload = fSuffix(bPayload)

  var wif = R.compose(base58.encode, utils.suffixTo(bPayload), utils.slice(0, 4), crypto.dsha256)

  return wif(bPayload)
}

var ecpair = (privateKey) => {
  var wif = wifPayload(false)
  var wifCompressed = wifPayload(true)
  return {
    privateKey: privateKey,
    WIF: wif(privateKey),
    compressedWIF: wifCompressed(privateKey)
  }
}

module.exports = {
  ecpair: ecpair
}

var crypto = require('./crypto')
var R = require('ramda')
var utils = require('./utils')
var VERSION = require('./const').VERSION
var base58 = require('bs58')
var ecurve = require('ecurve')
var ecurveSecp256k1 = ecurve.getCurveByName('secp256k1')

var ecpoints = (payload) => ecurveSecp256k1.G.multiply(payload)

var compress = (isCompressed) => (ecpoints) => ecpoints.getEncoded(isCompressed).toString('hex')

var publicKey = (isCompressed) => R.compose(R.toUpper, compress(isCompressed), ecpoints, utils.bigify)

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
  var pubCompressed = publicKey(true)
  var pubUncompressed = publicKey(false)
  return {
    privateKey: privateKey,
    WIF: wif(privateKey),
    compressedWIF: wifCompressed(privateKey),
    compressedPublicKey: pubCompressed(privateKey),
    uncompressedPublicKey: pubUncompressed(privateKey)
  }
}

module.exports = {
  ecpair: ecpair
}

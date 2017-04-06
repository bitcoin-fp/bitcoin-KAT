var crypto = require('./crypto')
var R = require('ramda')
var utils = require('./utils')
var VERSION = require('./const').VERSION
var base58 = require('bs58')
var ecurve = require('ecurve')
var ecurveSecp256k1 = ecurve.getCurveByName('secp256k1')

/* Returns EC points
 * @param {Buffer} payload - The random number
 */
var ecpoints = (payload) => ecurveSecp256k1.G.multiply(payload)

/* Returns compressed or uncompressed EC points
 * @param {boolean} isCompressed - Compressed or uncompressed
 */
var compress = (isCompressed) => (ecpoints) => ecpoints.getEncoded(isCompressed).toString('hex')

/* Returns EC public key
 * @param {boolean} isCompressed - Compressed or uncompressed
 * @param {Hex} payload - The random number
 */
var publicKey = (isCompressed) => (payload) => R.compose(R.toUpper, compress(isCompressed), ecpoints, utils.bigify)(payload)

/* Returns compressed or uncompressed WIF
 * @param {boolean} isCompressed - Compressed or uncompressed
 * @param {Hex} payload - The EC private key
 */
var wifPayload = (isCompressed) => (payload) => {
  var fixify = isCompressed
    ? R.compose(utils.suffixBy([0x01]), utils.prefixBy(VERSION.WIF), utils.bufferify)
    : R.compose(utils.prefixBy(VERSION.WIF), utils.bufferify)

  var suffixChecksum = R.compose(utils.suffixBy, utils.slice(0, 4), crypto.dsha256, fixify)(payload)

  var wif = R.compose(base58.encode, suffixChecksum, fixify)

  return wif(payload)
}

/* Returns WIF and public key
 @param {Hex} privateKey - The private key
 */
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

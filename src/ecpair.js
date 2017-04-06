var crypto = require('./crypto')
var R = require('ramda')
var utils = require('./utils')
var VERSION = require('./const').VERSION
var ecurve = require('ecurve')
var ecurveSecp256k1 = ecurve.getCurveByName('secp256k1')

/* Returns EC points
 * @param {Buffer} payload - The random number
 */
var ecpoints = (payload) => ecurveSecp256k1.G.multiply(payload)

/* Returns compressed or uncompressed EC points
 * @param {boolean} isCompressed - Compressed or uncompressed
 * @param {object} ecpoints - The EC points from ecpoints()
 */
var compress = (isCompressed) => (ecpoints) => ecpoints.getEncoded(isCompressed).toString('hex')

/* Returns EC public key
 * @param {boolean} isCompressed - Compressed or uncompressed
 * @param {Hex} payload - The random number
 */
var publicKey = (isCompressed) => (payload) => R.compose(R.toUpper, compress(isCompressed), ecpoints, utils.bigify)(payload)

/* Returns compressed or uncompressed WIF
 * @param {boolean} isCompressed - Compressed or uncompressed
 * @param {Hex} privateKey - The EC private key
 */
var wifPayload = (isCompressed) => (privateKey) => {
  var payload = isCompressed
    ? R.compose(utils.suffixBy([0x01]), utils.prefixBy(VERSION.WIF), utils.bufferify)(privateKey)
    : R.compose(utils.prefixBy(VERSION.WIF), utils.bufferify)(privateKey)
  var wif = crypto.base58Check(payload)
  return wif
}

/* Returns WIF and public key
 * @param {Hex} privateKey - The private key
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

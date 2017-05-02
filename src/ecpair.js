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
var publicKey = (isCompressed) => R.compose(R.toUpper, compress(isCompressed), ecpoints, utils.bigify)

/* Returns compressed or uncompressed WIF
 * @param [network] network - Main or Test network
 * @param {boolean} isCompressed - Compressed or uncompressed
 * @param {Hex} privateKey - The EC private key
 */
var wif = (network) => (isCompressed) => {
  return isCompressed
    ? R.compose(crypto.base58Check, utils.prefixBy(network), utils.suffixBy([0x01]), utils.bufferify)
    : R.compose(crypto.base58Check, utils.prefixBy(network), utils.bufferify)
}

/* Returns EC private key from compressed or uncompressed WIF
 * @param {Hex} wif - The WIF
 */
var wifToPrivateKey = (wif) => {
  return wif.startsWith('5') || wif.startsWith('9')
    ? R.compose(crypto.dBase58Check)(wif)
    : R.compose(utils.slice(0, -1), crypto.dBase58Check)(wif)
}

module.exports = {
  wif: wif(VERSION.WIF_MAINNET)(false),
  compressedWIF: wif(VERSION.WIF_MAINNET)(true),
  wifTestnet: wif(VERSION.WIF_TESTNET)(false),
  compressedWIFTestnet: wif(VERSION.WIF_TESTNET)(true),
  compressedPublicKey: publicKey(true),
  uncompressedPublicKey: publicKey(false),
  wifToPrivateKey: wifToPrivateKey
}

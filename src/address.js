var crypto = require('./crypto')
var utils = require('./utils')
var R = require('ramda')

/* Returns bitcoin address
 * @param {Const.NETWORK} network - The mainnet or testnet
 * {HexString} publicKey -> {String} address
 */
var address = (network) => {
  var prfixedNetwork = utils.prefixBy(network)
  return R.compose(crypto.base58Check, prfixedNetwork, crypto.dhash, utils.bufferify)
}

/* Returns bitcoin address from public key hash
 * @param {Const.NETWORK} network - The mainnet or testnet
 * {HexString} publicKeyHash -> {String} address
 */
var addressPKH = (network) => {
  var prfixedNetwork = utils.prefixBy(network)
  return R.compose(crypto.base58Check, prfixedNetwork, utils.bufferify)
}

/* Returns public key hash from address
 * @param {String} address - The bitcoin address
 */
var getPKH = (address) => crypto.dBase58Check(address).toString('hex')

module.exports = {
  address: address,
  addressPKH: addressPKH,
  getPKH: getPKH
}

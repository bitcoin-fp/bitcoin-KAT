var crypto = require('./crypto')
var utils = require('./utils')
var R = require('ramda')

/* Returns bitcoin address
 * {HexString} publicKey -> {String} address
 */
var address = (network) => {
  var prfixedNetwork = utils.prefixBy(network)
  return R.compose(crypto.base58Check, prfixedNetwork, crypto.dhash, utils.bufferify)
}

module.exports = {
  address: address
}

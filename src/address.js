var crypto = require('./crypto')
var utils = require('./utils')
var VERSION = require('./const').VERSION
var R = require('ramda')

var address = (publicKey) => {
  var payload = R.compose(utils.prefixBy(VERSION.ADDRESS), crypto.dhash, utils.bufferify)(publicKey)
  return crypto.base58Check(payload)
}

module.exports = {
  address: address
}

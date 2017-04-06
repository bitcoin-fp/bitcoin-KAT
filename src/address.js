var crypto = require('./crypto')
var utils = require('./utils')
var VERSION = require('./const').VERSION
var R = require('ramda')

var address = R.compose(crypto.base58Check, utils.prefixBy(VERSION.ADDRESS), crypto.dhash, utils.bufferify)

module.exports = {
  address: address
}

var address = require('./address')
var utils = require('./utils')
var crypto = require('./crypto')
var R = require('ramda')
var OPS = require('bitcoin-ops')
var ecdsa = require('ecdsa')

/* Returns ScriptPubKey
 * @param {String} adr - The bitcoin address
 */
var scriptPubKey = (adr) => {
  var pkh = R.compose(utils.bufferify, address.getPKH)(adr)
  var script = Buffer.alloc(5 + pkh.length)
  var chunks = [OPS.OP_DUP, OPS.OP_HASH160, pkh.length, pkh, OPS.OP_EQUALVERIFY, OPS.OP_CHECKSIG]

  chunks.reduce(function (offset, chunk) {
    if (Buffer.isBuffer(chunk)) {
      chunk.copy(script, offset)
      return offset + chunk.length
    } else {
      script.writeUInt8(chunk, offset)
      return offset + 1
    }
  }, 0)

  return script
}

/* Returns ScriptSig
 */
var scriptSig = (privateKey) => (rawTx) => {
  return ecdsa.sign(crypto.dsha256(rawTx), privateKey)
}

module.exports = {
  scriptPubKey: scriptPubKey,
  scriptSig: scriptSig
}

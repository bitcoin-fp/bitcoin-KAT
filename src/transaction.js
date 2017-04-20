var script = require('./script')
var utils = require('./utils')
var TRANSACTION = require('./const').TRANSACTION
var SIGHASHTYPE = require('./const').SIGHASHTYPE
var R = require('ramda')
var Varint = require('varint')

/* Add inputs to transaction
 * @param {Array} inputs - The inputs, i.e. UTXO
 * e.g.
 * [{
 *   from: "133txdxQmwECTmXqAr9RWNHnzQ175jGb7e",
 *   prevHash: "c39e394d41e6be2ea58c2d3a78b8c644db34aeff865215c633fe6937933078a9",
 *   prevIndex: 0
 * }]
 */
var addInputs = (inputs) => {
  var addinps = inputs.reduce(function (f, inp) {
    var prevHash = R.compose(utils.suffixBy, utils.bufferify, utils.reverseHex)(inp.prevHash)
    var prevIndex = R.compose(utils.suffixBy, utils.writeUIntBE(4))(inp.prevIndex)
    var spk = script.scriptPubKey(inp.from)
    var scriptPK = utils.suffixBy(spk)
    var scriptLength = R.compose(utils.suffixBy, Varint.encode)(spk.length)
    var sequence = utils.suffixBy(TRANSACTION.SEQUENCE)
    return R.compose(sequence, scriptPK, scriptLength, prevIndex, prevHash, f)
  }, (init) => init)

  return addinps
}

/* Add outputs to transaction
 * @param {Array} outputs - The outputs
 * e.g.
 * [{
 *   to: "1KKKK6N21XKo48zWKuQKXdvSsCf95ibHFa",
 *   value: 1.8
 * }]
 */
var addOutputs = (outputs) => {
  var addouts = outputs.reduce(function (f, out) {
    var spend = R.compose(utils.suffixBy, utils.writeUIntLE(8))(out.value * 100000000)
    var spk = script.scriptPubKey(out.to)
    var scriptPK = utils.suffixBy(spk)
    var scriptLength = R.compose(utils.suffixBy, Varint.encode)(spk.length)
    return R.compose(scriptPK, scriptLength, spend, f)
  }, (init) => init)

  return addouts
}

/* Create a raw transaction
 * @param {Object} payload - Contain sender/recipient's address, sent value and fee (in BTC, 1 satoshi = 0.00000001 BTC)
 * e.g. {from: "133txdxQmwECTmXqAr9RWNHnzQ175jGb7e", to: "1KKKK6N21XKo48zWKuQKXdvSsCf95ibHFa", value: 1.8, fee: 0.1}
 * @return {Buffer} - Raw transatction data
 */
var makeRawTx = (payload) => {
  var version = utils.suffixBy(TRANSACTION.VERSION)
  var inCounter = R.compose(utils.suffixBy, Varint.encode)(1)
  var outCounter = R.compose(utils.suffixBy, Varint.encode)(1)
  var lockTime = utils.suffixBy(TRANSACTION.LOCK_TIME)
  var sigHashType = utils.suffixBy(SIGHASHTYPE.ALL)

  var inputs = addInputs([{from: payload.from, prevHash: payload.prevHash, prevIndex: payload.prevIndex}])
  var outputs = addOutputs([{to: payload.to, value: payload.value}])

  return R.compose(sigHashType, lockTime, outputs, outCounter, inputs, inCounter, version)(Buffer.alloc(0))
}

module.exports = {
  makeRawTx: makeRawTx
}

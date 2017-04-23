var script = require('./script')
var ecpair = require('./ecpair')
var utils = require('./utils')
var TRANSACTION = require('./const').TRANSACTION
var SIGHASHTYPE = require('./const').SIGHASHTYPE
var R = require('ramda')
var Varint = require('varint')

/* Add inputs to transaction
 * @param {Array} inputs - The inputs, i.e. UTXO
 * e.g.
 * [{
 *   script: "76a914751e76e8199196d454941c45d1b3a323f1433bd688ac",
 *   prevHash: "c39e394d41e6be2ea58c2d3a78b8c644db34aeff865215c633fe6937933078a9",
 *   prevIndex: 0
 * }]
 */
var addInputs = (inputs) => {
  var addinps = inputs.reduce(function (f, inp) {
    var prevHash = R.compose(utils.suffixBy, utils.bufferify, utils.reverseHex)(inp.prevHash)
    var prevIndex = R.compose(utils.suffixBy, utils.writeUIntBE(4))(inp.prevIndex)
    var script = utils.suffixBy(inp.script)
    var scriptLength = R.compose(utils.suffixBy, Varint.encode)(inp.script.length)
    var sequence = utils.suffixBy(TRANSACTION.SEQUENCE)
    return R.compose(sequence, script, scriptLength, prevIndex, prevHash, f)
  }, (init) => init)

  return addinps
}

/* Add outputs to transaction
 * @param {Array} outputs - The outputs
 * e.g.
 * [{
 *   script: "76a914751e76e8199196d454941c45d1b3a323f1433bd688ac",
 *   value: 1.8
 * }]
 */
var addOutputs = (outputs) => {
  var addouts = outputs.reduce(function (f, out) {
    var spend = R.compose(utils.suffixBy, utils.writeUIntLE(8))(out.value * 100000000)
    var script = utils.suffixBy(out.script)
    var scriptLength = R.compose(utils.suffixBy, Varint.encode)(out.script.length)
    return R.compose(script, scriptLength, spend, f)
  }, (init) => init)

  return addouts
}

/* Create a raw transaction
 * @param {Object} payload - Contain sender/recipient's address, sent value and fee (in BTC, 1 satoshi = 0.00000001 BTC)
 * e.g. {from: "133txdxQmwECTmXqAr9RWNHnzQ175jGb7e", to: "1KKKK6N21XKo48zWKuQKXdvSsCf95ibHFa", value: 1.8, fee: 0.1}
 * @return {Buffer} - Raw transatction data
 */
var makeRawTx = (payload) => {
  var collectedInputs = payload.map(function (p) {
    return {script: script.scriptPubKey(p.from), prevHash: p.prevHash, prevIndex: p.prevIndex}
  })
  var collectedOutputs = payload.map(function (p) {
    return {script: script.scriptPubKey(p.to), value: p.value}
  })

  var version = utils.suffixBy(TRANSACTION.VERSION)
  var inCounter = R.compose(utils.suffixBy, Varint.encode)(collectedInputs.length)
  var outCounter = R.compose(utils.suffixBy, Varint.encode)(collectedOutputs.length)
  var lockTime = utils.suffixBy(TRANSACTION.LOCK_TIME)
  var sigHashType = utils.suffixBy(SIGHASHTYPE.ALL)

  var inputs = addInputs(collectedInputs)
  var outputs = addOutputs(collectedOutputs)

  return R.compose(sigHashType, lockTime, outputs, outCounter, inputs, inCounter, version)(Buffer.alloc(0))
}

var makeSignedTx = (wif, payload) => {
  var scriptSig = R.compose(script.scriptSig, ecpair.wifToPrivateKey(true))(wif)
  var scriptPubKey = script.scriptPubKey

  var collectedInputs = payload.map(function (p) {
    return {script: scriptSig(makeRawTx(payload)), prevHash: p.prevHash, prevIndex: p.prevIndex}
  })
  var collectedOutputs = payload.map(function (p) {
    return {script: scriptPubKey(p.to), value: p.value}
  })

  var version = utils.suffixBy(TRANSACTION.VERSION)
  var inCounter = R.compose(utils.suffixBy, Varint.encode)(collectedInputs.length)
  var outCounter = R.compose(utils.suffixBy, Varint.encode)(collectedOutputs.length)
  var lockTime = utils.suffixBy(TRANSACTION.LOCK_TIME)
  var sigHashType = utils.suffixBy(SIGHASHTYPE.ALL)

  var inputs = addInputs(collectedInputs)
  var outputs = addOutputs(collectedOutputs)

  return R.compose(sigHashType, lockTime, outputs, outCounter, inputs, inCounter, version)(Buffer.alloc(0))
}

module.exports = {
  makeRawTx: makeRawTx,
  makeSignedTx: makeSignedTx
}

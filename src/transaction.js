var script = require('./script')
var utils = require('./utils')
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
    var prevHash = utils.suffixBy(Buffer.from(inp.prevHash.match(/.{2}/g).reverse().join(''), 'hex'))
    var prevIndex = Buffer.alloc(4, 0)
    prevIndex.writeUIntBE(Buffer.from(intToHex(inp.prevIndex)), 0, 4)
    var prevIdx = utils.suffixBy(prevIndex)
    var spk = script.scriptPubKey(inp.from)
    var scriptPK = utils.suffixBy(spk)
    var scriptLength = utils.suffixBy(Varint.encode(spk.length))
    var sequence = utils.suffixBy([0xff, 0xff, 0xff, 0xff])
    return R.compose(sequence, scriptPK, scriptLength, prevIdx, prevHash, f)
  }, (payload) => payload)

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
    var satoshi = out.value * 100000000
    var value = Buffer.alloc(8, 0)
    value.writeUIntLE(Buffer.from(intToHex(satoshi)), 0, 8)
    var spend = utils.suffixBy(value)
    var spk = script.scriptPubKey(out.to)
    var scriptPK = utils.suffixBy(spk)
    var scriptLength = utils.suffixBy(Varint.encode(spk.length))
    return R.compose(scriptPK, scriptLength, spend, f)
  }, (payload) => payload)

  return addouts
}

var intToHex = (n) => {
  var hex = (n).toString(16)
  hex = hex.length % 2 === 0 ? '0x' + hex : '0x0' + hex
  return hex
}

/* Create a transaction
 * @param {Object} payload - Contain recipient's address, sent value and fee (in BTC, 1 satoshi = 0.00000001 BTC)
 * e.g. {from: "133txdxQmwECTmXqAr9RWNHnzQ175jGb7e", to: "1KKKK6N21XKo48zWKuQKXdvSsCf95ibHFa", value: 1.8, fee: 0.1}
 * @return {String} - Transaction in serialized hexadecimal form
 */
var tx = (payload) => {
  var version = utils.suffixBy([0x01, 0x00, 0x00, 0x00])
  var inCounter = utils.suffixBy(Varint.encode(1))
  var outCounter = utils.suffixBy(Varint.encode(1))
  var lockTime = utils.suffixBy([0x00, 0x00, 0x00, 0x00])
  var sigHashType = utils.suffixBy(SIGHASHTYPE.ALL)

  var inputs = addInputs([{from: payload.from, prevHash: payload.prevHash, prevIndex: payload.prevIndex}])
  var outputs = addOutputs([{to: payload.to, value: payload.value}])

  return R.compose(sigHashType, lockTime, outputs, outCounter, inputs, inCounter, version)
}

module.exports = {
  makeTx: tx
}

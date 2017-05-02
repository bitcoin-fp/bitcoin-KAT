/* bunch of helper functions */

var bigi = require('bigi')
var crypto = require('crypto')

var ecurve = require('ecurve')
var ecurveSecp256k1 = ecurve.getCurveByName('secp256k1')
var maxBound = ecurveSecp256k1.n

var bytesToBits = function (bytes) {
  var bits = Array.prototype.slice.call(bytes).map(function (byte) {
    var bits = byte.toString(2)
    // prepend '0' until length is 8
    while (bits.length < 8) {
      bits = '0' + bits
    }
    return bits
  }).join('')

  return bits
}

var prefixBy = (what) => (to) => {
  var bWhat = Buffer.from(what)
  var payload = Buffer.concat([bWhat, to], bWhat.length + to.length)
  return payload
}

var prefixTo = (to) => (what) => {
  var bWhat = Buffer.from(what)
  var payload = Buffer.concat([bWhat, to], bWhat.length + to.length)
  return payload
}

var suffixBy = (what) => (to) => {
  var bWhat = Buffer.from(what)
  var payload = Buffer.concat([to, bWhat], to.length + bWhat.length)
  return payload
}

var suffixTo = (to) => (what) => {
  var bWhat = Buffer.from(what)
  var payload = Buffer.concat([to, bWhat], to.length + bWhat.length)
  return payload
}

var slice = (start, end) => (buf) => buf.slice(start, end)

var bigify = (payload) => bigi.fromBuffer(Buffer.from(payload, 'hex'))

var bufferify = (payload) => Buffer.from(payload, 'hex')

var bufferifyString = (payload) => Buffer.from(payload)

var reverseHex = (hex) => hex.match(/.{2}/g).reverse().join('')

var intToHex = (integer) => {
  var hex = (integer).toString(16)
  hex = hex.length % 2 === 0 ? '0x' + hex : '0x0' + hex
  return hex
}

var writeUIntBE = (length) => (integer) => {
  var b = Buffer.alloc(length, 0)
  b.writeUIntBE(Buffer.from(intToHex(integer)), 0, length)
  return b
}

var writeUIntLE = (length) => (integer) => {
  var b = Buffer.alloc(length, 0)
  b.writeUIntLE(Buffer.from(intToHex(integer)), 0, length)
  return b
}

var getRandom = () => {
  var random
  var bigRandom
  do {
    random = crypto.randomBytes(32)
    bigRandom = bigi.fromBuffer(random)
  } while (bigRandom.signum <= 0 || bigRandom.compareTo(maxBound) >= 0)
  return random.toString('hex')
}

module.exports = {
  bytesToBits: bytesToBits,
  prefixBy: prefixBy,
  prefixTo: prefixTo,
  suffixBy: suffixBy,
  suffixTo: suffixTo,
  slice: slice,
  bigify: bigify,
  bufferify: bufferify,
  bufferifyString: bufferifyString,
  reverseHex: reverseHex,
  writeUIntBE: writeUIntBE,
  writeUIntLE: writeUIntLE,
  getRandom: getRandom
}

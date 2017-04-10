var bigi = require('bigi')

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

module.exports = {
  bytesToBits: bytesToBits,
  prefixBy: prefixBy,
  prefixTo: prefixTo,
  suffixBy: suffixBy,
  suffixTo: suffixTo,
  slice: slice,
  bigify: bigify,
  bufferify: bufferify,
  bufferifyString: bufferifyString
}

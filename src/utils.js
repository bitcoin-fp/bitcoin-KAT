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

module.exports = {
  bytesToBits: bytesToBits
}

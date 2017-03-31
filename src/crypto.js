var crypto = require('crypto')
var Ripemd160 = require('ripemd160')
var compose = require('ramda').compose

/* Returns SHA256 hash
 * @param {Buffer} data - The input to be hashed
 * @returns {Buffer} - SHA256 hash of data
 */
var sha256 = (data) => crypto.createHash('sha256').update(data).digest()

/* Returns double SHA256 hash
 * @param {Buffer} data - The input to be hashed
 * @ returns {Buffer} - Double SHA256 hash of data
 */
var dsha256 = compose(sha256, sha256)

/* Returns Ripemd160 hash
 * @param {Buffer} data - The input to be hashed
 * @ returns {Buffer} - Ripemd160 hash of data
 */
var ripemd160 = (data) => new Ripemd160().update(data).digest()

/* Returns Ripemd160 and SHA256 hash
 * @param {Buffer} data - The input to be hashed
 * @ returns {Buffer} -  Ripemd160 and SHA256 hash of data
 */
var dhash = compose(ripemd160, sha256)

module.exports = {
  sha256: sha256,
  dsha256: dsha256,
  ripemd160: ripemd160,
  dhash: dhash
}

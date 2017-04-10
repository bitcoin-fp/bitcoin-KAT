var crypto = require('crypto')
var Ripemd160 = require('ripemd160')
var base58 = require('bs58')
var compose = require('ramda').compose
var utils = require('./utils')

/* Returns SHA256 hash
 * @param {Buffer} data - The input to be hashed
 * @returns {Buffer} - SHA256 hash of data
 */
var sha256 = (data) => crypto.createHash('sha256').update(data).digest()

/* Returns double SHA256 hash
 * @param {Buffer} data - The input to be hashed
 * @returns {Buffer} - Double SHA256 hash of data
 */
var dsha256 = compose(sha256, sha256)

/* Returns Ripemd160 hash
 * @param {Buffer} data - The input to be hashed
 * @returns {Buffer} - Ripemd160 hash of data
 */
var ripemd160 = (data) => new Ripemd160().update(data).digest()

/* Returns Ripemd160 and SHA256 hash
 * @param {Buffer} data - The input to be hashed
 * @returns {Buffer} -  Ripemd160 and SHA256 hash of data
 */
var dhash = compose(ripemd160, sha256)

/* Key-stretching function
 * @param {String} data - The input
 * @param {String} salt - The salt
 * @returns {Buffer} - pbkdf2 crypto of data, length 512 bits
 */
var pbkdf2 = (data, salt) => crypto.pbkdf2Sync(data, salt, 2048, 64, 'sha512')

/* base58 checksum
 * @param {Buffer} data - The input
 * $returns {Hex} - The base58 checksum
 */
var base58Check = (data) => {
  var suffixChecksum = compose(utils.suffixBy, utils.slice(0, 4), dsha256)(data)
  return compose(base58.encode, suffixChecksum)(data)
}

/* HMAC SHA512
 * @param {String} data - The input
 * @param {String} salt - The salt
 * @returns {Buffer} - HMAC SHA512 crypto of data, length 512 bits
 */
var hmac512 = (salt) => (data) => crypto.createHmac('sha512', salt).update(data).digest()

module.exports = {
  sha256: sha256,
  dsha256: dsha256,
  ripemd160: ripemd160,
  dhash: dhash,
  pbkdf2: pbkdf2,
  base58Check: base58Check,
  hmac512: hmac512
}

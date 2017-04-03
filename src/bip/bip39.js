var sha256 = require('../crypto').sha256
var pbkdf2 = require('../crypto').pbkdf2
var bytesToBits = require('../utils').bytesToBits
var R = require('ramda')

var enWords = require('./english.json')

/* Returns checksum of entropy in bits
 * @param {Buffer} data - The input
 * @returns {String} - Checksum of entropy in bits
 */
var checksum = R.compose(bytesToBits, sha256)

/* Returns entropy + checksum
 * 128 bits + 4 bits
 * 160 bits + 5 bits
 * 192 bits + 6 bits
 * 224 bits + 7 bits
 * 256 bits + 8 bits
 * @param {Buffer} entropy - Random number source, length 128, 160, 192, 224 or 256 bits
 * @param {String} checksum - Checksum of entropy in bits
 * @returns {String} - Entropy + Checksum in bits
 */
var entropyCheck = (entropy) => (checksum) => bytesToBits(entropy) + checksum.substring(0, entropy.length * 8 / 32)

/* Returns array of mnemonic words
 * @param {JSON Object} wordList - The JSON mapping content of BIP39 word list
 * @param {String} pieces - The array of binary index of words
 * @returns {Array} - The array of mnemonic words
 */
var wordListMapping = (wordList) => (pieces) => pieces.map((binary) => wordList[parseInt(binary, 2)])

/* Compose functions to generate Mnemonic words
 */
var mnemonicWords = (entropy, wordMapping) => R.compose(R.join(' '), wordMapping, R.match(/(.{1,11})/g), entropyCheck(entropy), checksum)

/* Returns mnemonic words
 * @param {Buffer} entropy - Random number source, length 128, 160, 192, 224 or 256 bits
 * @param {String} language - language of word list
 * @returns {String} - The mnemonic words
 */
var mnemonic = (entropy, language) => {
  var engWordMapping = wordListMapping(enWords)
  return mnemonicWords(entropy, engWordMapping)(entropy)
}

/* Returns HD wallet seed
 * @param {Buffer} entropy - Random number source, length 128, 160, 192, 224 or 256 bits
 * @param {String} salt - The salt for pbkdf2
 * @returns {Buffer} - seed, length 512 bits
 */
var seed = (entropy, salt) => {
  var s = salt ? 'mnemonic' + salt : 'mnemonic'
  var m = mnemonic(entropy)
  return pbkdf2(m, s)
}

/* Returns HD wallet seed from mnemonic
 * @param {String} mnemonic - The mnemonic words
 * @param {String} salt - The salt for pbkdf2
 * @returns {Buffer} - seed, length 512 bits
 */
var seedByMnemonic = (mnemonic, salt) => {
  var s = salt ? 'mnemonic' + salt : 'mnemonic'
  return pbkdf2(mnemonic, s)
}

module.exports = {
  mnemonic: mnemonic,
  seed: seed,
  seedByMnemonic: seedByMnemonic
}

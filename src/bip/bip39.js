var sha256 = require('../crypto').sha256
var pbkdf2 = require('../crypto').pbkdf2
var bytesToBits = require('../utils').bytesToBits
var R = require('ramda')
// var curry = require('ramda').curry
// var compose = require('ramda').compose
// var match = require('ramda').match

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
var entropyCheck = R.curry((entropy, checksum) => bytesToBits(entropy) + checksum.substring(0, entropy.length * 8 / 32))

var words = R.curry((wordList, binary) => wordList[parseInt(binary, 2)])

var engWords = words(enWords)

var wordsMapping = (pieces) => pieces.map(engWords)

var mnemonicWords = R.compose(R.join(' '), wordsMapping, R.match(/(.{1,11})/g))

/* Returns mnemonic
 * @param {Buffer} entropy - Random number source, length 128, 160, 192, 224 or 256 bits
 */
var mnemonic = (entropy) => R.compose(mnemonicWords, entropyCheck(entropy), checksum)(entropy)

/* Returns HD wallet seed
 * @param {Buffer} entropy - Random number source, length 128, 160, 192, 224 or 256 bits
 * @param {String} salt - The salt for pbkdf2
 * @returns {Buffer} - seed, length 512 bits
 */
var seed = (entropy, salt) => {
  var s = salt ? 'mnemonic' + salt : 'mnemonic'
  var m = R.compose(mnemonicWords, entropyCheck(entropy), checksum)(entropy)
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

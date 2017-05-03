var utils = require('./src/utils')
var ecpair = require('./src/ecpair')
var address = require('./src/address')
var transaction = require('./src/transaction')

var k = (privateKey) => {
  if (!privateKey) privateKey = utils.getRandom()
  return {
    wif: ecpair.wif(privateKey),
    compressed_wif: ecpair.compressedWIF(privateKey),
    public_key: ecpair.uncompressedPublicKey(privateKey),
    compressed_public_key: ecpair.compressedPublicKey(privateKey)
  }
}

var kt = (privateKey) => {
  if (!privateKey) privateKey = utils.getRandom()
  return {
    wif: ecpair.wifTestnet(privateKey),
    compressed_wif: ecpair.compressedWIFTestnet(privateKey),
    public_key: ecpair.uncompressedPublicKey(privateKey),
    compressed_public_key: ecpair.compressedPublicKey(privateKey)
  }
}

var addr = (publicKey) => {
  if (!publicKey) throw new Error('No public key')
  return {
    address: address.address(publicKey)
  }
}

var addrt = (publicKey) => {
  if (!publicKey) throw new Error('No public key')
  return {
    address: address.addressTestnet(publicKey)
  }
}

var tx = (privateKey, connections) => {
  return {
    tx: transaction.makeSignedTx(privateKey, connections).toString('hex')
  }
}

module.exports = {
  keys: k,
  keys_testnet: kt,
  address: addr,
  address_testnet: addrt,
  transaction: tx
}

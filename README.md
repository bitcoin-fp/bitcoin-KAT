# bitcoin-KAT
[![](https://img.shields.io/badge/language-javascript-brightgreen.svg)]() [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Using the code to construct **Keys**, **Addresses** and **Transactions**.

## Install
`npm install bitcoin-KAT`
## Usage
```javascript
var bitcoin = require('bitcoin-KAT')
```
### Keys
Generate keys randomly
```javascript
bitcoin.keys()
```
Generate keys with given private key
```javascript
bitcoin.keys(privateKey) //privateKey: private key hex
```
Generate keys for `Testnet`
```javascript
bitcoin.keys_testnet()
```
### Address
Generate an address
```javascript
bitcoin.address(publicKey) //publicKey: public key hex
```
Generate an address for `Testnet`
```javascript
bitcoin.address_testnet(publicKey)
```
### Transaction
Generate a transaction rawdata, take a look at this [transaction](https://testnet.smartbit.com.au/tx/a027500c44b6e02d2587763b99751374294720e59630eeb3152e09a9fc7d8b04) for example. Currently support `P2PKH` only.
```javascript
var payment = [
  {
    from: 'n4j1MtzGZpivsqbvrcAqPV4GS74B3kS7qG', //payer's address
    to: 'mwCwTceJvYV27KXBc3NJZys6CjsgsoeHmf', //payee's address
    value: 0.64, //payment amount in BTC
    prevHash: '0e512b5ab9220e473928b0c2728aaa74ec66a1cc827caa29a744eb508d15f850', //the UTXO refers to previous tx's hash
    prevIndex: 0 //the index of UTXO refers to previous tx's output
  }
]
bitcoin.transaction(privateKey, payment) //privateKey: private key in WIF
````
## Test
Run `npm test`
## Reference
[Mastering Bitcoin, O'Reilly Media](https://github.com/bitcoinbook/bitcoinbook/tree/develop)

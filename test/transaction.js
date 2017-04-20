/* global describe, it */

var assert = require('assert')
var makeRawTx = require('../src/transaction').makeRawTx

describe('Transaction', function () {
  it('should be valid raw transaction', function () {
    var rawTx = makeRawTx({from: '1MBngSqZbMydscpzSoehjP8kznMaHAzh9y', to: '1FromKBPAS8MWsk1Yv1Yiu8rJbjfVioBHc', value: 0.00118307, prevHash: '96534da2f213367a6d589f18d7d6d1689748cd911f8c33a9aee754a80de166be', prevIndex: 0})
    assert.strictEqual(rawTx.toString('hex'), '0100000001be66e10da854e7aea9338c1f91cd489768d1d6d7189f586d7a3613f2a24d5396000000001976a914dd6cce9f255a8cc17bda8ba0373df8e861cb866e88acffffffff0123ce0100000000001976a914a2fd2e039a86dbcf0e1a664729e09e8007f8951088ac0000000001000000')
  })
})

module.exports = {
  'VERSION': {
    'ADDRESS_MAINNET': [0x00],
    'ADDRESS_TESTNET': [0x6F],
    'P2SH_ADDRESS': [0x05],
    'WIF': [0x80],
    'EXTENDED_PUBLIC_KEY': [0x04, 0x88, 0xB2, 0x1E],
    'EXTENDED_PRIVATE_KEY': [0x04, 0x88, 0xAD, 0xE4]
  },
  'NETWORK': {
    'MAINNET': [0x00],
    'TESTNET': [0x6F]
  },
  'SIGHASHTYPE': {
    'ALL': [0x01, 0x00, 0x00, 0x00],
    'NONE': 0x02,
    'SINGLE': 0x03,
    'ALL|ANYONECANPAY': 0x81,
    'NONE|ANYONECANPAY': 0x82,
    'SINGLE|ANYONECANPAY': 0x83
  }
}

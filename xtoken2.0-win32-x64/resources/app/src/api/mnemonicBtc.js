const bip39 = require('bip39');

const mnemonic = () => {
  setWord(bip39.generateMnemonic(128));
}


module.exports = mnemonic;
const Btc = require('bitcoinjs-lib');
// const Bitcoin = Btc.networks.bitcoin;
const bip39 = require('bip39');

let words = '', seedAsHex= '', root;
// 生成12个助记词
const generateMnemonic = () => {
  return words = bip39.generateMnemonic(128);
}

// 生成种子
const mnemonicToSeed = () => {
  let seedBuffer = bip39.mnemonicToSeed(words); // , 'bitcoin'
  seedAsHex = seedBuffer.toString('hex');
  return seedAsHex;
}

// 生成root:
const seedHex = () => {
  root = Btc.HDNode.fromSeedHex(seedAsHex);
  return {
    xprv: root.toBase58(),
    xpub: root.neutered().toBase58()
  }
}

 // 生成派生 BTC key:
const derivePathBTC = () => {
  let child0 = root.derivePath("m/44'/0'/0'/0/0");
  return {
    prv: child0.keyPair.toWIF(),
    address: child0.getAddress(),
    pub: child0.keyPair.getPublicKeyBuffer().toString('hex')
  }
}

// 生成 ETC key
const derivePathETH = () => {
  let child0 = root.derivePath("m/44'/60'/0'/0/0");
  return {
    prv: child0.keyPair.toWIF(),
    addres: child0.getAddress(),
    pub: child0.keyPair.getPublicKeyBuffer().toString('hex')
  }
}

module.exports = {
  mnemonic: generateMnemonic,
  seed: mnemonicToSeed,
  seedHex: seedHex,
  BTC: derivePathBTC,
  ETH: derivePathETH
}
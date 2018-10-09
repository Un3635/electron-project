
const bip39 = require('bip39');
const Btc = require('bitcoinjs-lib');
const hdkey = require('ethereumjs-wallet/hdkey')
const util = require('ethereumjs-util')

const network = Btc.networks.bitcoin;

let root, hdWallet;
// 生成12个助记词
const generateMnemonic = () => {
  return words = bip39.generateMnemonic(128);
}

// 生成BTC种子
const mnemonicToSeed = (words, coin) => {
  let seed = bip39.mnemonicToSeed(words); // , 'bitcoin'
  let seedAsHex = seed.toString('hex');

  if(coin.toUpperCase() === 'BTC') {

    root = Btc.HDNode.fromSeedHex(seedAsHex, network);
    // root = Btc.bip32.fromSeed(seed, network)
  } else if(coin.toUpperCase() === 'ETH') {

    hdWallet = hdkey.fromMasterSeed(seed);
  }
  // hdWallet = hdkey.fromMasterSeed(seed);
  return seedAsHex;
}

// 生成root:
// const seedHex = (seedAsHex) => {
//   root = Btc.HDNode.fromSeedHex(seedAsHex);
//   return {
//     xprv: root.toBase58(),
//     xpub: root.neutered().toBase58(),
//     root: root
//   }
// }

 // 生成派生 BTC key:
const derivePathBTC = (index) => {
  let key = root.derivePath("m/44'/0'/0'/0/" + index); // 
  return {
    prv: key.keyPair.toWIF(),
    address: key.getAddress(),
    pub: key.keyPair.getPublicKeyBuffer().toString('hex')
  }
  // let key = hdWallet.derivePath("m/44'/0'/0'/0/" + index);
  // console.log(key._hdkey._privateKey, index);
  // return {
  //   prv: util.bufferToHex(key._hdkey._privateKey),
  //   address: util.bufferToHex(util.pubToAddress(key._hdkey._publicKey, true)),
  //   pub: util.bufferToHex(key._hdkey._publicKey)
  // }
}

// 生成 ETC key
const derivePathETH = () => {
  let key = hdWallet.derivePath("m/44'/60'/0'/0/0");
  return {
    prv: util.bufferToHex(key._hdkey._privateKey),
    address: util.bufferToHex(util.pubToAddress(key._hdkey._publicKey, true)),
    pub: util.bufferToHex(key._hdkey._publicKey)
  }
}


module.exports = {
  mnemonic: generateMnemonic,
  seed: mnemonicToSeed,
  BTC: derivePathBTC,
  ETH: derivePathETH
}
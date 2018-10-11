

// const cluster  = require('cluster');
const bitcoinOp = require('./bitcoin');
// var process = require('process');

// var numCPUs  = require('os').cpus().length;
let coin__ = [];

const getMnemonic = (__coin) => {
  let words =  bitcoinOp.mnemonic();
  let seed = bitcoinOp.seed(words,  __coin || 'BTC');
  let __result =  {
    mnemonic: words,
    seed: seed
  }
  return __result;
}

const generate = (coin__, __coin = 'BTC', __start = 0, __end = 10) => {
  // 根据数量来 判断循环，已经循环的次数
    __coin = process.argv[3].toString().toUpperCase();
  // let coin__ = 
    coin__[__coin] = [];
  // __start = parseInt(process.argv[2]) * 10;
  // __end = __start + 10;
    __end = parseInt(process.argv[4])
    for(var i = __start; i < __end; i++) {
      (function(i){
        return function() {
          coin__[__coin].push(bitcoinOp[__coin](i));
        }()
      })(i)
    }
    console.log(coin__)
    return coin__;
}
  
const generateETH = (__coin = 'ETH', __start = 0, __end = 10) => {
  // 根据数量来 判断循环，已经循环的次数
  let coin__ = {};
  __coin = process.argv[3].toString().toUpperCase();
  coin__[__coin] = [];
  // __start = parseInt(process.argv[2]) * 10;
  // __end = __start + 10;
  __end = parseInt(process.argv[4])
  for(var i = __start; i < __end; i++) {
    (function(i){
      return function() {
        coin__[__coin].push(Object.assign(getMnemonic(__coin), bitcoinOp[__coin](0)));
        // coin__.push();
      }()
    })(i)
  }
  // coin__[__coin].push(bitcoinOp[__coin](__start));
 
  // console.log(__start, __end);
  // console.log(coin__);
  // console.log(__start, __end);
  return coin__;
}

const judgeBitcoin = () => {
  // console.log(bitcoinOp.BTC());
  switch((process.argv[3].toString()).toUpperCase()) {
    case 'BTC':
      // if(process.argv[2].toString() === '0') {
      //   // console.log(getMnemonic())
      //   coin__ = getMnemonic();
      // }
      coin__ = getMnemonic();
      generate(coin__);

      break;
    case 'ETH': 
      coin__ = generateETH();
      console.log(coin__);
      break;
    default: return;

  }
}

judgeBitcoin();

// module.exports = {
//   getMnemonic: getMnemonic,
//   generate: generate,
// }

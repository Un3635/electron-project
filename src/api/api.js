

// const cluster  = require('cluster');
const bitcoinOp = require('./bitcoin');
// var process = require('process');

// var numCPUs  = require('os').cpus().length;
let coin__ = [], TAG = false;

const getMnemonic = (__coin) => {
  let words =  bitcoinOp.mnemonic();
  let seed = bitcoinOp.seed(words,  __coin || 'BTC');
  let __result =  {
    mnemonic: words,
    seed: seed
  }
  return __result;
}

// 生成BTC 的密钥, 地址
const generate = (__coin = 'BTC', __start = 0, __end = 10) => {
  // 根据数量来 判断循环，已经循环的次数
    let coin__ = [];
    __coin = process.argv[2].toString().toUpperCase();
    __start = parseInt(process.argv[3]);
    __end = parseInt(process.argv[4]);
  //  console.log(__start, __end);
    for(var i = __start; i < __end; i++) {
      (function(i){
        return function() {
          var param = bitcoinOp[__coin](i);
          // console.log(i);
          coin__.push(param);
        }()
      })(i)
    }
    return coin__;
}
  
const generateETH = (__coin = 'ETH', __start = 0, __end = 10) => {
  // 根据数量来 判断循环，已经循环的次数
  let coin__ = [];
  __coin = process.argv[2].toString().toUpperCase();
  __start = parseInt(process.argv[3]);
  __end = parseInt(process.argv[4])

  for(var i = __start; i < __end; i++) {
    (function(i){
      return function() {
        coin__.push(Object.assign(getMnemonic(__coin), bitcoinOp[__coin](i)));
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

  switch((process.argv[2].toString()).toUpperCase()) {
    case 'BTC':
      // if(process.argv[2].toString() === '0') {
      //   // console.log(getMnemonic())
      //   coin__ = getMnemonic();
      //   TAG = true;
      // }
      // coin__ = getMnemonic();
      console.log(generate())

      break;
    case 'ETH':
      console.log(generateETH());
      break;
    default: return;

  }
}

judgeBitcoin();

// module.exports = {
//   getMnemonic: getMnemonic,
//   generate: generate,
// }

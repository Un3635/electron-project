

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
  
  // generate();
  
  // console.log(typeof __result);

  return __result;
}

const generate = (__coin = 'BTC', __start = 0, __end = 10) => {
  // 根据数量来 判断循环，已经循环的次数
  let coin__ = {};
  // __coin = process.argv[3].toString().toUpperCase();

  coin__[__coin] = [];
  // __start = parseInt(process.argv[2] * 10);
  // __end = __start + 10;
  for(var i = __start; i < __end; i++) {
    (function(i){
      return function() {
        coin__[__coin].push(bitcoinOp[__coin](i));
      }()
    })(i)
  }
  // __result = Object.assign(__result, coin__);
  // __result[__coin].push(bitcoinBTC[__coin](root, __count));
  // console.log("进程 " + process.argv[2] + " 执行。"  +  process.argv[3].toUpperCase());
  // console.log(coin__);
  // console.log(__start, __end);
  return coin__;
}

const judgeBitcoin = () => {
  // console.log(process.argv[3].toUpperCase())
  // console.log(bitcoinOp.BTC());
  switch((process.argv[3].toString()).toUpperCase()) {
    case 'BTC':
      if(process.argv[2].toString() === '0') {
        // console.log(getMnemonic())
        coin__ = getMnemonic();
      }
      generate(coin__);

      break;
    case 'ETH': coin__.push(getMnemonic());break;
    default: return;

  }
}

// judgeBitcoin();

module.exports = {
  getMnemonic: getMnemonic,
  generate: generate,
}
// module.exports = judgeBitcoin;

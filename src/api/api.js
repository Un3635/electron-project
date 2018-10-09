

const bitcoinOp = require('./bitcoin');


const getMnemonic = (__coin) => {
  let words =  bitcoinOp.mnemonic();
  let seed = bitcoinOp.seed(words,  __coin || 'BTC');
  let __result =  {
    mnemonic: words,
    seed: seed
  }
  return __result;
}

const generate = (__coin, __start, __end) => {
  let coin__ = {};
  coin__[__coin] = [];

  for(var i = __start; i < __end; i++) {
    (function(i){
      return function() {
        coin__[__coin].push(bitcoinOp[__coin](i));
      }()
    })(i)
  }
  // __result = Object.assign(__result, coin__);
  // __result[__coin].push(bitcoinBTC[__coin](root, __count));
  return coin__;
}

module.exports = {
  getMnemonic: getMnemonic,
  generate: generate,
}
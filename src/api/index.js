const path = require('path');
const child_process = require('child_process');

// const bitcoinOp = require('./');
// var as = require('./api');
let arr = [], count = 0;


const theadCus = (circle = 1, coin = 'BTC', cb, cb2) => {
// console.log(bitcoinOp.seed(bitcoinOp.mnemonic()));
// console.log(bitcoinOp.BTC(0))
  // cb && cb('12');
  const __path = path.join(__dirname, 'api.js');
  const circleC = 1;
  // console.log(__path);
  arr = [];
  count = 0;
  for(var i=0; i< circleC; i++) {
    // if(i !== 0) TAG = 'MORE';
    const child = child_process.fork(__path, [i, coin, circle], {
      silent: true
    });
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
      if(data.slice(0, 1) !== '{') {
        cb2 && cb2(data);
      } else {
        // arr.push(data+'');
        arr = eval("(" +data+ ")")
      }
     });
 
     child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        // __res += '失败';
    });

    child.on('close', function (code) {
      count++;
      console.log('子进程已退出，退出码 ' + code);
      // __res += '退出'+code+__path;
      // __res += __path;
      
      
      if(count === circleC) {
        cb && cb(arr);
      }
    });
  }
  
}

// const bitcoinOp = require('./bitcoin');

// const theadCus = (circle = 1, coin = 'BTC', cb, cb2) => {
//   console.log(bitcoinOp.seed(bitcoinOp.mnemonic()));
//   var res = bitcoinOp.BTC(0);
//   console.log(res)
//     cb && cb(res.prv);
// }
// export default theadCus;
module.exports = theadCus;
// theadCus();
const path = require('path');
const child_process = require('child_process');
// const bitcoinOp = require('./bitcoin');
// const APIS = require('./api');
let ADS = ['zhu', 'hui', 'lan']
// console.log(APIS.getMnemonic());

// const bitcoinOp = require('./');
// var as = require('./api');
let arr = [], count = 0;


const theadCus = (circle = 1, coin = 'BTC', cb, cb2) => {

  // cb && cb('12');
  const __path = path.join(__dirname, 'api.js');
  let cicleCount = 4, circleNum = 1 ,ii = 0;
  arr = [];
  count = 0;
  
  if(circle < cicleCount) {
    cicleCount = circle;
  } else {
    circleNum = Math.round(circle / cicleCount);
  }
  // if(circle > 1)
  for(var i=0; i< circleNum; i++) {
    // if(i !== 0) TAG = 'MORE';
    if( i === 0 ) {
      cicleCount = circle%cicleCount;
    }
    const child = child_process.fork(__path, [i, coin, cicleCount, ADS[i]], {
      silent: true
    });
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
  
      if(data.slice(0,1) !== '{' || data.slice(0,1) !== '[') {
            // if()
        var O = eval("(" +data+ ")");
        if(O.mnemonic) {
          
        }
        console.log('stdout: ', O);
      }
      // if(typeof O === 'object') {
      //   console.log(1)
      // } else {
      //   console.log(2)
      // }
      // if(coin === 'BTC') {
      //   if(Number(data)) {
      //     cb2 && cb2(data);
      //   } else {
      //     var __data = eval("(" +data+ ")");
      //     ii++;
      //     if(__data.mnemonic) {
      //       // arr = Object.assign(arr, {
      //       //   mnemonic: __data.mnemonic,
      //       //   seed: __data.seed,
      //       // })
      //       arr.mnemonic = __data.mnemonic;
      //       arr.seed = __data.seed;
      //       if(!arr[coin])  {
      //         console.log(arr)
      //         arr[coin] = [];
      //         console.log(ii, 'zhu4');
      //       } 
            
      //       arr[coin].push({
      //         prv: __data.prv,
      //         address: __data.address,
      //         pub: __data.pub
      //       });
      //       console.log(ii, 'zhu0');
      //     } else {
      //       if(!arr[coin]) {
      //         arr[coin] = [];
      //         console.log(ii, 'zhu3',  );
      //       } 
      //       arr[coin].push(__data)
      //       console.log(arr);
      //       console.log(ii, 'zhu1', arr[coin].length);
      //     }
          
         
      //   } 
        
      // } else {
      //   arr = (eval("(" +data+ ")"));
      // }
     });
 
     child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        // __res += '失败';
    });

    child.on('close', function (code) {
      count++;
      console.log('子进程已退出，退出码 ' + code+'count, circleNum', count, circleNum);
      // __res += '退出'+code+__path;
      // __res += __path;
      
      // console.log(arr)
      if(count === circleNum) {
        cb && cb(arr);
      }
    });
  }
  
}
// console.log("进程 " + eval('('+process.argv[5]+')')() + " 执行。" );
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
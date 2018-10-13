const path = require('path');
const child_process = require('child_process');
const mnemonicBtc = require('./mnemonicBtc');

// const bitcoinOp = require('./');
// var as = require('./api');


var getWordBtc = (cb) => {
  mnemonicBtc('BTC');
  cb && cb();
}

var BtcCountInterval = (c) => {
  if(c <= 100) {return 10;}
  if(100 < c <= 500) {return 20;}
  if(500 < c <= 1500) {return 25;}
  if(1500 < c <= 3000) {return 30;}
  if(3000 < c <= 5000) {return 50;}
  if(5000 < c <= 10000) {return 100;} // 最多100, 之后的数据会显示'more', 导致拿不到更多的数据
  if(c > 10000) {return 100;}
}

/**
 *  cicleCount： 每个线程运行的次数 BTC 每次只运行10次，而ETH每次运行100
 *  cicle: 输入框中输入的数据
 *  circleNum: 一次性开始25个子线程， 一旦线程数量较多，则在一个线程死后，重新开一一个
 */

const theadCus = (circle = 1, coin = 'BTC', cb, cb2) => {
 
  // cb && cb('12');
  const __path = path.join(__dirname, 'api.js');
  let cicleCount = BtcCountInterval(circle), circleMax = 25, circleTotal = 1, circleNum = 1 ,ii = 0;
  var arr = [], count = 0, threadCount = 0;
  var startCount = 0, endCount = 0;

  arr[coin] = [];
  
  if(circle < cicleCount) {
    cicleCount = circle;
  } else {
    circleNum = Math.ceil(circle / cicleCount);
    circleTotal = circleNum;
    if(circleNum >= circleMax) {
      circleNum = circleMax;
    }
    
  }
  
  var createThread = function() {
    
    for(var i=0; i< circleNum; i++) {
      // if(i !== 0) TAG = 'MORE';
      if(i === 0) {
        if(circle%cicleCount !== 0) {
          if(i === 0) {
            startCount = 0;
            endCount = startCount + circle%cicleCount;
          }
        } else {
          startCount = 0;
          endCount = startCount + cicleCount;
        }
      } else {
        startCount = endCount;
        endCount = startCount + cicleCount;
      }
      
      var childTread = function(startCount, endCount) {
        const child = child_process.fork(__path, [coin, startCount, endCount, getWord()], {
          silent: true
        });
        child.stdout.setEncoding('utf8');
        // if(this.coin === 'BTC') {
        //   child.send({'word': getWord()})
        // }
        child.stdout.on('data', function (data) {
          console.log('stdout: ',data, ii);
          ii++;
          var __data = eval("(" +data+ ")");
          arr[coin] = arr[coin].concat(__data);
          cb2 && cb2(ii)
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
          
          var result = function() {
            // console.log(arr);
            if(coin === 'BTC') {
              arr.mnemonic = getWord();
            }
            cb && cb(arr);
          }
          if(circleTotal === circleNum) {
            if(count === circleNum) {
              result();
            }
          } else {
            if(threadCount === circleTotal - circleMax) {
              result();
            } else {
              threadCount++;
              var __startCount = (circleMax + threadCount - 1) * cicleCount;
              var __endCount = __startCount + cicleCount;
              childTread(__startCount, __endCount);
            }
          }
         
        });
      }
      childTread(startCount, endCount);
    }
  
  }
  if(coin === 'BTC') {
    getWordBtc(() => {
      createThread();
    })
  } else {
    createThread();
  }
  
  // if(circle > 1)
  
  
}

// export default theadCus;
module.exports = theadCus;
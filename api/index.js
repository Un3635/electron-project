const path = require('path');
const child_process = require('child_process');

// const bitcoinOp = require('./bitcoin');
// var as = require('./api');
let arr = [], count = 0;


const theadCus = (circle = 1, coin = 'BTC', cb, cb2) => {
  const __path = path.join(__dirname, 'test.js');
  const circleC = 1;
  // const __path = path.join(__dirname, 'api/test.js');
  console.log(__path);
  arr = [];
  count = 0;
  for(var i=0; i< circleC; i++) {
    // var workerProcess = child_process.spawn('node', [__path, i, 'btc']);
    // var workerProcess = child_process.exec('node', [__path, i]);
    // var workerProcess = child_process.fork(__path, {
    // 	silent: false
    // });
    // if(i !== 0) TAG = 'MORE';
    const childProcess = child_process.fork(__path, [i, coin, circle], {
      silent: true
    });
    //   child.on('message', function(m){
    //     // console.log('message from child: ' + JSON.stringify(m));
    //     __res += 'child';
    //     // cb && cb(__res);
    // });
    
    // child.send({from: 'parent'});
    childProcess.stdout.setEncoding('utf8');
    childProcess.stdout.on('data', function (data) {
      console.log(data);
      if(data.slice(0, 1) !== '{') {
        // console.log(data);
        cb2 && cb2(data);
      } else {
        // console.log(eval("(" + data + ")"));
        arr = eval("(" + data + ")");
        // count++;
        // if(count === circleC) {
        //   childProcess.kill()
        // }
      }

     
     });
 
     childProcess.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        // __res += '失败';
    });

    childProcess.on('close', function (code) {
      // count++;
      console.log('子进程已退出，退出码 ' + code);
      
      if(count === circleC) {
        cb && cb(arr);
      }
    });
  }
  
}
// export default theadCus;
module.exports = theadCus;
// theadCus();
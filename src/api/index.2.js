const cluster  = require('cluster');
const path = require('path');
// const apis = require('./api.js');

var numCPUs  = require('os').cpus().length;

// var arr = [];

function fibo (n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}


console.log(cluster.isMaster);

// const main = (param) => {
//   let mainThread = param.mainThread || null;
//   let childThread = param.mainThread || null;
//   let unitCount =  param.circleCount || 10; // 每个子线程所获取的私钥数量
//   let totalCount = param.totalNum || 1; // 每核需要获取的私钥的数量
//   let lastNum = totalCount % 4;
//   let childThreadNum = 1; // 子线程的数量
//   let childThreadCount = 1; // 实际每个子线程的
//   if(Math.floor(totalCount / 4) < unitCount) { // 当每核数量小于线程数量
//     childThreadNum = 1;
//   } else {
//     childThreadNum =  Math.round(param.totalNum / 40);
//   }


//   var fn = function() {
//     if(cluster.isMaster) {
//       // 主线程
//       var mainRes = mainThread && mainThread();
//       console.log(mainRes)
  
//       // 创建子线程
//       var i = 0;
//       if(totalCount < numCPUs) {
//         console.log(1234);
//             cluster.fork();
//         i = 1;
//       } else {
//         for(let i = 0; i < numCPUs; i++) {
//           for(let j = 0; j < childThreadNum; j++) {
//             console.log(i, j);
//             cluster.fork();
//           }
//         }
//         i = numCPUs * childThreadNum;
//       }
      
      
      
//       // for (const id in cluster.workers) {
//       //   cluster.workers[id].on('message', (msg) => {
//       //     console.log(msg);
//       //   });
//       //   // console.log(id)
//       //   // if( id )
        
//       // }
//       console.log(i);
//       cluster.on('exit', (Worker, code, signal) => {
//         if(!--i){
//           // 执行成功获取到的数据
//           console.log('8 cluster' + i);
          
//           process.exit(0);
//         }
//       })
//     }else {
//       // 子线程
//       // console.log(fibo (40));
//       console.log(122);
//       var res = childThread && childThread();
//       console.log(res);
//       // process.send({
//       //   data: res
//       // })
//       process.exit(0);
//     }
//   }
//   fn();
// }
// // const quit = () => {
// //   cluster.on('exit', (worker, code, signal) => {
// //     console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
// //   });
// // }
// // quit();
// module.exports = {
//   main: main
//   // quit: quit 
// };


const theadCus = () => {
  if (cluster.isMaster) {
    // 循环 fork 任务 CPU i5-7300HQ 四核四进程
    for (let i = 0; i < 6; i++) {
      cluster.fork()
    }
    var i=6;
    cluster.on('exit', function(worker, code, signal) {
      if(!--i){
        console.timeEnd('8 cluster');
        process.exit(0);
      }
    });
  } else {
    console.log(fibo (40));
    process.exit(0);
  }
}

export default theadCus;
// theadCus();
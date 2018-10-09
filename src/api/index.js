const fs = require('fs');
const child_process = require('child_process');

const path = require('path');
// const apis = require('./api.js');
var arr = [];

console.log(__dirname);
const theadCus = (circle = 1) => {
  const __path = path.join(__dirname, 'api.js');
  console.log(__path);
  console.log('circle', circle);
  for(var i=0; i< circle; i++) {
    var workerProcess = child_process.exec('node '+__path, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        // console.log(typeof stdout);
        arr.push(stdout)
        // console.log('stderr: ' + stderr);
    });
 
    workerProcess.on('exit', function (code) {
        // console.log('子进程已退出，退出码 '+code);
    });
}
return arr;
}
module.exports = theadCus;
const path = require('path');
var child_process = require('child_process');

var arr = [];

const theadCus = (circle = 1, cb) => {
  const __path = path.join(__dirname, 'api.js');
  // console.log(__path);
  for(var i=0; i< 1; i++) {
		var workerProcess = child_process.spawn('node', [__path, i, 'btc']);
		workerProcess.stdout.on('data', function (data) {
			// console.log(typeof data);
			console.log('stdout: ' + data);
			arr.push(data+'');
   	});
 
		workerProcess.stderr.on('data', function (data) {
				console.log('stderr: ' + data);
		});

		workerProcess.on('close', function (code) {
			console.log('子进程已退出，退出码 ' + code);
			 cb && cb(arr);
		});
	}
}
module.exports = theadCus;
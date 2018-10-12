const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron')
const ipc = electron.ipcMain

// const path = require('path');
// const child_process = require('child_process');

// const bip39 = require('bip39');
// const Btc = require('bitcoinjs-lib');
// const hdkey = require('ethereumjs-wallet/hdkey')

  

let win

let template = []

function createWindow () {

  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 1000, 
    height: 700, 
    transparent: true, 
    frame: false,
    resizable : false,
    'webPreferences': {
      'plugins': true
    }

  })
  // , transparent: true, frame: false
  
  // 然后加载应用的 index.html。
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // if (process.env.NODE_ENV === 'development') {
  //   mainWindow.webContents.openDevTools()
  // }
  // 打开开发者工具。
  win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })


  //登录窗口最小化
  ipc.on('window-min',function(){
    win.minimize();
  })
  //登录窗口最大化
  ipc.on('window-max',function(){
    if(win.isMaximized()){
        win.setMaximizable(false);
        win.restore();  
    }else{
        win.setMaximizable(true);
        console.log(win.getMaximizable())
        win.maximize(); 
    }
  })
  ipc.on('window-close',function(){
    win.close();
  })
}

function redirectUrl(url){
  win.loadURL(url.format({
    pathname: path.join(__dirname, url),
    protocol: 'file:',
    slashes: true
  }))
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})


// let root, hdWallet;

// ipcMain.on('getWord', (ev, arg) => {
// //   let words = bip39.generateMnemonic(128);
// //   let seed = bip39.mnemonicToSeed(words); // , 'bitcoin'
// //   let seedAsHex = seed.toString('hex');
// //   root = Btc.HDNode.fromSeedHex(seedAsHex);
// //  console.log(words)
//   mainWindow.webContents.send('word',words); //发送消息给渲染进程 
//   var theadCus = (circle = 1, coin = 'BTC', cb, cb2) => {
//     const __path = path.join(__dirname, 'api/api.js');
//     const circleC = 1;
//     // console.log(__path);
//     arr = [];
//     count = 0;
//     for(var i=0; i< circleC; i++) {
//       // if(i !== 0) TAG = 'MORE';
//       const child = child_process.fork(__path, [i, coin, circle], {
//         silent: true
//       });
//       child.stdout.setEncoding('utf8');
//       child.stdout.on('data', function (data) {
//         console.log('stdout: ' + data);
//         if(data.slice(0, 1) !== '{') {
//           cb2 && cb2(data);
//         } else {
//           arr.push(data+'');
//         }
//        });
   
//        child.stderr.on('data', function (data) {
//           console.log('stderr: ' + data);
//           // __res += '失败';
//       });
  
//       child.on('close', function (code) {
//         count++;
//         console.log('子进程已退出，退出码 ' + code);
//         // __res += '退出'+code+__path;
//         // __res += __path;
        
        
//         if(count === circleC) {
//           // cb && cb(arr);
//         }
//       });
//     }
//   }
//   theadCus();
// })

// const getMnemonicETH = () => {
//   let words = bip39.generateMnemonic(128);
//   let seed = bip39.mnemonicToSeed(words); // , 'bitcoin'

//   hdWallet = hdkey.fromMasterSeed(seed);
//   return words;
// }

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
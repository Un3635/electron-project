import { app, BrowserWindow, ipcMain } from 'electron'

import theadCus from '../api/index.js';
// import APIS from '../api/api.js'
import bip39 from 'bip39'
import Btc from 'bitcoinjs-lib'
import hdkey from 'ethereumjs-wallet/hdkey'
import util from 'ethereumjs-util'


// import hh from '../api/index.js';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1200,
    frame: false, // 去掉默认菜单
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 窗口最小化
ipcMain.on('window-min', (ev, arg) => {
  mainWindow.minimize()
})

// 窗口最大化
ipcMain.on('window-max', (ev, arg) => {
  if(mainWindow.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow.maximize();
  }
})

// 退出程序
ipcMain.on('window-closed', (ev, arg) => {
  mainWindow.close();
  mainWindow = null;
})



//


let root, hdWallet;

ipcMain.on('getMnemonic', (ev, arg) => {
  let words = bip39.generateMnemonic(128);
  let seed = bip39.mnemonicToSeed(words); // , 'bitcoin'
  let seedAsHex = seed.toString('hex');
  root = Btc.HDNode.fromSeedHex(seedAsHex);
 console.log(words)
  mainWindow.webContents.send('msg',words); //发送消息给渲染进程 
})

const getMnemonicETH = () => {
  let words = bip39.generateMnemonic(128);
  let seed = bip39.mnemonicToSeed(words); // , 'bitcoin'

  hdWallet = hdkey.fromMasterSeed(seed);
  return words;
}

const derivePathBTC = (index) => {
  let key = root.derivePath("m/44'/0'/0'/0/" + index); // 
  return {
    prv: key.keyPair.toWIF(),
    address: key.getAddress(),
    pub: key.keyPair.getPublicKeyBuffer().toString('hex')
  }
  // let key = hdWallet.derivePath("m/44'/0'/0'/0/" + index);
  // console.log(key._hdkey._privateKey, index);
  // return {
  //   prv: util.bufferToHex(key._hdkey._privateKey),
  //   address: util.bufferToHex(util.pubToAddress(key._hdkey._publicKey, true)),
  //   pub: util.bufferToHex(key._hdkey._publicKey)
  // }
}

const derivePathETH = () => {
  let words = getMnemonicETH();
  let key = hdWallet.derivePath("m/44'/60'/0'/0/0");
  return {
    mnemonic: words,
    prv: util.bufferToHex(key._hdkey._privateKey),
    address: util.bufferToHex(util.pubToAddress(key._hdkey._publicKey, true)),
    pub: util.bufferToHex(key._hdkey._publicKey)
  }
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
        coin__[__coin].push(derivePathBTC(i));
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
ipcMain.on('getAddress', (ev, arg0, arg1, arg2) => {
  // console.log(APIS.generate(arg))
  
  // console.log(arg0, arg1, arg2)
  let res = generate(arg0, arg1, arg2);
  // console.log(res);
  mainWindow.webContents.send('msgAddress',res); //发送消息给渲染进程 
  
  
})

ipcMain.on('getETH', (ev, arg0, arg1, arg2) => {
  // console.log(APIS.generate(arg))
  
  // console.log(arg0, arg1, arg2)
  let res = derivePathETH(arg0, arg1, arg2);
  // console.log(res);
  mainWindow.webContents.send('msgETH',res); //发送消息给渲染进程 
  
  
})




ipcMain.on('theadCus', (ev, arg) => {
// theadCus();
// hh();
  theadCus(112, (res) => {
    // this.num = res;
    // if(typeof  res[0] === 'string')
    //    var o = eval("(" + res[0] + ")");
    //  else
    //    var o = res;
    console.log(res);
      mainWindow.webContents.send('msgTheadCus',res);
      //  console.log(res);

    //  console.log(o.mnemonic);

     // this.listData = o;
     // this.lastCircle();
 });
    

// var w;
// console.log(typeof(Worker))
//   if(typeof(Worker) !== 'undefined') {
    
//     w =new Worker('/src/api/webw.js');
//     try{
//       w.onmessage = function (event) {
//         // document.getElementById("result").innerHTML=event.data;
//         // var res = JSON.parse();
//         // console.log(event.data)
//         // that.fileName = that.coin+'-'+that.createDate();
//         // that.listData = res.data.result;
//         // that.$Loading.finish();
//         // that.spinShow = false;
//         mainWindow.webContents.send('msgTheadCus',event.data + 'zhu');
//         if(parseInt(event.data) === 10) {
//           w.terminate();
//         }
//       }
//     }catch(e) {
//       mainWindow.webContents.send('msgTheadCus',e + 'zhu');
     
//         // setTimeout(() => {
          
//         // }, 50)
//     }
//   }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */


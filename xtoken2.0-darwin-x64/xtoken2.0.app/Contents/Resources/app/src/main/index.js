import { app, BrowserWindow, ipcMain } from 'electron'


// import theadCus from '../api/index.js';
// import APIS from '../api/api'

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
  // 打开开发者工具。
  mainWindow.webContents.openDevTools()

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
// ipcMain.on('getMnemonic', (ev, arg) => {
//   // theadCus();
//   // hh();
//   mainWindow.webContents.send('msg',APIS.getMnemonic()); //发送消息给渲染进程 

// })

// ipcMain.on('getAddress', (ev, arg0, arg1, arg2) => {
//   // console.log(APIS.generate(arg))
//   console.log(arg0, arg1, arg2)
//   // mainWindow.webContents.send('msgAddress',APIS.generate(arg)); //发送消息给渲染进程 
  
  
// })

// 
ipcMain.on('theadCus', (ev, arg) => {
// theadCus();
// hh();
//   theadCus(112, (res) => {
//     // this.num = res;
//     // if(typeof  res[0] === 'string')
//     //    var o = eval("(" + res[0] + ")");
//     //  else
//     //    var o = res;
//       mainWindow.webContents.send('msg',res); //发送消息给渲染进程
//       //  console.log(res);

//     //  console.log(o.mnemonic);

//      // this.listData = o;
//      // this.lastCircle();
//  });
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


const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron')
const ipc = electron.ipcMain

// 添加flash插件
app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'))
  
// 可选：指定 flash 的版本
app.commandLine.appendSwitch('ppapi-flash-version', '30.0.0.113') 

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
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

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
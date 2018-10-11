
// const addressBtn = document.querySelector("#address-btn");
// const address = document.querySelector("#address");
// const importBtn = document.querySelector("#import-btn");
// const textareaBox = document.querySelector("#textarea-box");
// const importAddress = document.querySelector("#import-address");
// const transactionBtn = document.querySelector("#transaction-btn");
// const transactionBtn2 = document.querySelector("#transaction-btn2");
// const balance = document.querySelector("#balance");
// const unbalance = document.querySelector("#unbalance");
// const output = document.querySelector("#output");
// const input = document.querySelector("#input");
// const ipc = require('electron').ipcRenderer;
// const theadCus = require('')
window.onload = function() {
  $("#btn").on('click', function() {
    $('#test').html(122)
  })
}
// //点击生成助记词按钮
// mnemonicBtn.onclick = ()=>
// {
//   ipc.send('createMnemonic');
//   ipc.on('mnemonicTxt', (event, arg) => {
//     mnemonic.innerHTML = arg;
//     address.innerHTML = '暂无地址';
//   });
// };
// //点击生成地址按钮
// addressBtn.onclick = ()=>
// {
//   let words = mnemonic.innerHTML;
//   ipc.send('createAddress',words);
//   ipc.on('addressTxt', (event, arg) => {
//     address.innerHTML = arg;
//   });
// };

// //点击导入钱包按钮
// importBtn.onclick = ()=>
// {
//   let words = textareaBox.value;
//   if(words === '') {
//     importAddress.innerHTML = "助记词为空"
//   } else {
//     ipc.send('importAddress',words);
//   }
//   ipc.on('importAddressTxt', (event, arg) => {
//     importAddress.innerHTML = arg;
//   });
//   ipc.on('balance', (event, arg0,arg1) => {
//     balance.innerHTML = arg0;
//     unbalance.innerHTML = arg1;
//   });
// };

// //点击转账按钮1
// transactionBtn.onclick = ()=>{
//   ipc.send('transaction', output.value, input.value);
// };

// //点击转账按钮2
// transactionBtn2.onclick = ()=>{
//   ipc.send('transaction2', output.value, input.value);
// };
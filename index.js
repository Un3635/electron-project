var theadCus = require('./api/index');

let btn, content;
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

console.log(theadCus)

  var canvas = {
     init() {
      btn = $('#btn');
      content = $('#content');
     },
     show(c) {
      content.html(c);
     }
  }
  var render = {
    num: 10,
    coin: 'BTC',
    spinShow: false,
    opShow: false,
    allCoin: [
      {name: 'BTC'},
      {name: 'ETH'}
    ],
    listData: [],
    fileName: '',
    loadStr: '保存',
    count: 10,
    ETHcircleCount: -99,
    percent: 0,
    generate(T) {
      var reg= /^[0-9]*$/;
      if(reg.test(this.num) && this.num <= 10000) {
        if(T !== 'ETH') {
          // this.$Loading.start();
          this.spinShow = true;
        }
         var circleCount = Math.floor(parseInt(this.num)/parseInt(this.count));
         theadCus(this.num, this.coin, (res) => {
              console.log(res);
              this.listData = res;
              canvas.show(res.BTC[0].prv);
              this.lastCircle();
          }, (count) => {
            // 用户进度条
             this.percent = Math.floor(count / this.num * 100);
          });
        // if(this.coin === 'BTC') {
        //   // this.getMnemonicBtc(res);
        //    theadCus(this.num, this.coin, (res) => {
        //     //  this.num = ;
        //     // console.log(res.substr(0, 1));
        //     console.log(typeof  res[0]);
        //      if(typeof  res[0] === 'string')
        //         var o = eval("(" + res[0] + ")");
        //       else
        //         var o = res;
              
        //       this.listData = o;
        //       this.lastCircle();
        //   });
        //   // console.log(122);
        //   // this.getMnemonicBtc();
          
        // } else if(this.coin === 'ETH') {
        //   //   ipc.send('getETH', this.coin, 0, this.num);
        //   //   ipc.on('msgETH', (event, arg) => {
        //   //   console.log(arg);
        //   //   this.listData = arg;
        //   //   this.lastCircle();
          
        //   //   // this.getMnemonicBtc(arg);
            
        //   //   // this.num = arg;
        //   // })
        //   if(this.ETHcircleCount === -99) this.ETHcircleCount = this.num;
        //   this.getMnemonicEth(this.ETHcircleCount);
        // }
        
      } else {
        // this.$Notice.error({
        //     title: '只能输入10000以内的正整数(包括10000)',
        //     duration: 2.5
        // });
      }
    
    },
    doLoad() {
      // var mes = '助记词: ' + this.listData.mnemonic + '\r\n';
      var __th0 = '',  __th0W = '';
      if(this.coin === 'BTC') {
        __th0 = '地址';
        __th0W = '300px';
      } else if(this.coin === 'ETH') {
        __th0 = '序号';
        __th0W = '80px';
      }
      var __data = this.listData[this.coin];
      var mes = '<table>';
      mes += '<thead style="border-bottom: 1px solid #ddd">'+
      '<th style="width:'+__th0W+';border: 1px solid #f1f1f3">'+__th0+'</th>'+
      '<th style="width:100px;border: 1px solid #f1f1f3">情况</th>'+
      '<th style="width:600px;border: 1px solid #f1f1f3">值</th>'+
      '</thead>';

      var _addr = this.coin === 'BTC' ? "" : "m/44'/60'/0'/0/";
      
      if(this.coin === 'BTC') {
        mes += '<tr><td style="text-align: center; border: 1px solid #f1f1f3">/</td><td style="border: 1px solid #f1f1f3">助记词</td><td style="border: 1px solid #f1f1f3">'+this.listData.mnemonic +'</td></tr>';
      }
      for(var i in __data) {
        if(this.coin === 'ETH') {
          mes += '<tr><td style="text-align: center; border: 1px solid #f1f1f3"></td><td style="border: 1px solid #f1f1f3">助记词</td><td style="border: 1px solid #f1f1f3">'+__data[i].mnemonic +'</td></tr>';
          mes+='<tr><td rowspan="3" style="text-align: center;border: 1px solid #f1f1f3">'+i+'</td>';
        } else {
          mes+="<tr><td rowspan='3' style='text-align: center;border: 1px solid #f1f1f3'>m/44'/0'/0'/0/"+i+"</td>";
        }
        // console.log('prv', __data[i].prv.length);
        // console.log('address', __data[i].address.length);
        mes+='<td style="border: 1px solid #f1f1f3">地址</td><td style="border: 1px solid #f1f1f3">'+__data[i].address+'</td></tr>';
        mes+='<tr><td style="border: 1px solid #f1f1f3">私钥</td><td style="border: 1px solid #f1f1f3">'+__data[i].prv+'</td></tr>';
        mes+='<tr><td style="border: 1px solid #f1f1f3">公钥</td><td style="border: 1px solid #f1f1f3">'+__data[i].pub+'</td></tr>';
    
      }
      mes+='</table>';
      var blob = new Blob([mes], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}, function() {
        console.log(12);
      });
      
      saveAs(blob, this.fileName + ".xls");
    },
    lastCircle() {
      this.fileName = this.coin;
      // this.$Loading.finish();
      this.spinShow = false;
      this.opShow = true;
      // console.log(this.listData);
    },
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

window.onload = function() {
  canvas.init();
  $("#btn").on('click', function() {
    // theadCus()
    render.generate();
  })
}
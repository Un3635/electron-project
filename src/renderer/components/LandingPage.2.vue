<template>
  <div id="wrapper">
    <h2 class="title">XTOKEN.2</h2>
    <div style="height: 40px">
        <Input v-model="num" height="40px" @on-change="change" @on-enter="sure">
          <Select v-model="coin" slot="prepend" style="width: 80px" >
            <Option v-for="c in allCoin" :key="c.index" :value="c.name">{{c.name}}</Option>
          </Select>
          <!-- <span slot="prepend">{{coin}}</span> -->
          <span slot="append" @click="sure">确定</span>
        </Input>
    </div>
    <div class="content">
      <p v-show="opShow" style="margin-bottom: 10px; font-size: 15px; padding: 0px 25px">点击保存,将生成{{fileName}}文件</p>
      <p v-if="!opShow && !spinShow" >请在输入框中输入您想生成的地址数量</p>
      <!-- <p v-if="spinShow && !opShow" >正则生成，请稍等...</p> -->
      <Button  v-if="!spinShow && opShow" size="large" type="dashed" @click="doLoad" style="display:block; margin:auto">{{loadStr}}</Button>
      <div class="loading" v-show="spinShow && !opShow"> 
        <!--  v-show="spinShow && !opShow" -->
          <!-- <Spin size="large" fix ></Spin> -->
        <Progress style="width: 220px" :percent="percent" status="active" :stroke-width="8"/>
        <p style="font-size: 16px;"> 正在生成，请稍等... </p>
     </div>
     <p class="hint">私钥私密, 确保周围环境的安全</p>
     <!-- <div ref="loading" v-show="spinShow" class="loading">
       生成中
     </div> -->
    </div>
  </div>
</template>
<script>
  // import APIS from '../services/bitcoin-api.js';
  import APIS from '../../api/api.js';
  import saveAs from '../../../static/fileSaver.js';
  import { setTimeout } from 'timers';
import { app } from 'electron';

  export default {
    name: 'landing-page',
    components: {  },
     data () {
      return {
        num: 1,
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
        percent: 0
      }
    },
    watch: {
      coin(nV) {
        this.num = 1;
        this.sure('change');
      }
    },
    computed: {
      color () {
        let color = '#2db7f5';
        if (this.percent == 100) {
          color = '#5cb85c';
        }
        return color;
      }
    },
    methods: {
      change (e) {
        this.opShow = false;
        this.spinShow = false;
        this.percent = 0;
      },
      sure(T) {
        this.listData = [];
        this.listData[this.coin] = [];
        this.ETHcircleCount = -99;
        this.change();
       
        if(T !== 'change')
          this.getMnemonic();
      },
      getMnemonicEth(res) {
        // this.listD
        this.listData[this.coin].push(res);
       
        // this.listData[this.coin] = [];
        this.getAddress(0, 1, () => {
          this.ETHcircleCount--;
          if(this.ETHcircleCount>0) {
            this.getMnemonic(this.coin, this.ETHcircleCount);
          } else {
            this.lastCircle();
          }
        });
      },
      getMnemonicBtc(res) {

        this.listData = res;
        this.listData[this.coin] = [];
        // this.listData.push(res.data.result);
        this.generate();
      },
      getMnemonic(T, count) {
        var reg= /^[0-9]*$/;
        if(reg.test(this.num) && this.num <= 10000) {
          if(T !== 'ETH') {
            this.$Loading.start();
            this.spinShow = true;
          }
          // APIS.getMnemonic(this.coin).then(
          //   (res) => {
          //     if(this.coin === 'BTC') {
          //       this.getMnemonicBtc(res);
          //     } else if(this.coin === 'ETH') {
          //       if(this.ETHcircleCount === -99) this.ETHcircleCount = this.num;
          //       this.getMnemonicEth(res, this.ETHcircleCount);
          //     }
            
          //   }
          // )
          var res = APIS.getMnemonic(this.coin);
          // console.log(res);
          if(this.coin === 'BTC') {
            this.getMnemonicBtc(res);
          } else if(this.coin === 'ETH') {
            if(this.ETHcircleCount === -99) this.ETHcircleCount = this.num;
            this.getMnemonicEth(res, this.ETHcircleCount);
          }
          
        } else {
          this.$Notice.error({
              title: '只能输入10000以内的正整数(包括10000)',
              duration: 2.5
          });
        }
       
      },
      generate() {
        var w;
        var that = this;
        // console.log(this.spinShow, this.opShow);
        // if(typeof(Worker) !== 'undefined') {
        //     w=new Worker('/static/start.js');
        //     var that = this;
        //     w.onmessage = function (event) {
        //         // document.getElementById("result").innerHTML=event.data;
        //         var res = JSON.parse(event.data);
        //         // console.log(res)
        //         that.fileName = that.coin+'-'+that.createDate();
        //         that.listData = res.data.result;
        //         that.$Loading.finish();
        //         that.spinShow = false;
        //         w.terminate();
        //         that.opShow = true;
        //         // setTimeout(() => {
                  
        //         // }, 50)
        //       };
        //     }
        var circleCount = Math.floor(parseInt(this.num)/parseInt(this.count));
        var lastCount = this.num%this.count;
        var total = circleCount;

        var startCount = 0, endCount = 0;
        
        var jude = function(){
          if(circleCount > 0) {
              startCount = (total - circleCount) * that.count;
              endCount = (total - circleCount + 1) * that.count;
              that.getAddress(startCount, endCount, function(){
                if(circleCount > 0) circleCount--;
                jude();
              });
              
          } else if(lastCount !==0) {
            
              that.getAddress(endCount, endCount + lastCount, function() {
                circleCount = 0;
                lastCount = 0;
                jude();
              });
              
          } else {
            that.lastCircle();
          }
            
        }

        this.$nextTick(() => {
          jude();
        })
        
      },
      getAddress(sc, ec, cb) {
        //  APIS.generate(this.coin, sc, ec).then(
        //   (res) => {
            
        //     if( this.coin === 'BTC') {
        //       this.listData[this.coin] = this.listData[this.coin].concat(res.data.result[this.coin]);
        //     } else {
        //       var arr = this.listData[this.coin][this.listData[this.coin].length-1];
        //       this.listData[this.coin][this.listData[this.coin].length-1] = Object.assign(arr, res.data.result[this.coin][0])
        //     }
        //     this.percent = Math.floor(this.listData[this.coin].length / this.num * 100);
           
        //   }
        // ).then(() => {
        //   cb && cb();
        // })
        var res = APIS.generate(this.coin, sc, ec);
        // console.log(res);
        if( this.coin === 'BTC') {
          this.listData[this.coin] = this.listData[this.coin].concat(res[this.coin]);
        } else {
          var arr = this.listData[this.coin][this.listData[this.coin].length-1];
          this.listData[this.coin][this.listData[this.coin].length-1] = Object.assign(arr, res[this.coin][0])
        }
        this.percent = Math.floor(this.listData[this.coin].length / this.num * 100);
        // console.log(this.percent)
        cb && cb();
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
        this.$Loading.finish();
        this.spinShow = false;
        this.opShow = true;
        // console.log(this.listData);
      },
      createDate() {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate(),
            s = now.getSeconds();

        return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + "/" + now.toTimeString().substr(0, 8); 
      }
    },
    created(){
      // console.log(window)
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
 
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 20px 80px;
    width: 100vw;
  }
  .title {
    display: block;
    text-align: center;
    margin: 20px auto;
    font-size: 30px;
    letter-spacing: 2px;
  }
  .loading{
    	display: inline-block;
      width: 100%;
      height: 180px;
      position: relative;
      // margin-top: -40px;
      // padding: 0px 15px;
      text-align: center;
      & > p {
        text-align: center;
        font-size: 18px;
        color: #ccc;
        padding-top: 21px;
      }
    }
  .content {
    position: relative;
    width: 100%;
    height: 200px;
    border: 1px dotted #eee;
    background: #fff;
    padding: 40px 0px;
    & > p {
      text-align: center;
      color: #ccc;
      font-size: 15px;
      &.hint {
        position: absolute;
        color: #e06161;
        margin-top: 35px;
        font-size: 13px;
        bottom: 5px;
        margin-left: 18px;

      }
    }
  }
  .btnCus {
    display: block;
    margin: auto;
  }
  
</style>

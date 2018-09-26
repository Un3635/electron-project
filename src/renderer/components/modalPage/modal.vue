<template>
  <div v-if="showModal">
   <Modal 
    v-model="modal" 
    width="450" 
    :mask-closable="false"
    :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>{{coin}}</span>
      </p>
      <div style="text-align:center">
        <Form :model="formItem" :label-width="80">
          <FormItem label="random mnemonic">
              <Select v-model="formItem.select">
                  <Option value="beijing">12words</Option>
                  <Option value="shanghai">24words</Option>
              </Select>
          </FormItem>
          <FormItem label="助记词">
            <Input v-model="formItem.mnemonic"  disabled >
              <Icon type="ios-copy-outline"  slot="suffix" @click="doCopy(formItem.mnemonic)"/>
              <Icon type="md-arrow-down"  slot="suffix" @click="doLoad(formItem.mnemonic, '助记词')"/>
            </Input>
          </FormItem>
          <FormItem label="Address">
            <Input v-model="formItem.address" :autosize="{minRows: 2,maxRows: 5}" disabled>
              <Icon type="ios-copy-outline"  slot="suffix" @click="doCopy(formItem.address)"/>
              <Icon type="md-arrow-down"  slot="suffix" @click="doLoad(formItem.address, '地址')"/>
            </Input>
          </FormItem>
          <FormItem label="Private Key">
            <Input v-model="formItem.prv" :autosize="{minRows: 2,maxRows: 5}" disabled>
              <Icon type="ios-copy-outline"  slot="suffix" @click="doCopy(formItem.prv)"/>
              <Icon type="md-arrow-down"  slot="suffix" @click="doLoad(formItem.prv, '私钥')"/>
            </Input>
          </FormItem>
          <FormItem label="Public Key">
            <Input v-model="formItem.pub" :autosize="{minRows: 2,maxRows: 5}" disabled>
              <Icon type="ios-copy-outline"  slot="suffix" @click="doCopy(formItem.pub)"/>
              <Icon type="md-arrow-down"  slot="suffix" @click="doLoad(formItem.pub, '公钥')"/>
            </Input>
          </FormItem>
        
      </Form>
      </div>
      <div slot="footer">
          <Button type="primary" size="large" :loading="modal_loading" @click="ok">确定</Button>
          <Button size="large" icon="ios-download-outline" type="primary" @click="doLoadAll">Download</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import toolTip from '../promptPage/tip'
import saveAs from '../../../../static/fileSaver.js';

export default {
  props: {
    showModal: {
      default: false,
      type: Boolean
    },
    coinData: {
      default: []
    },
    coin: {
      default: ''
    }
  },
  data () {
    return {
      modal_loading: false,
      modal: false,
      showTip: false,
      formItem: {
        mnemonic: '',
        address: '',
        prv: '',
        pub: ''
      }
    }
  },
  watch: {
    showModal(nParam, oParam) {
      this.modal = nParam;
      this.formItem.mnemonic = this.coinData.mnemonic;
      this.formItem.address = this.coinData.BTC.address;
      this.formItem.prv = this.coinData.BTC.prv;
      this.formItem.pub = this.coinData.BTC.pub;
      
    }
  },
  methods: {
    ok() {

      this.$emit('hideModal', false, 'success');
      this.modal = false;
    },
    doCopy(mes) {
      this.$copyText(mes).then(
        () => {
          this.$Message.success('复制成功');
        },
        () => {
           alert('Can not copy');
           console.log(mes)
        }
      )
    },
    doLoad(mes, title) {
      var blob = new Blob([mes], {type: "text/plain;charset=utf-8"});
      saveAs(blob, title + ".txt");
    },
    doLoadAll() {
      // 将整个表单下载下来
      var mes = '助记词: ' + this.formItem.mnemonic + '\n地址:' + this.formItem.address;
      mes += '私钥:' + this.formItem.prv + '公钥:' + this.formItem.pub;
      // mes = encodeURIComponent(mes);
      var blob = new Blob([mes], {type: "text/plain;charset=utf-8"});
      saveAs(blob, this.coin + ".txt");
      this.$emit('hideModal', false);
    }
  },
  components: {
    toolTip
  }
}
</script>
<style lang="scss" scoped>

.ivu-input[disabled], fieldset[disabled] .ivu-input{
  color: #515a6e;
}
</style>

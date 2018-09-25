<template>
  <div v-if="showModal">
   <Modal v-model="modal" width="360" :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>BTC</span>
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
                <Input v-model="formItem.mnemonic" placeholder="BTC 助记词"></Input>
            </FormItem>
            <FormItem label="Address">
                <Input v-model="formItem.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="Private Key">
                <Input v-model="formItem.prv" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="Public Key">
                <Input v-model="formItem.pub" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
          
        </Form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long :loading="modal_loading" @click="ok">确定</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    showModal: {
      default: false,
      type: Boolean
    },
    coinData: {
      default: []
    }
  },
  data () {
    return {
      modal_loading: false,
      modal: false,
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
      this.$emit('hideModal', false);
      this.modal = false;
    }
  }
}
</script>

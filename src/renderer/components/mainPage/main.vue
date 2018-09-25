<template>
  <div class="main-wrap">
    <button @click.stop="createBTCAddress()" class="btn">创建BTC钱包</button>
     <button @click.stop="createBTCAddress()" class="btn">创建ETH钱包</button>
     <!-- <button @click.stop="createBTCAddress()" class="btn">创建ETH钱包</button> -->
    <modalCoin :showModal="showModal" @hideModal="hideModal" :coinData="coinData"/>
  </div>
</template>
<script>
import APIS from '../../services/bitcoin-api.js'
import modalCoin from '../modalPage/modal'
export default {
  data() {
    return {
      showModal: false,
      coinData: []
    }
  },
  methods: {
    createBTCAddress() {
      APIS.getMnemonic().then((res) => {
        this.showModal = true;
        this.coinData = res.data.result
      })
    },
    hideModal(msg) {
      this.showModal = msg;
    }
  },
  components: {
    modalCoin
  }
}
</script>
<style lang="scss" scoped>
.main-wrap {
  // position: absolute;
  // left: 0px;
  // top: 0px;
  // width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0,0,0,0.5);
}
.btn {
    margin-top: 100px;
    margin-left: 100px;
    width: 100px;
    height: 40px;
    border: 0px;
    border-radius: 6px;
    background: goldenrod;
    color: #fff;
}
.btn:hover {
  opacity: 0.7;
}
</style>

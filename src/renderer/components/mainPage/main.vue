<template>
  <div class="main-wrap">
    <div class="main-wallet">
      <wallet :coinData="coinData"/>
    </div>
    <div class="main-op">
      <button @click.stop="createBTCAddress('BTC')" class="btn">创建BTC钱包</button>
      <button @click.stop="createBTCAddress('ETH')" class="btn">创建ETH钱包</button>
    </div>
     <!-- <button @click.stop="createBTCAddress()" class="btn">创建ETH钱包</button> -->
    <modalCoin :showModal="showModal" :coin="coin" @hideModal="hideModal" :coinData="coinData"/>
  </div>
</template>
<script>
import APIS from '../../services/bitcoin-api.js'
import modalCoin from '../modalPage/modal'
import wallet from '../mainPage/wallet'

export default {
  data() {
    return {
      showModal: false,
      coinData: [],
      coin: ''
    }
  },
  methods: {
    createBTCAddress(coin) {
      APIS.getMnemonic().then((res) => {
        this.showModal = true;
        this.coinData = res.data.result;
        this.coin = coin;
      })
    },
    hideModal(tag, msg) {
      this.showModal = tag;
      
      console.log(msg);
    }
  },
  components: {
    modalCoin,
    wallet
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
.main-op {
  position: absolute;
  bottom: 20px;
}
</style>

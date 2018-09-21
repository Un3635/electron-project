<template>
  <div id="main-wrap">
    <button @click="createBTCAddress()">创建BTC地址</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    createBTCAddress() {
      this.$http('/getAddress').then((res) => {
        console.log(res)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.main-wrap {
  position: absolute;
  z-index: 999;
}
</style>

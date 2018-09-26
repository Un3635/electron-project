<template>
  <div class="wallet-detail-wrap">
    <Icon type="ios-arrow-back back" @click="back"/>
    <div>
      <Form :model="formTop" label-position="top">
          <FormItem label="私钥">
              <Input v-model="formTop.address"></Input>
          </FormItem>
          <!-- <FormItem label="Title name">
              <Input v-model="formTop.input2"></Input>
          </FormItem>
          <FormItem label="Aligned title">
              <Input v-model="formTop.input3"></Input>
          </FormItem> -->
    </Form> 
    <div class="wallet-detail-op">
      <Button shape="circle" type="primary">获取余额</Button>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
        formTop: {
          address: this.$route.query.address
        }
    }
  },
  methods: {
    back() {
      this.$router.replace('/');
      this.$store.commit('showMain', true);
    }
  },
  created() {
    console.log(this.$route);
  }
}
</script>
<style lang="scss" scoped>
.wallet-detail-wrap {
    position: absolute;
    z-index: 90;
    background: #ffffff;
    width: 300px;
    height: 300px;
    margin: auto;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
  & > div {
    margin: 20px;
  }
  .back {
    font-size: 20px;
    margin: 5px 0px 0px 5px;
  }
  .wallet-detail-op {
    margin-top: 20px;
  }
}
</style>


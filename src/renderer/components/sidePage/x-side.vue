<template>
  <transition name="sideTran">
    <div class="side-wrap" v-if="showTag">
      <div class="list-group">
        <a class="list-group-item" href="#"><i class="fa fa-user-o fa-fw logo"></i>&nbsp; 个人中心</a>
        <a class="list-group-item" href="#"><i class="fa fa-bell fa-fw logo"></i>&nbsp; 消息</a>
        <a class="list-group-item" href="#"><i class="fa fa-cog fa-fw logo"></i>&nbsp; Settings</a>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    showTag: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // console.log('addddas');
  }
})
</script>
<style lang="scss" scoped>
  .side-wrap {
    position: absolute;
    right: 0px;
    top: 40px;
    width: 79px;
    height: 100vh;
    // background: rgba(0,0,0,.5);
    color: #ffffff;
    font-size: 13px;
    z-index: 9;
    .logo {
      margin-right: -5px
    }
    .list-group-item {
      display: block;
      color: #ffffff;
      text-decoration: none;
      padding: 5px;

      // text-align: center;
     
    }
   
  }
  .sideTran-enter-active, .sideTran-leave-active {
    right: 0px;
    transition: all .5s linear;
  }
  .sideTran-enter, .sideTran-leave-to {
     right: -100px;
  }
</style>


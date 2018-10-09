<template>
  <div class="x-header-wrap">
    <div class="x-header-con">
      <Icon type="ios-remove" class="iconCus" @click="windowFn().minimize()"/>
      <!-- <Icon type="ios-expand" class="iconCus" @click="windowFn().maximize()"/> -->
      <Icon type="ios-power-outline" class="iconCus" @click="windowFn().closed()"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ipcRenderer from 'electron';

export default Vue.extend({
  data() {
    return {
      showTag: false,
      showSidelt: false
    }
  },
  methods: {
    windowFn: () => {
      var ipc = ipcRenderer.ipcRenderer;
      return {
        minimize(){
          ipc.send('window-min'); 
        },
        maximize() {
          ipc.send('window-max');
        },
        closed() {
          ipc.send('window-closed');
        }
      }
    }
  }
})
</script>

</script>

<style scoped lang="scss">
.x-header-wrap {
  position: absolute;
  // width: 100%;
  width: 100px;
  height: 40px;
  z-index: 99;
  -webkit-app-region: no-drag;
  // background: rgba(0,0,0,0.2);
  right: 0px;
  opacity: 0.7;
  .header-title {
    color: #000;
    font-size: 15px;
    line-height: 40px;
    margin-left: 10px;
  }
  .more {
    margin: 5px;
    font-size: 30px;
    color: #ffffff;
    float: left;
  }
  .x-header-con {
    position: absolute;
    right: 10px;
    & > .iconCus {
      color: #000;
      font-size: 18px;
      &:first-child {
        font-size: 30px;
        margin-right: -4px;
      }
    }
  }
  
}

</style>


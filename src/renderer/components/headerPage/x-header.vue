<template>
  <div class="x-header-wrap">
    <div class="x-header-con">
     <i class="fa fa-window-minimize" @click="windowFn().minimize()"></i>
     <i class="fa fa-window-maximize" @click="windowFn().maximize()"></i>
     <i class="fa fa-cog" @click="showTag = !showTag"></i>
     <!-- <i class="fa fa-cog" @click="windowFn().setting()"></i> -->
    </div>
    <!-- <x-side></x-side> -->
    <x-side :showTag="showTag"></x-side>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ipcRenderer from 'electron';

import XSide from '../sidePage/x-side.vue';


export default Vue.extend({
  data() {
    return {
      showTag: false,
      show: false
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
        setting() {
          console.log('123');
          // this.showTag = !this.showTag;
          // this.show = !this.show;
          // console.log(this.show);
        }
      }
    }
  },
  components: { XSide }
})
</script>

</script>

<style scoped lang="scss">
.x-header-wrap {
  position: absolute;
  width: 100%;
  height: 40px;
  z-index: 99;
  // background: rgba(0,0,0,1);
  .x-header-con {
    position: relative;
    float: right;
    margin-right: 10px;
    & > i {
      margin-left: 5px;
      line-height: 40px;
      font-size: 12px;
      color: #ffffff;
      &:first-child {
        position: absolute;
        top: -3px;
        left: -23px;
      }
    }
  }
  
}

</style>


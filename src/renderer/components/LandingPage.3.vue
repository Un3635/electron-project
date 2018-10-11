<template>
  <div id="wrapper">
    12333
  </div>
</template>
<script>
  // import theadCus from '../../api/index.js';
  // import APIS from '../../api/api.js';
// import ipcRenderer from 'electron';
//   import saveAs from '../../../static/fileSaver.js';
// import func from './vue-temp/vue-editor-bridge.js';
//  var ipc = ipcRenderer.ipcRenderer;
  export default {
    name: 'landing-page',
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

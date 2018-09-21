<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="main-wrap">
        <x-main></x-main>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import XMain from './mainPage/main'
  export default {
    name: 'landing-page',
    components: { SystemInformation, XMain},
    data() {
      return {
        skinsArr: ['skin0', 'skin1'],
        skins: 'skin0'
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import url('../assets/scss/skin/skin0.scss');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    height: 100vh;
    /* padding: 60px 80px; */
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  
</style>

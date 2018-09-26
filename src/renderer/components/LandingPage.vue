<template>
  <div id="wrapper" @click="showFn">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <transition name="mainTran">
      <main v-show="showMain" class="main-box">
        <x-main></x-main>
      </main>
    </transition>
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
        skins: 'skin0',
        showT: false
      }
    },
    computed: {
      showMain() {
        this.showT = this.$store.state.Counter.showMain
        return this.showT;
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      showFn() {
         this.$store.commit('showMain', this.showT);
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
  .main-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
  }
  .mainTran-enter-active, .mainTran-leave-active {
    /* opacity: 1; */
    top: 0px;
    transition: all .5s linear;  
  }
  .mainTran-enter, .mainTran-leave-to {
    /* opacity: 0; */
    top: -1000px;
  }
  
</style>

<template>
  <!-- <div id="container">
   <div id="leafContainer">
     
   </div>
   
  </div> -->
  <div id="app">
      <x-header></x-header>
      <router-view></router-view>
   </div>
</template>

<script>
  import XHeader from './components/headerPage/x-header';

  export default {
    name: 'electron-project',
    components: {
     XHeader
    }
  }
</script>

<style>
#app {
  position: absolute;
  z-index: 9;
}
  /* CSS */
</style>

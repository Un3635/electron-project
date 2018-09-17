<template>
  <div id="app">
    <x-header></x-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import XHeader from './components/headerPage/x-header'

  export default {
    name: 'electron-project',
    components: {
     XHeader 
    }
  }
</script>

<style>
  /* CSS */
</style>

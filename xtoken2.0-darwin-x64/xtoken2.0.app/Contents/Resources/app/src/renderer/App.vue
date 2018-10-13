<template>
  <div id="app">
     <x-header></x-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import XHeader from './components/headerPage/x-header';
  export default {
    name: 'bitcoin',
    components: {
     XHeader
    }
  }
</script>

<style>
  /* CSS */
  table {
    width: 300px;
  }
  tr, td {
    border-bottom: 1px solid #dcdee2;
  }
</style>

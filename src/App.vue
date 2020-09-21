<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  import Navbar from '@/components/Navbar'
  export default {
    components: {
      Navbar
    }
  
  }
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>

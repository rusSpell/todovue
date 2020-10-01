<template>
  <div id="app">
    <Navbar />
    <div class="container px-5">
      <router-view />
    </div>
  </div>
</template>


<script>
  import Navbar from '@/components/Navbar'
  export default {
    components: {
      Navbar
    }
  
  }
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";
@import "~vue2-datepicker/index.css";

</style>

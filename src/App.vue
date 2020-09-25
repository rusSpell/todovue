<template>
  <div id="app">
    <Navbar />
    <div class="container px-3">
      <router-view />
    </div>
    <Footer />
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

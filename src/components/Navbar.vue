<template>
  <div>
    <nav class="cyan darken-1">
      <div class="nav-wrapper">
        <router-link to="/">
          <a href="#" class="brand-logo">TODO-List</a>
        </router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link tag="li" to="/" exact active-class="active">
            <a class="nav-link active text-white" href="#" v-if="isLoggedIn">Создать</a>
          </router-link>
          <router-link tag="li" to="/list" active-class="active">
            <a class="nav-link text-white" href="#" v-if="isLoggedIn">Список локальных задач</a>
          </router-link>
          <router-link tag="li" to="/articles" active-class="active">
            <a class="nav-link text-white" href="#" v-if="isLoggedIn">Работа с API</a>
          </router-link>
          <router-link tag="li" to="/login" active-class="active">
            <a class="nav-link text-white" href="#" v-if="!isLoggedIn">Вход</a>
          </router-link>
          <li>
            <a class="nav-link text-white"  v-if="isLoggedIn" @click="logout">Выход</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      console.log('isLoggedIn', this.$store.getters.isLoggedIn);
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 5rem;
}
</style>
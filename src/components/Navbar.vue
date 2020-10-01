<template>
  <div>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <p class="title has-text-light">TODO List</p>
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          :class="{ 'is-active': active }"
          @click="activated"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"

        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <transition name="fade">
      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': active }">
        <div class="navbar-start">
          <router-link tag="a" to="/" exact class="navbar-item">Список локальных задач</router-link>
          <router-link tag="a" to="/create" class="navbar-item">Создать локальную задачу</router-link>

          <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
            <a class="navbar-link">Работа с API</a>

            <div class="navbar-dropdown">
              <router-link tag="a" to="/api/list" class="navbar-item">Список задач</router-link>
              <router-link tag="a" to="/api/create" class="navbar-item">Создать задачу</router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link tag="a" to="/registration" class="button is-primary" v-if="!isLoggedIn">
                Регистрация
              </router-link>
              <router-link tag="a" to="/login" class="button is-link" v-if="!isLoggedIn">Вход</router-link>
               <a class="button is-link" v-if="isLoggedIn" @click="logout">Выход</a>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    },
    activated() {
      this.active = !this.active
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
}
.navbar-menu.is-active {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
}


</style>
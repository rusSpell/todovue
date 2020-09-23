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
              <router-link tag="a" to="/articles" class="navbar-item">Список задач</router-link>
              <router-link tag="a" to="/articles" class="navbar-item">Создать задачу</router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" v-if="!isLoggedIn">
                <strong>Регистрация</strong>
              </a>
              <router-link tag="a" to="/login" class="button is-link" v-if="!isLoggedIn">Вход</router-link>
               <a class="button is-link" v-if="isLoggedIn" @click="logout">Выход</a>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </nav>
    <!--     <nav class="cyan darken-1">
      <div class="nav-wrapper">
        <router-link to="/">
          <a href="#" class="brand-logo">TODO-List</a>
        </router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link tag="li" to="/" exact active-class="active">
            <a class="nav-link active text-white" href="#" >Создать</a>
          </router-link>
          <router-link tag="li" to="/list" active-class="active">
            <a class="nav-link text-white" href="#" >Список локальных задач</a>
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

      <router-link tag="a" to="/" class="btn-floating btn-large waves-effect waves-light cyan darken-1 btn-create__pos">
        <i class="material-icons">add</i>
      </router-link>

    </nav>-->
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
      console.log('isLoggedIn', this.$store.getters.isLoggedIn);
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout() {
      console.log('xxxx');
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
  padding: 0 5rem;
}
.btn-create__pos {
  position: absolute;
  bottom: 50px;
  right: 50px;
}
</style>
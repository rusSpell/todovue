<template>
  <div>
    <h1 class="title mt-4">Авторизация</h1>
    <form @submit.prevent="login">
      <div class="row">
        <div class="input-field col s4 offset-s4">
          <input id="username" v-model="username" type="text">
          <label for="username">Введите логин</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s4 offset-s4">
          <input id="password" v-model="password" type="password">
          <label for="password">Введите пароль</label>
        </div>
      </div>
      <div class="row">
        <button class="btn col s2 offset-s5" type="submit">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let username = this.username 
      let password = this.password
      this.$store.dispatch('login', { username, password })
      .then(() => this.$router.push('/articles'))
      .catch(err => console.log(err))
    }
  }
}
</script>
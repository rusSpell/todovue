<template>
  <div>
    <h1 class="title mt-4">Авторизация</h1>
    <div class="columns dflex mt-4">
    <form @submit.prevent="login">
      
  
        <div class="input-field">
          <input id="username" v-model="username" type="text" class="input">
          <label for="username">Введите логин</label>
        </div>


        <div class="input-field">
          <input id="password" v-model="password" type="password" class="input">
          <label for="password">Введите пароль</label>
        </div>

 
        <button class="button is-link mt-4" type="submit">Войти</button>

    </form>
    </div>
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
      .then(() => this.$router.push('/api/list'))
      .catch(err => console.log(err))
    }
  }
}
</script>
<style lang="scss" scoped>
  .dflex{
    display: flex;
    justify-content: center;
  }
</style>
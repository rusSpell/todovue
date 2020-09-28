<template>
  <div>
    <h1 class="title mt-4">Регистрация</h1>
    <div class="columns dflex mt-4">
    <form @submit.prevent="registration" class="px-2">
      
        <div class="notification" v-if="errored" >
          Пароль должен содержать не менее 8 символов
        </div>
        <div class="notification" v-if="userExists" >
          Пользователь с таким именем уже есть!
        </div>

        <div class="input-field">
          <input id="username" v-model="username" type="text" class="input">
          <label for="username">Придумайте логин</label>
        </div>


        <div class="input-field">
          <input id="password" v-model="password" type="password" class="input">
          <label for="password">Придумайте пароль</label>
        </div>

         <div class="notification my-4" v-if="success" >
          Аккаунт успешно создан!
        </div>

        <button class="button is-link mt-4" type="submit">Зарегистрироваться</button>

    </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "registration",
  data() {
    return {
      username: '',
      password: '',
      errored: false,
      success: false,
      userExists: false
    }
  },
  methods: {
    registration() {
        
        this.$axios
        .post("http://192.168.133.51:8000/api/registration/", {
            username: this.username,
            password: this.password,
        })
        .then((response) => {
            this.success = true;
            this.userExists = username;
            console.log(username, 'userExists');
            setTimeout(this.$router.push("/login"), 3000)
        })
        .catch((error) => {
            console.log(error, 'error');
            
            this.userExists = username;
            

        })
        
    },
  }
}
</script>
<style lang="scss" scoped>
  .dflex{
    display: flex;
    justify-content: center;
  }
</style>
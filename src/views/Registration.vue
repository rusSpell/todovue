<template>
  <div>
    <h1 class="title mt-4">Регистрация</h1>
    <div class="columns dflex mt-4">
    <form @submit.prevent="registration" class="px-2">
      
<!--         <div class="notification" v-if="errored" >
          Пароль должен содержать не менее 8 символов
        </div> -->
        <div class="notification" v-if="userExists" >
          Пользователь с таким именем уже есть!
        </div>
        <div class="notification" v-if="userLong" >
          Слишком длинное имя пользователя!
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
      userExists: false,
      userLong: false
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
          setTimeout(this.$router.push("/login"), 3000)
        })
        .catch((error) => {
          console.log(error.response.data, 'check');
          if (error.response.data.username == 'Ensure this field has no more than 150 characters.') this.userLong = true; 
          if (error.response.data.username == 'A user with that username already exists.') this.userExists = true; 
          console.log(this.userLong, 'userlong');
          console.log(this.userExists, 'userexist');
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
<template>
  <div>
    <h1 class="title mt-4">Авторизация</h1>
    <div class="columns dflex mt-4">
      <form @submit.prevent="login" class="form px-2">
        <Notification :errored="this.errored" :textError="this.textError"/>

        <div class="field">
          <div class="control">
            <input
              v-model="username"
              class="input"
              type="text"
              placeholder="Введите логин"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input
              v-model="password"
              class="input"
              type="password"
              placeholder="Введите пароль"
            />
          </div>
        </div>

        <button class="button is-link mt-4" type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
export default {
  name: "login",

  data() {
    return {
      username: "",
      password: "",
      errored: false,
      textError: "",
    };
  },
  components: {
    Notification,
  },
  methods: {
    login: function () {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/api/list"))
        .catch((error) => {
          this.errored = true;
          this.textError = "Вы ввели неверный логин или пароль";
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.dflex {
  display: flex;
  justify-content: center;
}
.form {
  max-width: 315px;
  width: 100%;
}
</style>
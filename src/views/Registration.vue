<template>
  <div>
    <h1 class="title mt-4">Регистрация</h1>
    <div class="columns dflex mt-4">
      <form @submit.prevent="registration" class="form px-2">
        <Notification :errored="this.errored" :textError="this.textError" />

        <div class="field">
          <div class="control">
            <input
              v-model="username"
              class="input"
              type="text"
              placeholder="Придумайте логин"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input
              v-model="password"
              class="input"
              type="password"
              placeholder="Придумайте пароль"
            />
          </div>
        </div>


        <Notification :success="this.success" :textSuccess="this.textSuccess" />

        <button class="button is-link mt-4" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
export default {
  name: "registration",
  data() {
    return {
      username: "",
      password: "",
      errored: false,
      success: false,
      userExists: false,
      textError: "",
      textSuccess: ""
    };
  },
  components: {
    Notification,
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
          this.textSuccess = "Аккаунт успешно создан!"
          setTimeout(() => this.$router.push("/login"), 1500);
        })
        .catch((error) => {
          console.log(error.response.data, "check");
          if (
            error.response.data.username ==
            "Ensure this field has no more than 30 characters."
          ) {
            this.errored = true;
            this.textError = "Логин не должен превышать 30 символов.";
          }
          if (
            error.response.data.username ==
            "A user with that username already exists."
          ) {
            this.errored = true;
            this.textError = "Этот логин уже занят!";
          }
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
<template>
  
    <div>
      <h1>Создание новой задачи</h1>

      <form @submit.prevent="submitHandler" v-if="isLoggedIn">
        <div class="row">
        <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required />
          <label for="title">Имя задачи</label>
          <span class="helper-text" data-error="Обязательное поле" data-success></span>
        </div>        
        </div>
        <div class="row">
        <div class="chips" ref="chips"></div>
                </div>
        <div class="row">
          <div class="input-field">
            <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
            <label for="description">Текст задачи</label>
            <span
              class="character-counter"
              style="float: right; font-size: 12px;"
            >{{ description.length }}/2048</span>
          </div>
          </div>
        <div class="row">
          <input class="col s3" type="text" ref="datepicker" />
        </div>
                <div class="row">
        <button class="btn" type="submit">Создать задачу</button>
                </div>
      </form>
      <div class="" v-else> <h2>Вы не авторизованы</h2> </div>
    </div>

</template>

<style lang="scss" scoped>
.input-field {
  margin: 3rem 0 1rem;
}
.btn {
  margin: 2rem 0;
}
</style>

<script>
export default {
  name: "create",
  data: () => ({
    description: "",
    title: "",
    chips: null,
    date: null,
  }),
  mounted() {
    let chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Теги задачи",
    });

    this.chips = chips;

    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: "В работе",
        tags: this.chips.chipsData,
        date: this.date.date,
      };
      this.$store.dispatch('createTask', task)
      this.$router.push("/list");
    },
        isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  },
};
</script>

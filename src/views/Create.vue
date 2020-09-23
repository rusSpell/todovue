<template>
  <div>
    <h1 class="title mt-4">Создание новой задачи</h1>
    <div class="columns">
    <form @submit.prevent="submitHandler" class="column is-four-fifths">
      
      <div class="input-field">
        <input id="title" v-model="title" type="text" class="input" required />
        <label for="title">Имя задачи</label>
        <span class="helper-text" data-error="Обязательное поле" data-success></span>
      </div>

      <div class="input-field">
        <textarea id="description" class="textarea" v-model="description"></textarea>
        <label for="description">Текст задачи</label>
        <span
          class="character-counter"
          style="float: right; font-size: 12px;"
        >{{ description.length }}/2048</span>
      </div>

      <date-picker v-model="date" value-type="format" format="YYYY-MM-DD"></date-picker>

      <div>
        <button class="button is-link mt-4" type="submit">Создать задачу</button>
      </div>

    </form>
    </div>

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
import DatePicker from "vue2-datepicker";
export default {
  name: "Create",
  components: {
    DatePicker,
  },
  data: () => ({
    description: "",
    title: "",
    chips: null,
    date: null,
  }),
  mounted() {},
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
      this.$store.dispatch("createTask", task);
      this.$router.push("/list");
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
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

<template>
  <div>
    <div v-if="task">
      <h1>{{ task.title }}</h1>
      <form @submit.prevent="submitHandler">
        <!--         <div class="row">
          <div class="input-field">
            <input id="title" v-model="title" type="text" class="validate" required />
            <label for="title">Имя задачи</label>
            <span class="helper-text" data-error="Обязательное поле" data-success></span>
          </div>
        </div>-->
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
        <div class="row" v-if="task.status !=='Выполнено'">
          <button class="btn" type="submit">Изменить</button>
          <button class="btn blue" type="button" @click="completeTask">Завершить</button>
        </div>
      </form>
    </div>
    <div v-else>
      <h1>Задача не найдена</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  data: () => ({
    description: "",
    chips: null,
    date: null,
  }),
  computed: {
    task() {
      // console.log(typeof this.$route.params.id);
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },

  mounted() {
    this.description = this.task.description;
    let chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Теги задачи",
      data: this.task.tags,
    });

    this.chips = chips;

    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    submitHandler() {
      this.$store.dispatch("updateTask", {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
      });
      this.$router.push("/list");
    },
    completeTask() {
      this.$store.dispatch("completeTask", this.task.id);
      this.$router.push("/list");
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


<style lang="scss" scoped>
.input-field {
  margin: 3rem 0 1rem;
}
.btn {
  margin: 2rem 2rem 2rem 0rem;
}
.materialize-textarea {
  min-height: 150px;
}
</style>
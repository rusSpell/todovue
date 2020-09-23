<template>
  <div>
    <h1 class="title mt-4">API Павла, userid="{{ this.user }}"</h1>
    <hr />
    <div v-if="errored">
      <p>Павел сломал API</p>
    </div>
    <div v-else>
      <p v-if="loading">Загружается</p>
      <div style="overflow: auto;">
        <table v-if="this.tasks.length" class="table is-bordered is-narrow is-hoverable">
          <thead>
            <tr>
              <th>#</th>
              <th>Имя задачи</th>
              <th>Дата</th>
              <th>Текст задачи</th>
              <!--  <th>Статус</th> -->
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, idx) of tasks" :key="task.id">
              <td>{{ idx+1 }}</td>
              <td>{{ task.task_title }}</td>
              <td>{{ new Date(task.task_date).toLocaleDateString() }}</td>
              <td class="text_width">
                <div class="text">{{ task.description }}</div>
              </td>
              <!--  <td>{{ task.status }}</td> -->
              <td>
                <router-link
                  tag="button"
                  class="button is-link is-small"
                  :to="'/task/' + task.id"
                >Открыть</router-link>
              </td>
            </tr>
          </tbody>
        </table><p v-else>Задачи отсутствуют</p>
      </div>
      
    </div>
    <hr />
    <h5>Формочка</h5>
    <div class="columns">
      <form @submit.prevent="submitForm" class="column is-four-fifths">
        <div class="input-field">
          <input id="task_title" v-model="task_title" type="text" class="input" />
          <label for="task_title">Заголовок</label>
        </div>

        <div class="input-field">
          <textarea id="description" v-model="description" type="textarea" class="textarea" />
          <label for="description">Описалово</label>
        </div>

        <date-picker v-model="task_date" value-type="format" type="datetime" placeholder="Время исполнения до:"></date-picker>

        <div>
          <button class="button is-link mt-4" type="submit">Создать задачу</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import "dateformat/lib/dateformat.js";
import DatePicker from "vue2-datepicker";
export default {
  data: function () {
    return {
      tasks: [],
      loading: true,
      errored: false,

      task_title: "",
      description: "",
      task_date: null,

      success: false,
      user: "",
    };
  },
  components: {
    DatePicker,
  },
  methods: {
    submitForm() {
      let dateFormat = require("dateformat");
      let date = new Date(this.task_date);
      console.log(date, '<---');
      console.log(dateFormat(date, "isoDateTime"), '<----');
      this.$axios
        .post("http://192.168.133.51:8000/api/auth/", {
          task_title: this.task_title,
          description: this.description,

          expire_time: dateFormat(date, "isoDateTime"),
        })
        .then((response) => {
          this.success = true;
        });
    },
  },
  mounted() {
    this.user = +this.$store.getters.getUserId;
    console.log(this.user);
    this.$axios //http://192.168.133.51:8000/api/tasks/?format=json${this.user}
      .get(`http://192.168.133.51:8000/api/auth/`)
      .then((response) => {
        this.tasks = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },

  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
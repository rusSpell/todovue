<template>
  <div>
    <h1>API Павла, userid="{{ user }}"</h1>
    <hr />
    <div v-if="errored">
      <p>Павел сломал API</p>
    </div>
    <div v-else>
      <p v-if="loading">Загружается</p>
    <table v-if="tasks.length">
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
          <td class="text_width"><div class="text">{{ task.description }}</div></td>
         <!--  <td>{{ task.status }}</td> -->
          <td>
            <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">
              Открыть
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Задачи отсутствуют</p>
    </div>
    <hr />
    <h5>Формочка</h5>
    <form @submit.prevent="submitForm">

      <div class="input-field">
        <input id="task_title" v-model="task_title" type="text" />
        <label for="task_title">Заголовок</label>
      </div>

      <div class="input-field">
        <input id="description" v-model="description" type="text" />
        <label for="description">Описалово</label>
      </div>

        <div class="row">
          <input class="col s3" type="text" ref="datepicker" />
        </div>

      <button class="btn" type="submit">Отправить Павлу</button>
    </form>
  </div>
</template>


<script>
import 'dateformat/lib/dateformat.js'
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
      user: ''
    };
  },
  methods: {
    submitForm() {
      let dateFormat = require('dateformat');
      let date = new Date(this.task_date.date)
      
      this.$axios
        .post("http://192.168.133.51:8000/api/tasks/", {
          task_title: this.task_title,
          description: this.description,
          task_date: dateFormat(date, "yyyy-mm-dd")
        })
        .then((response) => {
          this.success = true
        });
    },
  },
  mounted() {
    this.task_date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });
    this.user = +this.$store.getters.getUserId
    this.$axios
      .get(`http://192.168.133.51:8000/api/${this.user}/tasks/?format=json`)
        .then((response) => {
          console.log(response.data);
          this.tasks = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false)
        );
    
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
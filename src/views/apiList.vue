<template>
  <div>
    <h1 class="title mt-4">Список задач загруженный из API Павла, userid="{{ this.user }}"</h1>
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
              <th>Выполнить до</th>
              <th>Текст задачи</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task of tasks" :key="task.id">
              <td>{{ task.id }}</td>
              <td>{{ task.task_title }}</td>
              <td>{{ new Date(task.expire_time).toLocaleTimeString() + ' ' + new Date(task.expire_time).toLocaleDateString() }}</td>
              <td class="text_width">
                <div class="text">{{ task.description }}</div>
              </td>
              <td>{{ task.task_status }}</td>
              <td>
                <router-link
                  tag="button"
                  class="button is-link is-small"
                  :to="'/api/task/' + task.id"
                >Открыть</router-link>
              </td>
            </tr>
          </tbody>
        </table><p v-else>Задачи отсутствуют</p>
      </div> 
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

      user: "",


    };
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


};
</script>
<style lang="scss" scoped>
</style>
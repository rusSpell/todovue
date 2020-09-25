<template>
  <div>
    <h1 class="title mt-4">Изменение задачи № {{ this.$route.params.id }}</h1>
    <div v-if="task">
      <h1>{{ task.title }}</h1>
      <div class="columns">
      <form @submit.prevent="submitForm" class="column is-four-fifths">

        <div class="input-field">
          <input id="title" v-model="task.task_title" type="text" class="input" required />
          <label for="title">Имя задачи</label>
          <span class="helper-text" data-error="Обязательное поле" data-success></span>
        </div>



        <div class="input-field">
          <textarea id="description" class="textarea" v-model="task.description"></textarea>
          <label for="description">Текст задачи</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ task.description && task.description.length }}/2048</span>
        </div>

        <date-picker 
          v-model="task.expire_time" 
          value-type="format" 
          type="datetime" 
          :show-second="false" 
          :minute-step="15" 
          :hour-options="hours" 
          :disabled-date="notBeforeToday"
          :disabled-time="notBeforeСurrentHour"
          :placeholder="new Date(task.expire_time).toLocaleTimeString() + ' ' + new Date(task.expire_time).toLocaleDateString()"
        >
        </date-picker>


        <div  v-if="task.task_status !=='Выполнено'" class="mt-4">
          <button class="button is-warning" type="submit">Изменить</button>
          <button class="button is-success ml-4" type="button" @click="completeTask">Завершить</button>
        </div>
      </form>
      </div>
    </div>
    <div v-else>
      <h1>Задача не найдена</h1>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
export default {
  name: "apiTask",
  data: () => ({
    task: {},
    loading: true,
    errored: false,
    expire_time: null,
    user: "",
    hours: Array.from({ length: 11 }).map((_, i) => i + 8),
  }),
  components: {
    DatePicker,
  },
  computed: {
    //task() {
      // console.log(typeof this.$route.params.id);
      //return this.$store.getters.taskById(+this.$route.params.id);
   // },
  },

  mounted() {
    console.log(this.$route, 'sadas');
    this.user = +this.$store.getters.getUserId;
    console.log(this.user);
    this.$axios 
      .get(`http://192.168.133.51:8000/api/auth/${this.$route.params.id}/?format=json`)
      .then((response) => {
        // this.task = response.data
        this.task = Object.assign({}, response.data)

      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
     
    
  },
  methods: {

    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    notBeforeСurrentHour(date) {
      
      let closetime = new Date
      //console.log(date.getHours() < 9, 'xxxxxx');
      return date.getHours() < closetime.getHours()+1;
    },
    submitForm() {
      let dateFormat = require("dateformat");
      let date = new Date(this.task.expire_time);
      console.log(this.task.task_title, "<===", this.task.description, "<===", date, "<===");
      this.$axios
        .put(`http://192.168.133.51:8000/api/auth/${this.$route.params.id}/?format=json`, {
          task_title: this.task.task_title,
          description: this.task.description,
          
          expire_time: dateFormat(date, "isoDateTime"),
        })
        .then((response) => {
          this.success = true;
        });
        this.$router.push("/api/list");
    },
    completeTask() {
      this.$axios
        .put(`http://192.168.133.51:8000/api/auth/${this.$route.params.id}/?format=json`, {
          task_status: true
        })
        .then((response) => {
          this.success = true;
        });
        this.$router.push("/api/list");
    },
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
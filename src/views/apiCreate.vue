<template>
  <div>
    <h1 class="title mt-4">Создание задачи через API Павла, userid="{{ +this.$store.getters.getUserId }}"</h1>
    <hr />
    <h5>Формочка</h5>
    <div class="columns">
      <form @submit.prevent="submitForm" class="column is-four-fifths">
        <div class="notification" v-if="errored" >
          Введено некорректное время!
        </div>
        <div class="input-field">
          <input id="task_title" v-model="task_title" type="text" class="input" />
          <label for="task_title">Заголовок</label>
        </div>

        <div class="input-field">
          <textarea id="description" v-model="description" type="textarea" class="textarea" />
          <label for="description">Описалово</label>
        </div>

        <date-picker 
          v-model="task_date" 
          value-type="format" 
          type="datetime" 
          :show-second="false" 
          :minute-step="15" 
          :hour-options="hours" 
          :disabled-date="notBeforeToday"
          :disabled-time="notBeforeСurrentHour"
          placeholder="Время исполнения до:"
        >
        </date-picker>

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

      hours: Array.from({ length: 11 }).map((_, i) => i + 8),
    };
  },
  components: {
    DatePicker,
  },

  methods: {
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
    notBeforeСurrentHour(date) {
      
      let closetime = new Date
      //console.log(date.getHours() < 9, 'xxxxxx');
      return date.getHours() < closetime.getHours()-5;
    },
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
          this.$router.push("/api/list");
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        
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
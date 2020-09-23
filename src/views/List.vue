<template>
  <div>
    <h1 class="title mt-4">Список задач</h1>
    <hr />
    <div style="overflow: auto;">
    <table v-if="tasks.length" class="table is-bordered is-narrow is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Имя задачи</th>
          <th>Дата</th>
          <th>Текст задачи</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, idx) of tasks" :key="task.id">
          <td>{{ idx+1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="text_width"><div class="text">{{ task.description }}</div></td>
          <td>{{ task.status }}</td>
          <td>
            <router-link tag="button" class="button is-link is-small" :to="'/task/' + task.id">
              Открыть
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Задачи отсутствуют</p>
    </div>
    

  </div>
</template>

<script>
export default {
  name: "List",
  computed: {
    tasks() { 
      return this.$store.getters.tasks
    }
  },
};
</script>
<style lang="scss" scoped>
  .text{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .text_width{
    max-width: 400px;
  }
</style>
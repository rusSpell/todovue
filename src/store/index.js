import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'



Vue.use(Vuex)

Vuex.Store.prototype.$axios = axios

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    status: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || ''
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, description, date}) {
      const tasks = state.tasks.concat()

      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]

      const status = new Date(date) > new Date() ? 'В работе' : 'Просрочена'

      tasks[idx] = {...task, date, description, status}
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id)
      state.tasks[idx].status = 'Выполнено'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, {token, user}){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },

  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    completeTask({commit}, id) {
      commit('completeTask', id)
    },
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://192.168.133.51:8000/api/api-token-auth/', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user_id
          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          console.log(user, '<-- from store in actions');
          axios.defaults.headers.common['Authorization'] = 'Token ' + token
          commit('auth_success', {token, user})
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        console.log('logout');
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }

  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id),
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUserId: state => state.user
  }
})
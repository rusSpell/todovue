import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'list',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/create',
    name: 'create',

    component: () => import('@/views/Create.vue')
  },
  {
    path: '/task/:id',
    name: 'task',
    meta: { 
      requiresAuth: true
    },
    component: () => import('@/views/Task.vue')
  },
  {
    path: '/api/create',
    name: 'apiCreate',
    meta: { 
      requiresAuth: true
    },
    component: () => import('@/views/apiCreate.vue')
  },
  {
    path: '/api/list',
    name: 'apiList',
    meta: { 
      requiresAuth: true
    },
    component: () => import('@/views/apiList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})
export default router

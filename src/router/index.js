import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../views/Create.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'create',
    component: Create
  },
  {
    path: '/list',
    name: 'list',
    meta: { 
      requiresAuth: true
    },
    component: () => import('@/views/List.vue')
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
    path: '/articles',
    name: 'articles',
    meta: { 
      requiresAuth: true
    },
    component: () => import('@/views/Articles.vue')
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

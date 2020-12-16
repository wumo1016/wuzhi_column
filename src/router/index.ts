import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { redirectHome: true }
  },
  {
    path: '/column/:id',
    name: 'ColumnDetail',
    component: () => import('@/views/columnDetail.vue')
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: () => import('@/views/createPost.vue'),
    meta: { requiredLogin: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (
    to.meta.requiredLogin &&
    to.path !== '/login' &&
    !store.state.user.isLogin
  ) {
    next('/login')
  } else if (to.meta.redirectHome && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout.vue'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { redirectHome: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register.vue')
  },
  {
    path: '',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home.vue')
      },
      {
        path: '/column/:id',
        name: 'ColumnDetail',
        component: () => import('@/views/columnDetail.vue')
      },
      {
        path: '/createEdit',
        name: 'CreateArticle',
        component: () => import('@/views/createArticle.vue'),
        meta: { requiredLogin: true }
      },
      {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: () => import('@/views/articleDetail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  const { user } = store.state
  const { requiredLogin, redirectHome } = to.meta
  if (requiredLogin && to.path !== '/login' && !user.isLogin) {
    next('/login')
  } else if (redirectHome && user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router

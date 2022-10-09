import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta:{
      requireAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      requireAuth: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requireAuth: true
    }
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)){
    if(localStorage.getItem('jwt') == null){
      next({
        path: "/login",
        params:{nextUrl: to.fullPath}
      })
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router

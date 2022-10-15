import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostView from '../views/PostView.vue'
import axios from "axios"
import store from '@/store'


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
  },
  {
    path: '/newpost',
    name: 'post',
    component: PostView,
    meta:{
      requireAuth: true
    }
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const onReady = () => {
  store.commit("isAuthenticated");
  axios.get(store.state.api_url + "post/getposts")
    .then(response => {
      console.log(response);
      store.commit("getFeed", response.data);
    })
    .catch(err => {
      if(err) throw err;
    })
};

router.beforeEach((to, from, next) => {
  onReady();
  if(to.matched.some(record => record.meta.requireAuth)){
    if(localStorage.getItem('jwt') == null){
      next({
        path: "/login",
        params:{nextUrl: to.fullPath}
      })
    }else{
      next()
    }
  }else{
    if(localStorage.getItem('jwt') != null){
      next({
        path: "/",
        params: { nextUrl: "/" }
      })
    }else{
      next()
    }
  }
})

export default router



import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostView from '../views/PostView.vue'
import ProfileView from '../views/ProfileView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import GlobalView from '../views/GlobalView.vue'
import FoundProfileView from '../views/FoundProfileView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminRegisterView from '../views/AdminRegisterView.vue'
import AdminMainView from '../views/AdminMainView.vue'
import AdminBanView from '../views/AdminBanView.vue'
import AdminFoundUserView from '../views/AdminFoundUserView.vue'
import axios from "axios"
import store from '@/store'


const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta:{
      requiresUserAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      requiresUserAuth: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresUserAuth: true
    }
  },
  {
    path: '/newpost',
    name: 'post',
    component: PostView,
    meta:{
      requiresUserAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta:{
      requiresUserAuth: true
    }
  },
  {
    path: '/editprofile',
    name: 'editprofile',
    component: EditProfileView,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path: '/global',
    name: 'global',
    component: GlobalView,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path: '/foundprofile/:id',
    name: 'found',
    component: FoundProfileView,
    meta: {
      requiresUserAuth: true
    }
  },
  {
    path: '/admin/login',
    name: 'adminlogin',
    component: AdminLoginView,
    meta: {
      requiresAdminAuth: false
    }
  },
  {
    path: '/admin/register',
    name: 'adminregister',
    component: AdminRegisterView,
    meta: {
      requiresAdminAuth: false
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminMainView,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/banuser',
    name: 'banuser',
    component: AdminBanView,
    meta: {
      requiresAdminAuth: true
    }
  },
  {
    path: '/admin/foundprofile/:id',
    name: 'founduser',
    component: AdminFoundUserView,
    meta: {
      requiresAdminAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


const handleUserRouting = (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresUserAuth)){
    if(localStorage.getItem('jwt') == null){
      next({
        path: "/login",
        params:{nextUrl: to.fullPath}
      })
    }else{
      next()
    }
  }else{
    // next()
    if(localStorage.getItem('jwt') != null){
      next({
        path: "/",
        params: { nextUrl: "/" }
      })
    }else{
      next()
    }
  }
};

const handleFromAdmin = (to, from, next) => {

  if(!to.matched.some(record => record.meta.requiresAdminAuth)
    &&localStorage.getItem('adminJwt') != null){
      next({
        path: "/admin",
        params: { nextUrl: "/admin" }
      })
}
}

const handleAdminRouting = (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAdminAuth)){
    if(localStorage.getItem('adminJwt') == null){
      next({
        path: "/login",
        params:{nextUrl: to.fullPath}
      })
    }else{
      next()
    }
  }else{
    if(localStorage.getItem('adminJwt') != null){
      next({
        path: "/admin",
        params: { nextUrl: "/admin" }
      })
    }else{
      next()
    }
  }
};

const onReady = (path) => {
  store.commit("isAuthenticated");
  if (path === "/"
  || path === "/admin")
  axios.get(store.state.api_url + "post/getposts")
    .then(response => {
      store.commit("getFeed", response.data);
    })
    .catch(err => {
      if(err) throw err;
    })
};



router.beforeEach((to, from, next) => {
  let resolved = router.resolve(to.fullPath)
  if(resolved.matched.length === 0)
  { 
    next({
      path: "/",
      params: { nextUrl: "/" }
    });
  }
    
  onReady(to.fullPath);
  handleFromAdmin(to, from, next)
  if(to.fullPath.includes("admin")){
    handleAdminRouting(to, from, next);
  }else{
    handleUserRouting(to, from, next);
  }
})

export default router



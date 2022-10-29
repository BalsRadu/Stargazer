import { createStore } from 'vuex'
import router from '@/router'


export default createStore({
  state: {
    api_url:"http://localhost:3000/",
    isUserAuthenticated: false,
    isAdminAuthenticated: false,
    feed: [],
  },
  getters: {
  },
  mutations: {
    getFeed (state, feed) {
      state.feed = feed;
    },
    isAuthenticated (state) {
      state.isUserAuthenticated = (localStorage.getItem("jwt") != null) ? true : false
      state.isAdminAuthenticated = (localStorage.getItem("adminJwt") != null) ? true : false
    },
    login (state, token) {
      state.isUserAuthenticated = true;
      localStorage.setItem("jwt", token);
      router.push("/");
    },
    logout (state) { 
      state.isUserAuthenticated = false;
      localStorage.removeItem("jwt");
      router.push("/login");
    },
    adminLogin (state, token) {
      state.isAdminAuthenticated = true;
      localStorage.setItem("adminJwt", token);
      router.push("/admin");
    },
    adminLogout (state) { 
      state.isAdminAuthenticated = false;
      localStorage.removeItem("adminJwt");
      router.push("/admin/login");
    },
  },
  actions: {
  },
  modules: {
  }
})

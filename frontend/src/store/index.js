import { createStore } from 'vuex'
import router from '@/router'


export default createStore({
  state: {
    api_url:"http://localhost:3000/",
    isAuthenticated: false,
    feed: []
  },
  getters: {
  },
  mutations: {
    getFeed (state, feed) {
      state.feed = feed;
    },
    isAuthenticated (state) {
      if(localStorage.getItem("jwt") != null) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    login (state, token) {
      state.isAuthenticated = true;
      localStorage.setItem("jwt", token);
      router.push("/");
    },
    logout (state) { 
      state.isAuthenticated = false;
      localStorage.removeItem("jwt");
      router.push("/login");
    }
  },
  actions: {
  },
  modules: {
  }
})

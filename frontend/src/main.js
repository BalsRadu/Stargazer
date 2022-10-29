import { createApp } from 'vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

const app = createApp(App).use(store).use(router)
app.use(Toast);
app.config.globalProperties.$http = axios;
app.mount('#app')

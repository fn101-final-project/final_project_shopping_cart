import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';

const app = createApp(App);

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
app.config.globalProperties.$axios = axios;

app.use(router).use(store(axios)).use(VueSweetalert2).mount('#app');

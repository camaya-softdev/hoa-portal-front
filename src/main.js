import { createApp } from "vue";
import App from "./App.vue";
import './index.css';
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import Multiselect from 'vue-multiselect'

createApp(App).use(ElementPlus).use(router).use(store).mount("#app");

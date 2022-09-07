import { createApp } from "vue";
import App from "./App.vue";
import './index.css';
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import 'element-plus/dist/index.css'


// import Multiselect from 'vue-multiselect'

createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(store)
  .component('QuillEditor', QuillEditor)
  .mount("#app");

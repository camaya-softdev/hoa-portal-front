import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "element-plus/dist/index.css";

import Pagination from "./components/Pagination.vue";
import PageComponent from "./components/PageComponent.vue";
import RichTextEditor from "./components/RichTextEditor.vue";
import Table from "./components/Table.vue"

let app;
if(!app){
  app = createApp(App);
  app.use(ElementPlus);
  app.use(router);
  app.use(store);
  app.component("PageComponent",PageComponent);
  app.component("RichTextEditor",RichTextEditor);
  app.component("QuillEditor", QuillEditor);
  app.component("Table",Table)
  app.component("Pagination",Pagination);
  app.mount("#app");
  
}

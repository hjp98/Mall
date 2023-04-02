import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./router/guard/index";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// createApp(App).use(store).use(router).mount("#app");
const app = createApp(App);
app.use(store);
app.use(router);
// app.use(createPinia());
app.mount("#app");

// app.config.globalProperties.$axios = axios;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
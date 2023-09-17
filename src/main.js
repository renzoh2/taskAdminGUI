//Specified function Imports
import { createApp } from "vue";

//File Imports
import App from "./App.vue";
import router from "./modules/route";
import store from "./modules/store/index";
import "./index.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

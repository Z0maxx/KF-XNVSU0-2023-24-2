import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import Toast from "./components/Toast.vue";
import Popup from "./components/Popup.vue";

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.window = window
app.use(pinia)
app.use(router)
app.component('Toast', Toast)
app.component('Popup', Popup)
app.mount("#app")

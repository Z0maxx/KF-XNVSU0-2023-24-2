import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";
import Register from "@/components/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router;

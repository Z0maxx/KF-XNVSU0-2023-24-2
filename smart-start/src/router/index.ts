import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";
import Register from "@/components/Register.vue";
import { useAuthStore } from "@/stores/auth";
import IdeaList from "@/components/IdeaList.vue";
import IdeaDetails from "@/components/IdeaDetails.vue";
import Account from "@/components/Account.vue";

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
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/ideas',
    name: 'ideas',
    component: IdeaList
  },
  {
    path: '/idea/:id',
    name: 'idea',
    component: IdeaDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const store = useAuthStore()
  
  if (store.isLoggedIn && (to.name === 'login' || to.name === 'register' || to.name === 'account')) {
    return { name: 'home' }
  }
  return true
})

export default router;

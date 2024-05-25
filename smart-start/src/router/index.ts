import { createRouter, createWebHistory, RouteRecordName, RouteRecordRaw } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";
import Register from "@/components/Register.vue";
import { useAuthStore } from "@/stores/auth";
import IdeaList from "@/components/IdeaList.vue";
import IdeaListBy from "@/components/IdeaListBy.vue";
import IdeaDetails from "@/components/IdeaDetails.vue";
import CreateIdea from "@/components/CreateIdea.vue";
import EditIdea from "@/components/EditIdea.vue";
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
    path: '/ideas-by/:userId',
    name: 'ideas-by',
    component: IdeaListBy
  },
  {
    path: '/idea/:id',
    name: 'idea',
    component: IdeaDetails
  },
  {
    path: '/create-idea',
    name: 'create-idea',
    component: CreateIdea
  },
  {
    path: '/edit-idea/:id',
    name: 'edit-idea',
    component: EditIdea
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const loggedInGuards: Record<0 | 1, { routeNames: Array<RouteRecordName>, redirectoTo: string }> = {
  0: {
    routeNames: [
      'account',
      'logout',
      'create-idea',
      'update-idea'
    ],
    redirectoTo: 'login'
  },
  1: {
    routeNames: [
      'login',
      'register',
    ],
    redirectoTo: 'home'
  },
}

router.beforeEach((to) => {
  const name = to.name
  if (!name) throw new Error('No route name')

  const store = useAuthStore()

  const isLoggedIn = store.isLoggedIn ? 1 : 0
  const loggedInGuard = loggedInGuards[isLoggedIn]
  
  if (loggedInGuard && loggedInGuard.routeNames.includes(name)) {
    return { name: loggedInGuard.redirectoTo }
  }

  return true
})

export default router;

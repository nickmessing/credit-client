import { createRouter, createWebHistory, NavigationGuardWithThis, RouteRecordRaw } from 'vue-router'
import { authenticated } from './store/auth'
import { HomeView } from './views/Home'
import { LoginView } from './views/Login'
import { UsersView } from './views/Users'

const authenticatedGuard: NavigationGuardWithThis<undefined> = (from, to, next) => {
  if (!authenticated.value) {
    return next('/login')
  }
  next()
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: authenticatedGuard,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

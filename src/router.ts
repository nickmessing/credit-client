import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from 'vue-router'
import { authenticated } from './store/auth'
import { HomeView } from './views/Home'
import { LoginView } from './views/Login'
import { UsersView } from './views/Users'
import { UserCreateView } from './views/Users/New'
import { UserDetailsView } from './views/Users/User'

const authenticatedGuard: NavigationGuard = (from, to, next) => {
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
    beforeEnter: (from, to, next) => {
      if (authenticated.value) {
        return next('/')
      }
      next()
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView,
    beforeEnter: authenticatedGuard,
  },
  {
    path: '/users/new',
    name: 'UserCreate',
    component: UserCreateView,
    beforeEnter: authenticatedGuard,
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetailsView,
    beforeEnter: authenticatedGuard,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

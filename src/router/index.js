import Vue from 'vue'
import VueRouter from 'vue-router'
import landingPage from '../pages/landing-page.vue'
import about from '../pages/about.vue'
import home from '../pages/home.vue'
import workspace from '../pages/workspace.vue'
import taskDetails from '../pages/task-details.vue'
import dashboard from '../pages/dashboard.vue'
import user from '../pages/user.vue'
import login from '../pages/login.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing-page',
    component: landingPage
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/board/:boardId?',
    name: 'workspace',
    component: workspace,
    children: [
    {
      path: 'task/:taskId?',
      name: 'task-details',
      component: taskDetails
    }
    ],
  },
  {        //check if same id as board-id
    path: '/dashboard/:boardId?',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/user/:userId?',
    name: 'user',
    component: user
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
]

const router = new VueRouter({
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/general/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/general/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/general/LogInView.vue'),
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('../views/admin/AdminDashboardView.vue'),
        },
        {
          path: 'create-game',
          name: 'AdminCreateGame',
          component: () => import('../views/admin/CreateGameView.vue'),
        },
        {
          path: 'manage-hosts',
          name: 'AdminManageHosts',
          component: () => import('../views/admin/ManageHostsView.vue'),
        },
      ],
    },
  ],
})

export default router

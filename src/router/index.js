import { createRouter, createWebHistory } from 'vue-router'






const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      alias: '/home'
    },
    {
      path: '/pl',
      name: "Pl",
      component: () => import('../views/PlView.vue'),
      alias: ['/Pl', '/polish']
    },
    {
      path: '/fr',
      name: 'Fr',
      component: () => import('../views/FrView.vue'),
      alias: ['/Fr', '/french']
    },
    {
      path: '/en',
      name: 'En',
      component: () => import('../views/EnView.vue'),
      alias: ['/En', '/english']
    },
    {
      path: '/es',
      name: 'Es',
      component: () => import('../views/EsView.vue'),
      alias: ['/Es', '/spanish']
    },
    {
      path: '/it',
      name: 'It',
      component: () => import('../views/ItView.vue'),
      alias: ['/It', '/italian']
    },
    {
      path: '/de',
      name: 'De',
      component: () => import('../views/DeView.vue'),
      alias: ['/De', '/german']
    }
  ]
})

export default router

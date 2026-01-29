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
      alias: ['/pl', '/polish', '/exercises/pl']
    },
    {
      path: '/fr',
      name: 'Fr',
      component: () => import('../views/FrView.vue'),
      alias: ['/fr', '/french', '/exercises/fr']
    },
    {
      path: '/en',
      name: 'En',
      component: () => import('../views/EnView.vue'),
      alias: ['/en', '/english', '/exercises/en']
    },
    {
      path: '/es',
      name: 'Es',
      component: () => import('../views/EsView.vue'),
      alias: ['/es', '/spanish', '/exercises/es']
    },
    {
      path: '/it',
      name: 'It',
      component: () => import('../views/ItView.vue'),
      alias: ['/it', '/italian', '/exercises/it']
    },
    {
      path: '/de',
      name: 'De',
      component: () => import('../views/DeView.vue'),
      alias: ['/de', '/german', '/exercises/de']
    }
  ]
})

export default router

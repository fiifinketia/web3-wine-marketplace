import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage/HomePage.vue'),
      },
    ],
  },
  {
    path: '/marketplace',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Marketplace-Main/Marketplace-Main.vue'),
      },
    ],
  },
  {
    path: '/nft',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Metadata/Metadata.vue'),
      },
    ],
  },
  {
    path: '/favorites',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Favourites/Favourites.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/orders',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',

        component: () => import('pages/Profiles/ProfileOrders.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/calculator',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WineCalculator/WineCalculator.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

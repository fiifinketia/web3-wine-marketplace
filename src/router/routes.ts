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
    path: '/my-profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/MyProfile/MyProfile.vue'),
      },
    ],
  },
  {
    path: '/my-profile/listing',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/MyProfile/components/Listing.vue'),
      },
    ],
  },
  {
    path: '/my-profile/incoming-offers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('pages/MyProfile/components/IncomingOffers.vue'),
      },
    ],
  },
  {
    path: '/my-profile/outgoing-offers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('pages/MyProfile/components/OutgoingOffers.vue'),
      },
    ],
  },
  {
    path: '/my-profile/trading-history',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('pages/MyProfile/components/TradingHistory.vue'),
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

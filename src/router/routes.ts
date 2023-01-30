import { useUserStore } from 'src/stores/user-store';
import { RouteRecordRaw } from 'vue-router';
import Web3 from 'web3';

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
		path: '/protected',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/NewWine/NewWine.vue'),
			},
		],
		beforeEnter: async (from, to) => {
			const mainAccount = '0xAdE82F372e70f8032f675b80E3C6A7D31E3A5269';
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			const account = accounts[0];
			if (account != '0xade82f372e70f8032f675b80e3c6a7d31e3a5269') {
				return false;
			}
		},
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;

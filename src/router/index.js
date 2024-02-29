import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/user/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/user/HomeView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/user/ProductsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/user/CartView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: '登入頁',
    component: () => import('../views/user/LoginView.vue'),
  },
  {
    path: '/admin',
    name: '後台首頁',
    component: () => import('../views/admin/AdminDashboard.vue'),
    children: [
      {
        path: 'products',
        name: '後台產品列表',
        component: () => import('../views/admin/AdminProducts.vue'),
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('../views/admin/AdminOrder.vue'),
      },
      {
        path: 'coupons',
        name: '優惠券',
        component: () => import('../views/admin/AdminCoupons.vue'),
      },
      {
        path: 'articles',
        name: '文章管理列表',
        component: () => import('../views/admin/AdminArticle.vue'),
      },
      {
        path: 'article/new',
        name: '新增文章',
        component: () => import('../views/admin/AdminArticleView.vue'),
      },
    ],
  },
  // 404 頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;

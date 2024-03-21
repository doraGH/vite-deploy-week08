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
        path: 'product-view/:id',
        component: () => import('../views/user/ProductDetail.vue'),
      },
      {
        path: 'story',
        component: () => import('../views/user/BrandStory.vue'),
      },
      {
        path: 'terms',
        component: () => import('../views/user/TermsView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/user/CartView.vue'),
      },
      {
        path: 'cartcheck',
        component: () => import('../views/user/CartCheck.vue'),
      },
      {
        path: 'payment/:id',
        component: () => import('../views/user/PaymentView.vue'),
      },
      {
        path: 'orderlist',
        component: () => import('../views/user/OrderList.vue'),
      },
      {
        path: 'orderfinish',
        component: () => import('../views/user/OrderFinish.vue'),
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
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;

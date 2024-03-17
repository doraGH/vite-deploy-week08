<template>
  <header class="fixed-top">
    <nav class="navbar navbar-expand-md navbar-light"
    :class="{ 'pink-light': scrolled }" ref="navbar">
      <div class="container-fluid d-flex">
        <Router-Link
          class="nav-link me-3"
          aria-current="page" to="/" @click="closeNavbar">
          <img src="../../assets/images/logo.svg"
            alt="" width="169" height="70"
            class="d-inline-block align-text-top"/>
        </Router-Link>
        <div class="d-flex justify-content-end navbar-qlink">
          <RouterLink to="/login"
          class="btn btn-sm">
            <img src="../../assets/images/user.svg">
          </RouterLink>
          <RouterLink to="/cart"
          class="btn btn-sm position-relative me-4">
            <img src="../../assets/images/cart.svg" class="position-relative">
            <span class="position-absolute top-0
            start-100 translate-middle badge rounded-pill bg-danger"
            v-if="this.cartList.carts">
            <!-- v-if 當頁面刷新時，先檢查cartList是否存在,否則會出錯 -->
            {{ this.cartList.carts.length }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </RouterLink>
          <button
            class="navbar-toggler d-flex d-md-none flex-column justify-content-around"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            :class="{ collapsed: btnState }" @click="btnState = !btnState">
            <span class="toggler-icon top-bar"></span>
            <span class="toggler-icon middle-bar"></span>
            <span class="toggler-icon bottom-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse"
        id="navbarNav" ref="navbarNav" :class="{ hide: isHide }">
          <div class="navbar-nav me-auto">

            <RouterLink to="/news-list"
            class="nav-item nav-link me-1"
            @click="closeNavbar"
            aria-current="page">最新消息</RouterLink>

            <RouterLink to="/products"
            class="nav-item nav-link me-1"
            @click="closeNavbar"
            aria-current="page">美味菜單</RouterLink>

            <RouterLink to="/story"
            class="nav-item nav-link me-1"
            @click="closeNavbar"
            aria-current="page">品牌故事</RouterLink>

            <RouterLink to="/contact-us"
            class="nav-item nav-link me-1"
            @click="closeNavbar"
            aria-current="page">聯絡我們</RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="cover" :class="{show: !btnState}"></div>

  <RouterView></RouterView>

  <footer class="footer">
    <div class="container py-2">
      <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-2">
        <div class="col-md-7 d-flex align-items-center">
          <div class="mb-3 me-2 mb-md-0 text-muted">
            <img src="../../assets/images/logo.svg"
            alt="" width="169" height="70"
            class="d-inline-block align-text-top"/>
          </div>
          <span class="text-muted">© 2024 Sweet Home Shop.</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex fs-4">
          <li class="ms-4">
            <a class="text-muted" href="#">
              <i class="bi bi-facebook"></i>
            </a>
          </li>
          <li class="ms-4">
            <a class="text-muted" href="#">
              <i class="bi bi-youtube"></i>
            </a>
          </li>
          <li class="ms-4">
            <a class="text-muted" href="#">
              <i class="bi bi-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore'; // @ => /src

export default {
  data() {
    return {
      isHide: false, // 是否隱藏
      btnState: true, // 按鈕狀態
      scrolled: false, // 是否已滾動,如滾動加上粉紅底色
    };
  },
  watch: {
    // 路由改變,重新設置隱藏與按鈕狀態
    $route() {
      this.isHide = false;
      this.btnState = true;
    },
  },
  computed: {
    ...mapState(cartStore, ['cartList']),
  },
  methods: {
    // 切換小尺寸選單狀態
    closeNavbar() {
      this.isHide = !this.isHide;
      this.btnState = !this.btnState;
    },
    // 滾動事件
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },

    ...mapActions(cartStore, ['getCarts']),
  },
  mounted() {
    // dom生成時掛載監聽事件
    window.addEventListener('scroll', this.handleScroll);
    this.getCarts();
  },
  beforeUnmount() {
    // 確保在組件銷毀之前移除監聽事件
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

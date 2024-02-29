<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light" ref="navbar">
    <div class="container-fluid">
      <Router-Link
        class="nav-link fw-bolder text-dark fs-6"
        aria-current="page"
        to="/"
      >
        <img
          src="/logoname.png"
          alt=""
          width="137"
          height="70"
          class="d-inline-block align-text-top"
      /></Router-Link>

      <button class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse"
      id="navbarNav" ref="navbarNav" :class="{ hide: isHide }">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/"
            class="nav-link"
            @click="closeNavbar"
            aria-current="page">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products"
            class="nav-link"
            @click="closeNavbar"
            aria-current="page">商品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/cart"
            class="nav-link"
            @click="closeNavbar"
            aria-current="page">購物車</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/login"
            class="nav-link"
            @click="closeNavbar"
            aria-current="page">登入頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/admin/orders"
            class="nav-link"
            @click="closeNavbar"
            aria-current="page">後單訂單頁</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>

<script>
// import Tab from 'bootstrap/js/dist/tab';

export default {
  data() {
    return {
      isHide: false,
    };
  },
  methods: {
    closeNavbar() {
      this.isHide = !this.isHide;
    },
  },
  // mounted() {
  //   console.log(this.$refs.navbar);
  //   this.navbar = new Tab(this.$refs.navbar);
  // },
};
</script>

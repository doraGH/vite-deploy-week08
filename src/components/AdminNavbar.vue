<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台管理頁面</a>
      <button class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <RouterLink to="/admin/products" class="nav-link">產品</RouterLink>
          <RouterLink to="/admin/orders" class="nav-link">訂單</RouterLink>
          <RouterLink to="/admin/coupons" class="nav-link">優惠券</RouterLink>
          <!-- <RouterLink to="/admin/articles" class="nav-link">貼文</RouterLink> -->
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </div>
        <div class="navbar-nav ms-auto">
          <!-- <RouterLink to="/user/articles" class="nav-link">Blog</RouterLink> -->
          <!-- <RouterLink to="/cart" class="nav-link">購物車</RouterLink> -->
          <RouterLink to="/" class="nav-link">返回前台</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;
export default {
  methods: {
    // 登出
    logout() {
      this.axios.post(`${VITE_URL}/logout`)
        .then(() => {
          Swal.fire('您已成功登出');
          document.cookie = 'hexToken=; expires=; path=/';
          this.$router.push('/login');
        })
        .catch(() => {
          // Swal.fire(error.response.data.message);
          Swal.fire('請重新登入');
          this.$router.push('/login');
        });
    },
  },
};
</script>

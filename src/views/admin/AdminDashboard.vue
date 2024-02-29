<template>
  <AdminNavbar />
  <div id="login-page" class="container-fluid">
    <RouterView v-if="status"></RouterView>
  </div>
</template>

<script>
// import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';

import AdminNavbar from '@/components/AdminNavbar.vue';

const { VITE_URL } = import.meta.env;

export default {
  components: { AdminNavbar },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    // 確認是否登入
    checkLogin() {
      const url = `${VITE_URL}/api/user/check`;
      this.axios.post(url)
        .then(() => {
          this.status = true;
          toast.success('登入成功!');
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    // 取得暫存在cookie的 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.axios.defaults.headers.common.Authorization = token;

    // 確認是否登入狀態
    this.checkLogin();
  },

};
</script>

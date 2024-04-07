import Swal from 'sweetalert2';

export default {
  methods: {
    // 成功
    successAlert(title, text) {
      Swal.fire({
        icon: 'success',
        title,
        text,
      });
    },
    // 錯誤
    errorAlert(title, text) {
      Swal.fire({
        icon: 'error',
        title,
        text,
      });
    },
    // 警告
    warningAlert(title, text) {
      Swal.fire({
        icon: 'warning',
        title,
        text,
      });
    },
    // 提示
    infoAlert(title, text) {
      Swal.fire({
        icon: 'info',
        title,
        text,
      });
    },
    // 事前詢問,需return返回一個promise,才能鏈接then
    showAlert(title, options = {}) {
      return Swal.fire({
        icon: 'warning',
        title,
        ...options,
      });
    },
  },
};

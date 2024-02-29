import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    cartList: {},
    isLoading: false,
    status: {
      loadCart: '',
      loadQty: '',
    },
  }),
  actions: {
    // 加入購物車
    addCart(id, qty = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
      this.status.loadCart = id;
      const myCart = {
        data: {
          product_id: id,
          qty,
        },
      };
      axios
        .post(url, myCart)
        .then((response) => {
          // this.$refs.modal.hideModal();
          this.status.loadCart = '';
          this.getCarts();
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
    // 取得購物車
    getCarts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
      this.isLoading = true;
      axios
        .get(url)
        .then((response) => {
          const { data } = response.data;
          this.isLoading = false;
          this.cartList = data;
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
    // 刪除單一購物車
    removeCartItem(cartId) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`;
      this.status.loadQty = cartId;
      axios
        .delete(url)
        .then((response) => {
          toast.success(response.data.message);
          this.status.loadQty = '';
          this.getCarts();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
    // 刪除全部購物車
    deleteAllCarts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/carts`;
      Swal.fire({
        title: '確定要刪除全部購物車嗎?',
        showDenyButton: true,
        confirmButtonText: '是，我要刪除',
        denyButtonText: '不要刪除',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(url)
            .then((response) => {
              this.getCarts();
              Swal.fire(response.data.message);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        }
      });
    },
    // 更新購物車
    updateCart(data) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${data.id}`;
      const cart = {
        data: {
          product_id: data.product_id,
          qty: data.qty,
        },
      };
      this.status.loadQty = data.id;
      axios
        .put(url, cart)
        .then(() => {
          // Swal.fire(response.data.message);
          this.status.loadQty = '';
          this.getCarts();
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
  },

  getters: {},
});

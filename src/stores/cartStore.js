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
          // console.log(response);
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

  getters: {
    // 自動重新計算 cartList 的長度(在重整時才不會出錯)
    // 判斷如果 cartList 不存在 或 carts是空值，返回 0
    cartsLengthComputed() {
      if (this.cartList && this.cartList.carts) {
        return this.cartList.carts.length;
      }
      return 0;
    },

    finalPrice() {
      const totalPrice = this.cartList.total;
      if (this.cartList && this.cartList.carts && this.cartList.carts.length > 0) {
        const { coupon } = this.cartList.carts[0];
        if (coupon && totalPrice >= 500) {
          // 如果有折扣且總金額>=500，將折扣金額扣除
          // console.log(totalPrice - coupon.percent);
          return totalPrice - coupon.percent; // 假設 coupon.percent 是折扣金額
        }
        // 如果沒有折扣但總金額>=500，則返回原始總金額
        return totalPrice;
      }
      return totalPrice; // 在其他情況下返回預設值
    },
  },
});

import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('productStore', {
  state: () => ({
    products: [],
    pagination: {},
    productItem: {},
    loadItem: '',
    isLoading: false,
  }),

  actions: {
    // 取得所有產品
    getProducts(page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`;
      this.isLoading = true;
      axios
        .get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          this.isLoading = false;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
    // 取得單一產品，並且要開起modal
    getProductItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/product/${id}`;
      this.loadItem = id;
      axios
        .get(url)
        .then((response) => {
          const { product } = response.data;
          this.loadItem = '';
          this.productItem = product;
          // this.$refs.modal.openModal();
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
          // console.log(error);
        });
    },
  },
});

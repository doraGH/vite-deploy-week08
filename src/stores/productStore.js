import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('productStore', {
  state: () => ({
    allProducts: [],
    products: [],
    pagination: {},
    productItem: {},
    loadItem: '',
    isLoading: false,
  }),

  actions: {
    // 取得所有產品
    getAllProducts() {
      const url = `${VITE_URL}/api/${VITE_PATH}/products/all`;
      axios.get(url)
        .then((response) => {
          const { products } = response.data;
          this.allProducts = products;
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
    // 取得所有產品(分頁+分類)
    getProducts(category = '', page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/products?category=${category}&page=${page}`;
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
    // 取得單一產品
    getProductItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/product/${id}`;
      this.loadItem = id;
      axios
        .get(url)
        .then((response) => {
          const { product } = response.data;
          this.loadItem = '';
          this.productItem = product;
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
  },
});

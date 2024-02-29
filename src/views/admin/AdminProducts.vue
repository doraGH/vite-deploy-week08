<template>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="d-flex justify-content-between mt-4">
      <h2>後台產品列表</h2>
      <button class="btn btn-primary" @click="openProductModal('createNew')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-center">原價</th>
          <th width="120" class="text-center">售價</th>
          <th width="100" class="text-center">是否啟用</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center">{{ item.origin_price }}</td>
          <td class="text-center">{{ item.price }}</td>
          <td class="text-center">
            <span :class="{'text-success': item.is_enabled}">
              {{ item.is_enabled ? '啟用' : '未啟用'}}</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
              @click.prevent="openProductModal('edit', item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click.prevent="deleteProduct(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="getProducts"></PaginationComponent>
  </div>

  <!-- Modal 新增修改視窗 -->
  <ProductModal
    ref="productModal"
    :is-new="isNew"
    :temp-product="tempProduct"
    @update-product="getProducts"
    @update-temp-product="handleUpdateTempProduct">
  </ProductModal>

  <!-- Modal 刪除彈跳視窗 -->
  <!-- <DelModal
  ref="delModal"
  :item="tempProduct"
  @del-item="deleteProduct"></DelModal> -->
</template>

<script>
import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';

import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/ProductModal.vue';
// import DelModal from '@/components/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        data: {},
      },
      isNew: true,
      isLoading: false,
    };
  },
  components: {
    PaginationComponent,
    ProductModal,
    // DelModal,
  },
  methods: {
    // 取得產品
    getProducts(page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.axios.get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          this.isLoading = false;
          this.products = products;
          this.pagination = pagination;
          toast.success('成功取得產品');
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
    // open bs modal 代值判斷傳入是哪一個
    openProductModal(status, item) {
      if (status === 'createNew') {
        this.isNew = true;
        this.tempProduct.data = {};
        this.openProductModalShow();
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempProduct.data = { ...item };
        this.openProductModalShow();
      }
    },
    // 接收tempProduct事件
    handleUpdateTempProduct(updatedData) {
      this.tempProduct = {
        ...this.tempProduct,
        data: { ...this.tempProduct.data, ...updatedData },
      };
    },

    // 刪除單一產品
    deleteProduct(item) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${item.id}`;
      Swal.fire({
        title: `確定要刪除<span class="text-danger">${item.title}</span>嗎?`,
        showDenyButton: true,
        confirmButtonText: '是，我要刪除',
        denyButtonText: '不要刪除',
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete(url)
            .then((response) => {
              toast.success(response.data.message);
              // this.$refs.delModal.hideModal();
              this.getProducts();
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        }
      });
    },

    // bsModal show
    openProductModalShow() {
      this.$refs.productModal.openModal();
    },
    openDelProductModalShow() {
      this.$refs.delModal.openModal();
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

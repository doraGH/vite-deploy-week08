<template>
  <VueLoading :active="isLoading" />
  <div class="container my-4">
    <h2>前台產品列表</h2>
    <div class="mt-4">
      <div class="row row-cols-5 my-4 g-4">
        <div class="col" v-for="item in products" :key="item.id">
          <div class="card">
            <img :src="item.imageUrl" class="card-img-top" alt="圖片">
            <div class="card-body">
              <h6 class="card-title">{{ item.title }}</h6>
              <p class="card-text">
                <del>原價 {{ item.origin_price }} 元</del> /
                <span>特價 {{ item.price }} 元</span>
              </p>
              <div class="btn-group btn-group-sm d-flex">
                <button type="button" class="btn btn-outline-secondary"
                :disabled="item.id === loadItem"
                @click.prevent="fetchProductItem(item.id)">
                <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse
                v-if="item.id === loadItem" />
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger"
                :disabled="item.id === status.loadCart"
                @click.prevent="addCart(item.id)">
                <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse
                v-if="item.id === status.loadCart" />
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="getProducts"></PaginationComponent>
  </div>
  <ShowProductModal ref="modal" />
</template>

<script>
import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import ShowProductModal from '../../components/ShowProductModal.vue';
import PaginationComponent from '../../components/PaginationComponent.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    ShowProductModal,
    PaginationComponent,
  },
  computed: {
    ...mapState(productStore, ['products', 'pagination', 'loadItem', 'isLoading']),
    ...mapState(cartStore, ['cartList', 'status']),
  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'getProductItem']),
    ...mapActions(cartStore, ['addCart', 'getCarts']),

    // 點擊呼叫單一產品 api
    fetchProductItem(productId) {
      this.$refs.modal.openModal();
      this.getProductItem(productId);
    },
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
};
</script>

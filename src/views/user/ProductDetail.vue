<template>
  <VueLoading :active="isLoading" />
  <div class="container g-wrapper">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <!-- 麵包屑 -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white">
              <li class="breadcrumb-item">
                <RouterLink to="/">首頁</RouterLink>
              </li>
              <li class="breadcrumb-item">
                <RouterLink to="/products">全部商品</RouterLink>
              </li>
              <li class="breadcrumb-item active text-brown"
                  aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
          <div class="row my-5">
            <div class="col-md-5">
              <div class="procard__detail">
                <div class="procard__detail-image">
                  <img :src="product.imageUrl" alt="圖片">
                </div>
              </div>
            </div>
            <div class="col-md-6 offset-md-1">
              <span class="badge rounded-pill bg-primary mb-3">{{ product.category }}</span>
              <h2 class="font-weight-bold text-brown">
                {{ product.title }}
              </h2>
              <p class="lh-base">{{ product.description }}</p>
              <div class="d-flex flex-column align-items-end mb-4">
                <p class="mb-0 text-muted text-right"><del>NT$ {{ product.origin_price}}</del></p>
                <p class="mb-0 h5 font-weight-bold text-right">
                  NT ${{ product.price }} / {{ product.unit }}
                </p>
              </div>
              <div class="d-flex">
                <div class="w-50 me-3">
                  <div class="btn-group border qty-counter">
                    <button type="button" class="btn btn-outline-primary btn-sm"
                    @click="updateQty('decrement')">-</button>

                    <input type="number" class="form-control rounded-0"
                    readonly v-model.number="qty" />

                    <button type="button" class="btn btn-outline-primary btn-sm"
                    @click="updateQty('increment', product.num)">+</button>
                  </div>

                </div>
                <button type="button"
                  class="btn btn-primary w-50"
                  @click.prevent="addCart(product.id, qty)"
                  :disabled="product.id === status.loadCart">
                  <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse
                  v-if="product.id === status.loadCart" />
                  加到購物車
                </button>
              </div>
            </div>
          </div>
          <hr>
          <h5 class="font-weight-bold mt-4">相關商品</h5>
          <RelateProducts :product="product" @update="getDetailProduct" />
        </div>
      </div>
    </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import productStore from '@/stores/productStore';
import RelateProducts from '@/components/RelateProducts.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    RelateProducts,
  },
  data() {
    return {
      product: {},
      qty: 1,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(productStore, ['products']),
    ...mapState(cartStore, ['cartList', 'status']),
  },
  methods: {
    ...mapActions(cartStore, ['addCart']),
    // 取得單一產品
    getDetailProduct(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/product/${id}`;
      this.isLoading = true;
      this.axios.get(url)
        .then((response) => {
          const { product } = response.data;
          this.isLoading = false;
          this.product = product;
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          // 關閉 loading
          this.isLoading = false;
        });
    },
    // 計算數量的遞減與遞增
    updateQty(action, num = 1) {
      const minQty = 1;
      const maxQty = num;

      if (action === 'decrement') {
        if (this.qty > minQty) {
          this.qty -= 1;
        }
      } else if (action === 'increment') {
        if (this.qty < maxQty) {
          this.qty += 1;
        }
      }
    },

  },
  created() {
    // 在created 重新獲取產品ID，可以確保在元件創建後立即加載相關的產品詳細信息,包含圖片更新
    const { id } = this.$route.params;
    this.getDetailProduct(id);
  },
};
</script>

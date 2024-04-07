<template>
  <VueLoading :active="isLoading" />
  <div class="container g-wrapper">
    <h2 class="text-center">美味菜單</h2>
    <!-- 分類:電腦版 -->
    <div class="d-none d-md-block">
      <ul class="d-flex justify-content-center my-3 product-menu ">
        <li class="rounded-pill" :class="{active: isActive('/products')}">
          <RouterLink :to="`/products`">全部</RouterLink>
        </li>
        <li class="rounded-pill" v-for="item in categories" :key="item"
        :class="{active: isActive(`/products?category=${item}`)}">
          <RouterLink :to="`/products?category=${item}`">{{ item }}</RouterLink>
        </li>
      </ul>
    </div>
    <!-- 分類:手機版 -->
    <div class="d-md-none">
      <select class="form-select" aria-label="Default select example"
      @change="handleCategoryChange">
        <option value="all" :selected="isActive(`/products`)">全部</option>
        <option v-for="item in categories" :key="item"
        :value="item" :selected="isActive(`/products?category=${item}`)">{{ item }}</option>
      </select>
    </div>

    <div class="mt-4">
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 my-4 g-4">
        <div class="col" v-for="item in products" :key="item.id">
          <div class="procard">
            <div class="procard-image">
              <RouterLink :to="`/product-view/${item.id}`">
                <img :src="item.imageUrl" alt="圖片">
              </RouterLink>
            </div>
            <div class="procard-text">
              <div class="tibox">{{ item.title }}</div>
              <p class="card-text">
                <del>原價 {{ item.origin_price }} 元</del> /
                <span>特價 {{ item.price }} 元</span>
              </p>
              <div class="btn-group btn-group-sm d-flex">
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
    <PaginationComponent :pages="pagination" @change-page="changePage"></PaginationComponent>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import PaginationComponent from '../../components/PaginationComponent.vue';

export default {
  data() {
    return {
      categories: ['冰品', '甜點', '飲品'],
    };
  },
  components: {
    PaginationComponent,
  },
  computed: {
    ...mapState(productStore, ['products', 'pagination', 'loadItem', 'isLoading']),
    ...mapState(cartStore, ['cartList', 'status']),

  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'getProductItem']),
    ...mapActions(cartStore, ['addCart', 'getCarts']),

    // 取用getProducts方法並傳入category
    fetchProducts() {
      this.getProducts(this.$route.query.category);
    },
    // 切換頁面時,將分類及page重新代入
    changePage(page) {
      const category = this.$route.query.category || '';
      this.getProducts(category, page);
      if (category === '') {
        this.$router.push('/products');
      } else {
        this.$router.push(`/products?category=${category}`);
      }
    },
    // 路由切換動態移除新增class,判斷目前路由是否與指定路由相符
    isActive(route) {
      return this.$route.fullPath === route;
    },
    // 下拉選單切換邏輯
    handleCategoryChange(event) {
      const category = event.target.value;
      if (category === 'all') {
        this.$router.push('/products');
      } else {
        this.$router.push(`/products?category=${category}`);
      }
    },
  },
  watch: {
    // 監聽路由切換時產品,同步更新畫面
    '$route.query': {
      handler() {
        this.fetchProducts();
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchProducts();
    this.getCarts();
  },
};
</script>
<style lang="scss" scoped>
.product-menu {
  list-style: none;
  padding-left: 0;
  li {
    min-width: 120px;
    background-color: #f5f5f5;
    margin: 0px 5px;
    text-align: center;
    a {
      color: #333;
      padding: 10px 20px;
      text-decoration: none;
      display: block;
    }
    &.active {
      background-color: #EFA2A2;
      a {
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="offcanvas offcanvas-end right-cart" tabindex="-1" ref="cartModal"
  id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">您的購物車</h5>
      <button type="button" class="btn-close text-reset"
      data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-3">
      <div class="flex-column mb-auto">
        <div class="cart-box" v-for="item in carts" :key="item.id">
          <div class="cart-image"><img class="img-cart" :src="item.product.imageUrl" alt=""></div>
          <div class="cart-desc">
            <div class="title">{{ item.product.title }}</div>
            <div class="pric">${{ item.product.price }}</div>
            <a href="#" class="cart-remove"
              :disabled="item.id === status.loadQty"
              @click.prevent="$emit('remove-cart', item.id)">
              remove
            </a>
          </div>
          <div class="qty">
            <input min="1" type="number" class="form-control" v-model.number="item.qty"
              @blur="$emit('update-cart', item)">
          </div>
        </div>
      </div>
    </div>
    <div class="cart-foot">
      <div class="total">
        <p>小計：</p>
        <p>NT$ <span>{{ total }}</span></p>
      </div>
      <button type="button" class="btn btn-primary"
      data-bs-dismiss="offcanvas"
      v-if="cartsLength > 0"
      @click="goToCart"
      >前往結帳</button>
      <button type="button" v-else
      data-bs-dismiss="offcanvas"
      class="btn btn-secondary text-white w-100"
      @click="goToShop">
          繼續購物</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['status', 'carts', 'total', 'cartsLength'],
  emits: ['remove-cart', 'update-cart'],
  methods: {
    goToCart() {
      this.$router.push('/cart');
    },
    goToShop() {
      this.$router.push('/products');
    },
  },
};
</script>

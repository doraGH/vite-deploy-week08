<template>
  <div class="offcanvas offcanvas-end right-cart" ref="cartModal"
  tabindex="-1" id="offcanvasExample">
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title">您的購物車</h5>
      <button type="button" class="btn-close text-reset"
      data-bs-dismiss="offcanvas" aria-label="Close"
      ></button>
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
      <RouterLink to="/cart" class="btn btn-primary"
      @click="hideModal"
      >繼續結帳</RouterLink>
    </div>
  </div>

  <!-- 遮罩层 -->
  <div v-if="showBackdrop" class="offcanvas-backdrop fade show"></div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas';

export default {
  data() {
    return {
      bsOffcanvas: null,
      showBackdrop: false,
    };
  },
  props: ['status', 'carts', 'total'],
  emits: ['remove-cart', 'update-cart'],
  methods: {
    openModal() {
      this.showBackdrop = true;
      this.bsOffcanvas.show();
    },
    hideModal() {
      this.showBackdrop = false;
      this.bsOffcanvas.hide();
    },
  },
  mounted() {
    this.bsOffcanvas = new Offcanvas(this.$refs.cartModal);
  },
};
</script>

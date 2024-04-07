<template>
  <VueLoading :active="isLoading" />
  <div class="container g-wrapper">
    <div class="row d-flex justify-content-between align-items-center border-bottom py-4 my-5">
      <h2 class="cart-title col-12 col-md-2">購物車</h2>
      <!-- 流程 -->
      <div class="cart-step col-12 col-md-10">
        <div class="box current">
          <span class="deco">STEP1</span>購物車
        </div>
        <div class="box">
          <span class="deco">STEP2</span>訂購資訊
        </div>
        <div class="box">
          <span class="deco">STEP3</span>確認付款
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-7">
        <!-- 購物車 -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5>購物清單</h5>
          <button class="btn btn-outline-danger"
          type="button"
          :class="{'disabled': cartsLengthComputed === 0}"
          @click="deleteAllCarts">清空購物車</button>
        </div>
        <div v-if="this.cartList.carts && this.cartList.carts.length > 0">
          <table class="table align-middle">
            <thead class="table-dark">
              <tr>
                <th></th>
                <th>圖片</th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th class="text-end">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartList.carts" :key="item.id">
                <td>
                  <button type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="item.id === status.loadQty"
                  @click="removeCartItem(item.id)">
                  <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse
                  v-if="item.id === status.loadQty" />
                    x
                  </button>
                </td>
                <td><img class="img-cart" :src="item.product.imageUrl" alt=""></td>
                <td>
                  {{ item.product.title }}
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group">
                      <input min="1" type="number" class="form-control" v-model.number="item.qty"
                        @blur="updateCart(item)">
                      <span class="input-group-text" id="basic-addon2">
                        {{ item.product.unit }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  {{ item.product.price }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="bg-light my-4 p-4">購物車沒有任何品項</div>
      </div>
      <div class="col-12 col-lg-5 p-lg-5">
        <div class="bg-light my-4 p-4">
          <div class="border-bottom border-dark">
            <div class="d-flex justify-content-between">
              <p>小計：</p>
              <p>NT$ <span class="text-notoSans">{{ cartList.total }}</span></p>
            </div>
            <div class="d-flex justify-content-between mb-4">
              <p class="text-nowrap">優惠碼：</p>
              <div class="d-flex justify-content-end">
                <input type="text" class="form-control w-50 border-gray" v-model="couponCode">
                <button class="btn btn-secondary text-light ms-8" type="button"
                :class="{'disabled': couponCode === ''}"
                @click="useCoupon">套用</button>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <p class="fw-bold">合計：</p>
            <p class="fw-bold text-end">
              NT$ <span class="text-notoSans fs-4">
              {{ Math.round(cartList.final_total) }}</span>

              <span class="d-flex text-danger"
              v-if="cartList.carts && cartList.carts.length > 0
              && cartList.carts[0].coupon">
              (已使用{{ cartList.carts[0].coupon.title }})</span>
            </p>
          </div>
          <RouterLink to="/cartcheck"
          class="btn btn-primary text-white w-100"
          v-if="cartsLengthComputed > 0">下一步</RouterLink>
          <RouterLink to="/products" v-else class="btn btn-secondary text-white w-100">
            前往購物</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import sweetAlertMixin from '@/mixins/sweetAlertMixin';
import { mapActions, mapState } from 'pinia';

import cartStore from '@/stores/cartStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  mixins: [sweetAlertMixin],
  data() {
    return {
      couponCode: '',
    };
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'status', 'isLoading', 'cartsLengthComputed', 'finalPrice']),
  },
  methods: {
    ...mapActions(cartStore, [
      'getCarts',
      'deleteAllCarts',
      'removeCartItem',
      'updateCart',
    ]),

    // 使用優惠卷
    useCoupon() {
      const url = `${VITE_URL}/api/${VITE_PATH}/coupon`;
      const coupon = {
        code: this.couponCode,
      };

      const totalPrice = this.cartList.total; // 獲取總價
      if (totalPrice >= 500) {
        this.axios.post(url, { data: coupon })
          .then((response) => {
            toast.success(response.data.message);
            this.couponCode = '';
            this.getCarts();
          })
          .catch((error) => {
            this.errorAlert(error.response.data.message);
            this.couponCode = '';
          });
      } else {
        // 不使用優惠卷
        this.warningAlert('總額不足500元,不能使用喔!');
        this.couponCode = '';
      }
    },
  },
  mounted() {
    this.getCarts();
    this.cartsLength = this.cartsLengthComputed; // 賦值
  },
};
</script>

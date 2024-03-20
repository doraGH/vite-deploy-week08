<template>
  <VueLoading :active="isLoading" />
  <div class="container g-wrapper">
    <h2 class="border-bottom py-4 my-5">購物車</h2>
    <div class="row">
      <div class="col-12 col-lg-5">
        <!-- 購物車 -->
        <h5>購物清單</h5>
        <div class="p-4">
          <div v-if="this.cartList.carts && this.cartList.carts.length > 0">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>圖片</th>
                  <th>品名</th>
                  <th style="width: 150px">數量/單位</th>
                  <th class="text-end">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartList.carts" :key="item.id">
                  <td><img class="img-cart" :src="item.product.imageUrl" alt=""></td>
                  <td>
                    {{ item.product.title }}
                  </td>
                  <td>
                    {{ item.qty }} / {{ item.product.unit }}
                  </td>
                  <td class="text-end">
                    {{ item.final_total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="bg-light p-4">購物車沒有任何品項</div>
        </div>

        <div class="p-4">
          <div class="mb-4">
            <div class="border-bottom border-dark">
              <div class="d-flex justify-content-between">
                <p>小計：</p>
                <p>NT$ <span class="text-notoSans">{{ cartList.final_total }}</span></p>
              </div>
              <div class="d-flex justify-content-between">
                <p>運費：</p>
                <p>NT$ <span class="text-notoSans">0</span></p>
              </div>
              <div class="d-flex justify-content-between mb-4"
              v-if="cartList && cartList.carts && cartList.carts.length > 0
        && cartList.carts[0].coupon">
                <p class="text-nowrap">優惠碼：</p>
                <p>NT$ <span class="text-notoSans">{{ cartList.carts[0].coupon.percent }}</span></p>
              </div>
            </div>
            <div class="d-flex justify-content-between my-3">
              <p class="fw-bold">合計：</p>
              <p class="fw-bold text-end">
                NT$ <span class="text-notoSans fs-4">
                {{ finalPrice }}</span>
                <span class="d-flex text-danger"
                v-if="this.cartList.carts && this.cartList.carts.length > 0
                && this.cartList.carts[0].coupon">
                (已使用{{ this.cartList.carts[0].coupon.title }})</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-7 bg-light p-3">
        <h5>聯絡資訊</h5>
        <!-- 驗證表單 -->
        <VForm @submit="createOrder" ref="form" v-slot="{ errors }">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VField type="email" class="form-control" id="email" name="email"
              placeholder="請輸入Email"
              :class="{'is-invalid':errors['email']}"
              rules="email|required"
              v-model="form.data.user.email" />
            <ErrorMessage class="invalid-feedback" name="email" />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VField type="text" class="form-control" id="name" name="姓名" placeholder="請輸入姓名"
              :class="{'is-invalid':errors['姓名']}"
              rules="required"
              v-model="form.data.user.name" />
            <ErrorMessage class="invalid-feedback" name="姓名" />
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField type="text" class="form-control" id="tel" name="tel"
            placeholder="請輸入電話: 09xxxxxxxxx"
              :class="{'is-invalid':errors['tel']}"
              :rules="isPhone"
              v-model="form.data.user.tel" />
            <ErrorMessage class="invalid-feedback" name="tel" />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField type="text"
              class="form-control"
              id="address"
              name="地址"
              placeholder="請輸入地址"
              :class="{'is-invalid':errors['地址']}"
              rules="required"
              v-model="form.data.user.address" />
            <ErrorMessage class="invalid-feedback" name="地址" />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="message" id="message" class="form-control" cols="30" rows="5"
            v-model="form.data.message"></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary text-white px-5">送出訂單</button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';
import { mapActions, mapState } from 'pinia';

import cartStore from '@/stores/cartStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      form: {
        data: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
      },
    };
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'finalPrice']),
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),

    // 驗證手機
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    // 送出訂單
    createOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/order`;
      const { form } = this;
      if (this.cartList.length === 0) {
        return;
      }
      this.axios
        .post(url, form)
        .then((response) => {
          toast.success(response.data.message);
          this.$refs.form.resetForm();
          this.form.data.message = '';
          this.getCarts();
          this.$router.push(`/payment/${response.data.orderId}`);
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>

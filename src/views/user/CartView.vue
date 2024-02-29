<template>
  <VueLoading :active="isLoading" />
  <div class="container my-4">
    <h2>購物車</h2>
    <div class="row">
      <div class="col-7">
        <!-- 購物車 -->
        <div class="text-end">
          <button class="btn btn-outline-danger"
          type="button"
          :class="{'disabled': cartList.carts.length === 0}"
          @click="deleteAllCarts">清空購物車</button>
        </div>
        <div v-if="cartList.carts && cartList.carts.length > 0" class="bg-light my-4 p-4">
          <table class="table align-middle">
            <thead>
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
                    <div class="input-group mb-3">
                      <input min="1" type="number" class="form-control" v-model.number="item.qty"
                        @blur="updateCart(item)">
                      <span class="input-group-text" id="basic-addon2">
                        {{ item.product.unit }}</span>
                    </div>
                  </div>

                  <!-- <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <button type="button"
                        class="btn btn-outline-primary btn-sm"
                        :disabled="item.qty === 1"
                        v-if="item.qty > 1"
                        @click="item.qty--;updateCart(item, item.qty)">
                        -
                      </button>

                      <button type="button"
                        class="btn btn-outline-danger btn-sm"
                        v-else
                        @click="removeCartItem(item.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6
                          6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1
                          0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0
                          1-2-2V4h-.5a1 1 0 0 1-1-1V2a1
                          1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4
                          4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                      </button>

                      <input min="1" type="number" class="form-control" v-model.number="item.qty"
                        :disabled="item.id === status.loadQty" readonly>

                      <button type="button" class="btn btn-outline-primary btn-sm"
                      :disabled="item.qty === 20"
                      @click="item.qty++;updateCart(item, item.qty)">
                        +
                      </button>

                    </div>
                  </div> -->
                </td>
                <td class="text-end">
                  {{ item.final_total }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="text-end">總計</td>
                <td class="text-end">{{ cartList.total }}</td>
              </tr>
              <tr>
                <td colspan="4" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ cartList.final_total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-else class="bg-light my-4 p-4">購物車沒有任何品項</div>
      </div>
      <div class="col-5">
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
            <VField type="text" class="form-control" id="name" name="name" placeholder="請輸入姓名"
              :class="{'is-invalid':errors['name']}"
              rules="required"
              v-model="form.data.user.name" />
            <ErrorMessage class="invalid-feedback" name="name" />
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
              name="address"
              placeholder="請輸入地址"
              :class="{'is-invalid':errors['address']}"
              rules="required"
              v-model="form.data.user.address" />
            <ErrorMessage class="invalid-feedback" name="address" />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="message" id="message" class="form-control" cols="30" rows="5"
            v-model="form.data.message"></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </VForm>
      </div>
    </div>

  </div>
</template>

<script>
// import axios from 'axios';
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
    ...mapState(cartStore, ['cartList', 'status', 'isLoading']),
  },

  methods: {
    ...mapActions(cartStore, [
      'getCarts',
      'deleteAllCarts',
      'removeCartItem',
      'updateCart',
    ]),

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
          Swal.fire(response.data.message);
          this.$refs.form.resetForm();
          this.form.data.message = '';
          this.getCarts();
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

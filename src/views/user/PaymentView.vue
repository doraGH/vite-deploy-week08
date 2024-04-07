<template>
  <VueLoading :active="isLoading" />
  <div class="container g-wrapper">
    <div class="row d-flex justify-content-between align-items-center border-bottom py-4 my-5">
      <h2 class="cart-title col-12 col-md-2">購物車</h2>
      <!-- 流程 -->
      <div class="cart-step col-12 col-md-10">
        <div class="box">
          <span class="deco">STEP1</span>購物車
        </div>
        <div class="box">
          <span class="deco">STEP2</span>訂購資訊
        </div>
        <div class="box current">
          <span class="deco">STEP3</span>確認付款
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-6">
        <h5>訂單詳細資訊</h5>
        <div class="bg-light my-4 p-4">
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">訂單編號</th>
                <td>{{ order.id}}</td>
              </tr>
              <tr>
                <th scope="row">訂購日期</th>
                <td>{{ formatDate(order.create_at) }}</td>
              </tr>
              <tr>
                <th scope="row">是否付款</th>
                <td>
                  <span :class="{'text-success': order.is_paid}">
              {{ order.is_paid ? '已付款' : '未付款'}}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">收件人姓名</th>
                <td>{{ user.name}}</td>
              </tr>
              <tr>
                <th scope="row">收件人電話</th>
                <td>{{ user.tel }}</td>
              </tr>
              <tr>
                <th scope="row">收件人Email</th>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <th scope="row">收件人地址</th>
                <td>{{ user.address }}</td>
              </tr>
              <tr>
                <th scope="row">收件人留言</th>
                <td>{{ order.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <h5 class="mb-3">訂單明細</h5>
        <table class="table align-middle">
          <thead class="table-dark">
            <tr>
              <th>圖片</th>
              <th>品名</th>
              <th>數量/單位</th>
              <th class="text-end">價格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td><img class="img-cart" :src="item.product.imageUrl" alt=""></td>
              <td>
                {{ item.product.title }}
              </td>
              <td> {{ item.qty }} / {{ item.product.unit }}</td>
              <td class="text-end">
                {{ item.total }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="my-4">
          <div class="border-bottom border-dark">
            <div class="d-flex justify-content-between">
              <p>商品總計：</p>
              <p>NT$ <span class="text-notoSans">
                {{ originPrice }}</span></p>
            </div>
            <div class="d-flex justify-content-between">
              <p>優惠卷折扣：</p>
              <p>NT$ <span class="text-notoSans">
                {{ Math.floor(originPrice - order.total) }}</span></p>
            </div>
          </div>
          <div class="d-flex justify-content-between my-3">
            <p class="fw-bold">合計：</p>
            <p class="fw-bold text-end text-primary">
              NT$ <span class="text-notoSans fs-4">
                {{ Math.round(order.total) }}</span></p>
          </div>
        </div>
        <!-- 信用卡資訊 -->
        <CreditCard ref="creditCard" @pay-item="getPay(order.id)"></CreditCard>

      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import sweetAlertMixin from '@/mixins/sweetAlertMixin';
import CreditCard from '@/components/CreditCard.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  mixins: [sweetAlertMixin],
  data() {
    return {
      order: {},
      products: {},
      user: {},
      originPrice: 0,
      isLoading: false,
    };
  },
  components: {
    CreditCard,
  },
  methods: {
    // 取得單一訂單資訊
    getOrder(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/order/${id}`;
      this.isLoading = true;
      this.axios.get(url)
        .then((response) => {
          const { order } = response.data;
          const { products, user } = order;
          this.isLoading = false;
          this.order = order;
          this.products = products;
          this.user = user;

          // 遍歷產品物件，找到目標產品ID
          Object.keys(products).forEach((productId) => {
            const product = products[productId];
            this.originPrice += product.total;
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // 付款
    getPay(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${id}`;
      this.isLoading = true;
      this.axios.post(url)
        .then((response) => {
          this.isLoading = false;
          toast.success(response.data.message);
          this.getOrder(id);
          this.$router.push('/orderfinish');
        })
        .catch((error) => {
          this.errorAlert(error.response.data.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      return getTime.toLocaleDateString();
    },
  },
  created() {
    // 在created 重新獲取產品ID，可以確保在元件創建後立即加載相關的產品詳細信息,包含圖片更新
    const { id } = this.$route.params;
    this.getOrder(id);
  },
};
</script>

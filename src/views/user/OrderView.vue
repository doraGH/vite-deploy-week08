<template>
  <VueLoading :active="isLoading" />
  <div class="container g-wrapper">
    <h2 class="border-bottom py-4 my-5">結帳付款</h2>
    <div class="row">
      <div class="col-12 col-lg-7">
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
                <td>{{ order.create_at}}</td>
              </tr>
              <tr>
                <th scope="row">是否付款</th>
                <td>{{ order.is_paid}}</td>
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
      <div class="col-12 col-lg-5">
        <h5>購買明細</h5>
        <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>品名</th>
                <th>數量</th>
                <th class="text-end">價格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td><img class="img-cart" :src="item.product.imageUrl" alt=""></td>
                <td>
                  {{ item.product.title }}
                </td>
                <td>{{ item.qty }}</td>
                <td class="text-end">
                  {{ item.final_total }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end text-primary"><h2>{{ order.total }}</h2></td>
              </tr>
            </tfoot>
          </table>
          <div class="text-end">
            <button type="submit" class="btn btn-primary text-white"
            @click.prevent="getPay(order.id)">我要結帳</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      order: {},
      products: {},
      user: {},
      isLoading: false,
    };
  },
  methods: {
    // 取得單一訂單資訊
    getOrder(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/order/${id}`;
      this.isLoading = true;
      this.axios.get(url)
        .then((response) => {
          const { order } = response.data;
          const { products, user } = response.data.order;
          this.isLoading = false;
          this.order = order;
          this.products = products;
          this.user = user;
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          // 關閉 loading
          this.isLoading = false;
        });
    },
    // 付款
    getPay(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${id}`;
      this.isLoading = true;
      this.axios.post(url)
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          Swal.fire(response.data.message);
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        })
        .finally(() => {
          // 關閉 loading
          this.isLoading = false;
        });
    },
  },
  created() {
    // 在created 重新獲取產品ID，可以確保在元件創建後立即加載相關的產品詳細信息,包含圖片更新
    const { id } = this.$route.params;
    this.getOrder(id);
  },
};
</script>

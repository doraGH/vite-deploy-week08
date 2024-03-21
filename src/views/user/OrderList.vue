<template>
  <VueLoading :active="isLoading" />
  <div class="container g-wrapper">
    <h2 class="text-center">查詢訂單</h2>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>訂單號碼</th>
          <th>訂購日期</th>
          <th>消費金額</th>
          <th>付款狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ formatDate(item.create_at) }}</td>
          <td>NT ${{ item.total }}</td>
          <td>
            <span :class="{'text-primary': !item.is_paid}">
              {{ item.is_paid ? '已付款' : '未付款'}}</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-secondary btn-sm">
                查看訂單
              </button>

              <button v-if="item.is_paid === true"
              type="button" class="btn btn-outline-secondary btn-sm disabled">
                完成付款
              </button>
              <button v-else type="button" class="btn btn-outline-primary btn-sm"
              @click.prevent="openPayModal(item)">
                直接付款
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="changePage"></PaginationComponent>

    <!-- Modal 付款彈跳視窗 -->
    <PayModal
      ref="payModal"
      :item="tempOrder"
      @del-item="getPay2(tempOrder.data.id)"></PayModal>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';
import PaginationComponent from '@/components/PaginationComponent.vue';
import PayModal from '@/components/PayModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {
        data: {},
      },
      isLoading: false,
    };
  },
  components: {
    PaginationComponent,
    PayModal,
  },
  methods: {
    // 取得所有訂單
    getAllOrders(page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/orders?page=${page}`;
      this.isLoading = true;
      this.axios.get(url)
        .then((response) => {
          const { orders, pagination } = response.data;
          this.isLoading = false;
          this.orders = orders;
          this.pagination = pagination;
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        });
    },
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
          // 關閉 loading
          this.isLoading = false;
        });
    },
    // 付款1
    getPay(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${id}`;
      Swal.fire({
        title: '確定要直接結帳嗎?',
        showDenyButton: true,
        confirmButtonText: '是，我要結帳',
        denyButtonText: '不要結帳',
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.post(url)
            .then((response) => {
              toast.success(response.data.message);
              this.getAllOrders();
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        }
      });
    },
    // 開起付款視窗
    openPayModal(item) {
      this.tempOrder.data = { ...item };
      this.$refs.payModal.openModal();
    },
    // 付款2
    getPay2(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/pay/${id}`;
      this.axios.post(url)
        .then((response) => {
          this.$refs.payModal.hideModal();
          toast.success(response.data.message);
          this.getAllOrders();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },

    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      return getTime.toLocaleDateString();
    },
    // 切換頁面
    changePage(page) {
      this.getAllOrders(page);
      this.$router.push(`/orderlist?page=${page}`);
    },
  },
  mounted() {
    this.getAllOrders();
  },
};
</script>

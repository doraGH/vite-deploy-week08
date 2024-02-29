<template>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="d-flex justify-content-between mt-4">
      <h2>訂單列表</h2>
      <div class="text-end">
      <button class="btn btn-outline-danger" type="button"
      :class="{'disabled': orders.length === 0}"
      @click="delAllOrder">清空訂單</button>
      </div>
    </div>

    <table class="table align-middle">
      <thead>
        <tr>
          <th>訂單日期</th>
          <th>訂單編號</th>
          <th>訂單總金額</th>
          <th>付款狀態</th>
          <th>查看訂單</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr>
            <td>{{ formatDate(item.create_at) }}</td>
            <td>{{ item.id }}</td>
            <td>NT$ {{ item.total }}</td>
            <td>
              <span :class="{'text-success': item.is_paid}">
              {{ item.is_paid ? '已付款' : '未付款' }}</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click.prevent="openOrderModal('edit', item)">
                <font-awesome-icon :icon="['fas', 'eye']" /> 修改
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click.prevent="delOneOrder(item.id)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="getOrders"></PaginationComponent>
  </div>

  <!-- 新增修改視窗 -->
  <OrderModal
    ref="orderModal"
    :temp-order="tempOrder"
    @update-order="getOrders">
  </OrderModal>

  <!-- Modal 刪除彈跳視窗 -->
  <!-- <DelModal
  ref="delModal"
  :item="tempOrder"
  @del-item="delOneOrder"></DelModal> -->
</template>

<script>
import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';

import PaginationComponent from '@/components/PaginationComponent.vue';
import OrderModal from '@/components/OrderModal.vue';
// import DelModal from '@/components/DelModal.vue';

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
    OrderModal,
    // DelModal,
  },
  methods: {
    // 取得訂單
    getOrders(page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.axios
        .get(url)
        .then((response) => {
          const { orders, pagination } = response.data;
          this.isLoading = false;
          this.orders = orders;
          this.pagination = pagination;
          toast.success('成功取得訂單');
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      // const thisTime = `${getTime.getFullYear()}/${getTime.getMonth() + 1}/${getTime.getDate()}`;
      // return `${thisTime}`;
      return getTime.toLocaleDateString();
    },
    // 取消單一訂單
    delOneOrder(id) {
      // const orderId = this.tempOrder.data.id;
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`;
      Swal.fire({
        title: '確定要刪除訂單嗎?',
        showDenyButton: true,
        confirmButtonText: '是，我要刪除',
        denyButtonText: '不要刪除',
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete(url, id).then((response) => {
              // this.$refs.delModal.hideModal();
              toast.success(response.data.message);
              this.getOrders();
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        }
      });
    },
    // 取消全部訂單
    delAllOrder() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders/all`;
      Swal.fire({
        title: '確定要清空<span class="text-danger">全部</span>訂單嗎?',
        showDenyButton: true,
        confirmButtonText: '是，我要刪除',
        denyButtonText: '不要刪除',
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete(url).then((response) => {
              toast.success(response.data.message);
              this.getOrders();
              Swal.fire('您已刪除全部訂單');
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        }
      });
    },
    // open bs modal 代值判斷傳入是哪一個
    openOrderModal(status, item) {
      if (status === 'edit') {
        this.tempOrder.data = { ...item };
        this.$refs.orderModal.openModal();
      } else if (status === 'delete') {
        this.tempOrder.data = { ...item };
        this.$refs.delModal.openModal();
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

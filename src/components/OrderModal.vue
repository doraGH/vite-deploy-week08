<template>
  <div
    class="modal fade"
    id="orderModal"
    ref="modal"
    tabindex="-1"
    aria-labelledby="orderModallLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h6>訂單內容</h6>
          <table class="table">
            <tbody>
              <tr>
                <th>訂單編號</th>
                <td>{{ tempOrder.data.id }}</td>
              </tr>
              <tr>
                <th>訂單日期</th>
                <td>{{ formatDate(tempOrder.data.create_at) }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <!-- <strong v-if="tempOrder.data.is_paid" class="text-success">已付款</strong>
                  <span v-else class="text-muted">尚未付款</span> -->
                  <div class="form-check">
                    <input class="form-check-input"
                    type="checkbox"
                    id="is_paid"
                    v-model="editOrder.data.is_paid" :true-value="true" :false-value="false" />
                    <label class="form-check-label" for="is_paid">
                      <!-- 是否付款 -->
                      <span v-if="tempOrder.data.is_paid" class="text-success">已付款</span>
                      <span v-else class="text-muted">未付款</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th>總金額</th>
                <td>
                  $ {{ tempOrder.data.total }}
                </td>
              </tr>
            </tbody>
          </table>

          <h6>選購商品</h6>
          <table class="table">
            <thead>
              <tr>
                <th>圖片</th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th class="text-end">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tempOrder.data.products" :key="item.id">
                <td><img class="img-cart" :src="item.product.imageUrl" alt=""></td>
                <td>{{ item.product.title }}</td>
                <td>
                  {{ item.qty }} / {{ item.product.unit }}
                </td>
                <td class="text-end">
                  $ {{ item.final_total }}
                </td>
              </tr>
            </tbody>
          </table>

          <h6>用戶資料</h6>
          <table class="table">
            <tbody v-if="tempOrder.data.user">
              <tr>
                <td>姓名</td>
                <td>{{ tempOrder.data.user.name }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ tempOrder.data.user.email }}</td>
              </tr>
              <tr>
                <td>電話</td>
                <td>{{ tempOrder.data.user.tel }}</td>
              </tr>
              <tr>
                <td>地址</td>
                <td>
                  <input id="address" type="text" class="form-control" placeholder="請輸入地址"
                v-model="editOrder.data.user.address">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary"
          @click.prevent="updateOrder">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
// import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['tempOrder', 'getOrders'],
  emit: ['edit-order'],
  mixins: [modalMixin],
  data() {
    return {
      editOrder: {
        data: {},
      }, // 有修改內容資料時向外傳遞使用
      // isPaid: false,
    };
  },
  mounted() {
    this.editOrder = this.tempOrder; // 傳參考
  },
  methods: {
    // 修改訂單
    updateOrder() {
      const orderId = this.editOrder.data.id;
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${orderId}`;
      this.axios
        .put(url, this.editOrder).then((response) => {
          toast.success(response.data.message);
          this.modal.hide();
          this.$emit('updateOrder');
        })
        .catch((error) => {
          const errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message.join('\n')
            : error.response.data.message;
          toast.error(errorMessage);
        });
    },
    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      return getTime.toLocaleDateString();
    },
  },
  watch: {
    // 監聽值是否有變化
    tempOrder() {
      this.editOrder = this.tempOrder;
    },
  },
};
</script>

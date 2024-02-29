<template>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="d-flex justify-content-between mt-4">
      <h2>優惠卷列表</h2>
      <button class="btn btn-primary" @click="openCouponModal('createNew')">
        建立新的優惠卷
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ formatDate(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
                @click.prevent="openCouponModal('edit', item)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click.prevent="delCoupon(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="getCoupons"></PaginationComponent>
  </div>
  <!-- 新增視窗 -->
  <CouponModal
    ref="couponModal"
    :is-new="isNew"
    :temp-coupon="tempCoupon"
    @update-coupon="updateCoupon">
  </CouponModal>

  <!-- Modal 刪除視窗 -->
  <DelModal
    ref="delModal"
    :item="tempCoupon"
    @del-item="delCoupon"></DelModal>
</template>

<script>
import Swal from 'sweetalert2';
import { toast } from 'vue3-toastify';

import PaginationComponent from '@/components/PaginationComponent.vue';
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {
        data: {},
      },
      isNew: true,
      isLoading: false,
      // 表單欄位對應表
      fieldTranslation: {
        title: '標題',
        percent: '折扣百分比',
        code: '優惠碼',
      },
    };
  },
  components: {
    PaginationComponent,
    CouponModal,
    DelModal,
  },
  methods: {
    // open bs modal
    openCouponModal(status, item) {
      if (status === 'createNew') {
        this.isNew = true;
        this.tempCoupon.data = {
          // due_date: Math.floor(new Date(this.due_date) / 1000),
          due_date: Math.floor(new Date().getTime() / 1000),
          is_enabled: 0,
        };
        this.$refs.couponModal.openModal();
        this.$refs.couponModal.setDueDate();
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempCoupon.data = { ...item };
        this.$refs.couponModal.openModal();
        this.$refs.couponModal.setDueDate();
      } else if (status === 'delete') {
        this.tempCoupon.data = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      return getTime.toLocaleDateString();
    },
    // 取得列表
    getCoupons(page = 1) {
      this.isLoading = true;
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons?page=${page}`;
      this.axios.get(url)
        .then((response) => {
          const { coupons, pagination } = response.data;
          this.coupons = coupons;
          this.pagination = pagination;
          this.isLoading = false;
          toast.success('成功取得優惠券');
        })
        .catch((error) => {
          this.isLoading = false;
          toast.error(error.response.data.message);
        });
    },
    // 更新優惠券
    updateCoupon(item) {
      this.isLoading = true;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`;
      let http = 'post';
      // 不是isNew
      if (!this.isNew) {
        url += `/${item.id}`;
        http = 'put';
      }

      this.axios[http](url, item)
        .then((response) => {
          this.isLoading = false;
          toast.success(response.data.message);
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        })
        .catch((error) => {
          this.isLoading = false;
          let errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message.join('\n')
            : error.response.data.message;

          // 使用對應表轉換錯誤訊息中的欄位名稱
          errorMessage = errorMessage.replace(/(\w+) 欄位/g, (match, p1) => `${this.fieldTranslation[p1] || p1} 欄位`);
          toast.error(errorMessage);
        });
    },
    // 刪除優惠券
    delCoupon(item) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${item.id}`;
      Swal.fire({
        title: `確定要刪除<span class="text-danger">${item.title}</span>嗎?`,
        showDenyButton: true,
        confirmButtonText: '是，我要刪除',
        denyButtonText: '不要刪除',
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(url)
            .then((response) => {
              // this.$refs.delModal.hideModal();
              this.getCoupons();
              toast.success(response.data.message);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        }
      });
    },
    // 獲取當前日期
    getCurrentDate() {
      const today = new Date(); // 當前時間戳記日期
      const year = today.getFullYear(); // 年份
      const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份
      const day = String(today.getDate()).padStart(2, '0'); // 日期
      return `${year}-${month}-${day}`; // 返回格式化日期字符串
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>

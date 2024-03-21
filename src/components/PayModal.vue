<template>
  <div class="modal fade" id="delModal" ref="modal" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>直接結帳</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">訂單編號</th>
                <td>{{ item.data.id }}</td>
              </tr>
              <tr>
                <th scope="row">訂購日期</th>
                <td>{{ item.data.create_at }}</td>
              </tr>
              <tr>
                <th scope="row">訂單總金額</th>
                <td>{{ item.data.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger"
          @click="$emit('del-item')">
            確認結帳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    item: Object,
  },
  emits: ['del-item'],
  mixins: [modalMixin],
};
</script>

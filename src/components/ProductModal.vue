<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input type="file" class="form-control" placeholder="請輸入圖片連結"
                  ref="fileInput"
                  @change="uploadImage">
                  <hr>
                  <input type="text" class="form-control"
                  id="image" v-model="editProduct.data.imageUrl" placeholder="請輸入圖片連結" />
                </div>
                <img class="img-fluid" :src="editProduct.data.imageUrl" alt="">
              </div>

              <h3 class="mb-3">多圖新增</h3>
              <template v-if="Array.isArray(editProduct.data.imagesUrl)">
                <div class="mb-2" v-for="(image, key) in editProduct.data.imagesUrl" :key="key">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結"
                    v-model="editProduct.data.imagesUrl[key]">
                  </div>
                  <img class="img-fluid" :src="image">
                </div>

                <div v-if="
                !editProduct.data.imagesUrl.length ||
                editProduct.data.imagesUrl[editProduct.data.imagesUrl.length -1]">
                  <button class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="editProduct.data.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="editProduct.data.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
              </template>
              <template v-else>
                <button class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages">
                  新增圖片
                </button>
              </template>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                v-model="editProduct.data.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control"
                  v-model="editProduct.data.category" placeholder="請輸入分類">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                  v-model="editProduct.data.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                  id="origin_price"
                  type="number" min="0" class="form-control" placeholder="請輸入原價"
                  v-model.number="editProduct.data.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control"
                  v-model.number="editProduct.data.price" placeholder="請輸入售價">
                </div>
              </div>

              <!-- 自定新增欄位 -->
              <div class="row">
                <div class="mb-3 col">
                  <label for="cost_price" class="form-label">成本價</label>
                  <input type="number" class="form-control" id="cost_price" placeholder="請輸入成本價"
                    v-model.number="editProduct.data.cost_price">
                </div>
                <div class="mb-3 col">
                  <label for="inventory" class="form-label">庫存量</label>
                  <input type="number" class="form-control" id="inventory" placeholder="請輸入庫存量"
                    v-model.number="editProduct.data.inventory">
                </div>
              </div>

              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control"
                v-model="editProduct.data.description" placeholder="請輸入產品描述">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="content" type="text" class="form-control"
                v-model="editProduct.data.content" placeholder="請輸入說明內容">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                  v-model="editProduct.data.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import sweetAlertMixin from '@/mixins/sweetAlertMixin';
import { toast } from 'vue3-toastify';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['isNew', 'tempProduct'],
  mixins: [modalMixin, sweetAlertMixin],
  data() {
    return {
      editProduct: {
        data: {},
      },
      // 表單欄位對應表
      fieldTranslation: {
        title: '標題',
        category: '分類',
        unit: '單位',
        origin_price: '原價',
        price: '價格',
      },
    };
  },
  mounted() {
    this.editProduct = this.tempProduct;
  },
  methods: {
    // 多圖區-新增產品
    createImages() {
      this.editProduct.data.imagesUrl = [];
      this.editProduct.data.imagesUrl.push('');
    },
    // 更新產品資料
    updateProduct() {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
      let http = 'post';

      // 不是isNew則為新增
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.editProduct.data.id}`;
        http = 'put';
      }

      this.axios[http](url, this.editProduct)
        .then((response) => {
          toast.success(response.data.message);
          this.modal.hide();
          this.$emit('updateProduct');
        })
        .catch((error) => {
          let errorMessage = Array.isArray(error.response.data.message)
            ? error.response.data.message.join('\n')
            : error.response.data.message;

          // 使用對應表轉換錯誤訊息中的欄位名稱
          errorMessage = errorMessage.replace(/(\w+) 欄位/g, (match, p1) => `${this.fieldTranslation[p1] || p1} 欄位`);
          this.infoAlert(errorMessage);
        });
    },
    // 上傳圖片
    uploadImage() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData(); // 產生一個form表單
      formData.append('file-to-upload', file); // 對應api 文件裡面表單的name, 並將檔案夾帶上去

      this.axios
        .post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData)
        .then((response) => {
          // 清除文件輸入的值
          this.$refs.fileInput.value = '';

          // 使用 $emit 發送修改後的值到外部
          this.$emit('update-temp-product', {
            imageUrl: response.data.imageUrl,
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message.message);
        });
    },
  },
  watch: {
    tempProduct() {
      this.editProduct = this.tempProduct;
    },
  },
};
</script>

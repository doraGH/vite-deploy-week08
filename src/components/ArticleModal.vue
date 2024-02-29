<template>
  <div
    id="articleModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="articleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="articleModalLabel" class="modal-title">
            <span v-if="isNew">新增文章</span>
            <span v-else>編輯文章</span>
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
              <div class="mb-3">
                <label for="title" class="from-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                v-model="editArticle.data.title" />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input id="image" type="text" class="form-control mb-1" placeholder="請輸入圖片連結"
                v-model="editArticle.data.imageUrl" />
                <img class="img-fluid" :src="editArticle.data.imageUrl" alt="">
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input id="author" type="text" class="form-control" placeholder="請輸入作者"
                v-model="editArticle.data.author" />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input id="create_at" type="date" class="form-control"
                v-model="create_at" />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <input type="text" id="tag"  class="form-control"
              v-model="newTag" @keyup.enter="addTag">
              <ul>
                <li v-for="(tag, index) in tags" :key="index">
                  {{ tag }}
                </li>
              </ul>
              <!-- <div class="row gx-1 mb-3">
                <div class="col-md-2 mb-1" v-for="(label, key) in editArticle.data.tag" :key="key">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control form-control"
                    id="tag" placeholder="請輸入標籤"
                    v-model="editArticle.data.tag[key]" />
                    <button type="button" class="btn btn-outline-danger"
                    @click="editArticle.data.tag.splice(key, 1)">
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-2 mb-1"
                v-if="editArticle.data.tag[editArticle.data.tag.length - 1] ||
                  !editArticle.data.tag.length">
                  <button class="btn btn-outline-primary btn-sm d-block w-100" type="button"
                  @click="editArticle.data.tag.push('')">
                    新增標籤
                  </button>
                </div>
              </div> -->
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea type="text" class="form-control" id="description"
                placeholder="請輸入文章描述" v-model="editArticle.data.description"></textarea>
              </div>
              <div class="mb-3">
                編輯器{{ editArticle.data }}
                <!-- 編輯器-->
                <!-- <label for="content" class="form-label">編輯器</label> -->
                <!-- <textarea type="text" class="form-control" id="content"
                placeholder="請輸入內容" v-model="editArticle.data.content"></textarea> -->
                <label for="content" class="form-label">文章內容</label>
                <ckeditor :editor="editor" :config="editorConfig"
                v-model="editArticle.data.content"></ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="isPublic"
                  v-model="editArticle.data.isPublic" :true-value="true" :false-value="false" />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary"
          @click="$emit('updateArticle', editArticle)">
            {{ isNew ? '新增貼文' :'更新貼文' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: ['isNew', 'tempArticle'],
  emits: ['updateArticle'],
  mixins: [modalMixin],
  data() {
    return {
      newTag: '',
      tags: [],
      editArticle: {
        data: {
          tag: [''],
        },
      },
      create_at: '', // 保存日期
      // CKEditor 編輯器
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link'],
      },
    };
  },
  mounted() {
    this.editArticle = this.tempArticle;
    this.setDueDate();
  },
  methods: {
    setDueDate() {
      if (this.isNew === true) {
        this.create_at = this.getCurrentDate();
      } else {
        // 將 Unix 時間戳轉換為 Date 物件
        const dueDate = new Date(this.tempArticle.data.create_at * 1000);
        // 格式化日期為年月日格式
        const year = dueDate.getFullYear();
        const month = String(dueDate.getMonth() + 1).padStart(2, '0');
        const day = String(dueDate.getDate()).padStart(2, '0');
        // 設置到期日欄位值
        this.create_at = `${year}-${month}-${day}`;
      }
    },
    getCurrentDate() {
      const today = new Date(); // 當前時間戳記日期
      const year = today.getFullYear(); // 年份
      const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份
      const day = String(today.getDate()).padStart(2, '0'); // 日期
      return `${year}-${month}-${day}`; // 返回格式化日期字符串
    },
    // add tag
    addTag() {
      console.log(this.tempArticle.data.tag);
      if (this.newTag.trim() !== '') {
        this.tags.push(this.newTag.trim());
        this.newTag = '';
      }
    },
  },
  watch: {
    // 處理父層日期資料
    tempArticle: {
      handler() {
        this.editArticle = this.tempArticle;
        const getTime = new Date(this.editArticle.data.create_at * 1000).toISOString().split('T');
        [this.create_at] = getTime;
      },
      deep: true,
    },
    // 將輸入的時間轉換格式
    create_at() {
      this.editArticle.data.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>

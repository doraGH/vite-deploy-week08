<template>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="d-flex justify-content-between mt-4">
      <h2>文章管理</h2>
      <button class="btn btn-primary" @click="openArticleModal('createNew')">
        建立文章
      </button>
      <!-- <RouterLink to="/admin/article/new" class="btn btn-dark">建立文章</RouterLink> -->
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>標題</th>
          <th width="120">作者</th>
          <th>描述</th>
          <th>建立時間</th>
          <th width="120" class="text-center">是否公開</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.description }}</td>
          <td>{{ formatDate(item.create_at) }}</td>
          <td class="text-center">
            <span v-if="item.isPublic === 1" class="text-success">公開</span>
            <span v-else class="text-muted">不公開</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
                @click.prevent="openArticleModal('edit', item)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click.prevent="openArticleModal('delete', item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination 分頁 -->
    <PaginationComponent :pages="pagination" @change-page="getArticles"></PaginationComponent>
  </div>
  <!-- 新增視窗 -->
  <ArticleModal
    ref="articleModal"
    :is-new="isNew"
    :temp-article="tempArticle"
    @update-article="updateArticle">
  </ArticleModal>

  <!-- Modal 刪除視窗 -->
  <DelModal
    ref="delModal"
    :item="tempArticle"
    @del-item="delArticle"></DelModal>
</template>

<script>
import { toast } from 'vue3-toastify';

import PaginationComponent from '@/components/PaginationComponent.vue';
import ArticleModal from '@/components/ArticleModal.vue';
import DelModal from '@/components/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    PaginationComponent,
    ArticleModal,
    DelModal,
  },
  data() {
    return {
      articles: [],
      pagination: {},
      tempArticle: {
        data: {},
      },
      isNew: true,
      isLoading: false,
      // 表單欄位對應表
      fieldTranslation: {
        title: '標題',
        author: '作者',
        content: '內容',
      },
    };
  },
  methods: {
    // open bs modal
    openArticleModal(status, item) {
      if (status === 'createNew') {
        this.isNew = true;
        this.tempArticle.data = {
          create_at: Math.floor(new Date().getTime() / 1000),
          isPublic: false,
        };
        this.$refs.articleModal.openModal();
        console.log(item);
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempArticle.data = { ...item };
        this.$refs.articleModal.openModal();
        console.log(item);
      } else if (status === 'delete') {
        this.tempArticle.data = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      return getTime.toLocaleDateString();
    },
    // 取得列表
    getArticles(page = 1) {
      this.isLoading = true;
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/articles?page=${page}`;
      this.axios.get(url)
        .then((response) => {
          // console.log(response);
          const { articles, pagination } = response.data;
          this.articles = articles;
          this.pagination = pagination;
          this.isLoading = false;
          toast.success('成功取得文章');
          console.log(articles);
        })
        .catch((error) => {
          this.isLoading = false;
          toast.error(error.response.data.message);
        });
    },
    // 更新
    updateArticle(item) {
      this.isLoading = true;
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`;
      let http = 'post';
      // 不是isNew=新的
      if (!this.isNew) {
        url += `/${item.id}`;
        http = 'put';
      }

      this.axios[http](url, item)
        .then((response) => {
          this.isLoading = false;
          toast.success(response.data.message);
          this.getArticles();
          this.$refs.articleModal.hideModal();
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
    // 刪除單一貼文
    delArticle() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.data.id}`;
      this.axios.delete(url)
        .then((response) => {
          this.$refs.delModal.hideModal();
          this.getArticles();
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>

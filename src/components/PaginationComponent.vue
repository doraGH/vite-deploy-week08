<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled': pages.current_page === 1}">
        <a class="page-link" aria-label="Previous"
          @click.prevent="changePage(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
      :class="{
        'active': item === pages.current_page
        }" v-for="(item, index) in pages.total_pages" :key="index">
        <a class="page-link" @click.prevent="changePage(item)">
          {{ item }}</a>
      </li>
      <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
        <a class="page-link" aria-label="Next"
          @click.prevent="changePage(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    changePage(num) {
      this.$emit('change-page', num);
    },
  },
};
</script>
<style>
.page-link {
  cursor: pointer;
}
</style>

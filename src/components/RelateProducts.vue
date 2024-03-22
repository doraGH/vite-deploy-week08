<template>
  <div class="iproducts">
    <div class="container">
      <div class="swiper-wrapper">
        <swiper ref="relateSwiper"
          :modules="modules"
          :slidesPerGroup="1"
          :slidesPerView="2"
          :spaceBetween="20"
          :loop="false"
          :autoplay="{ delay: 6000, disableOnInteraction: false }"
          :pagination="{
            el: '.custom-pagination', // 指定分頁元素
            clickable: true
            }"
          :breakpoints="{
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }"
          >
          <swiper-slide v-for="item in filteredItems" :key="item.id">
            <a href="#" @click.prevent="getDetail(item.id)"
            class="item_cont">
              <div class="item_cont-image">
                <img :src="item.imageUrl" alt="圖片">
              </div>
              <div class="item_cont-text">
                <div class="tibox">{{ item.title }}</div>
                ${{ item.price }}
              </div>
            </a>
          </swiper-slide>
        </swiper>
      </div>
      <div class="custom-pagination"></div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      related: [],
      modules: [Autoplay, Navigation, Pagination],
    };
  },
  props: {
    product: {
      type: Object,
    },
  },
  computed: {
    // 必需使用allProducts api,否則相關產品不會撈出全部產品
    // 如果使用 有分頁+分類的api 只會撈出第一頁
    ...mapState(productStore, ['allProducts']),

    // 篩出相同分類產品, this.product.id 這裡的product是由外部props傳入的值
    filteredItems() {
      return this.allProducts.filter(
        (item) => item.id !== this.product.id && item.category === this.product.category,
      );
    },
  },
  methods: {
    ...mapActions(productStore, ['getAllProducts']),
    // 向外傳遞(單一產品)
    getDetail(id) {
      this.$emit('update', id);
      // 手動切換頁面置頂
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

  },
  mounted() {
    this.getAllProducts();
  },
};
</script>

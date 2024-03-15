<template>
  相關產品
  <div class="container">
    <div class="swiper-wrapper">
        <swiper ref="relateSwiper" :options="swiperOption">
          <swiper-slide v-for="item in filteredItems" :key="item.id">
            {{ item }}
            <RouterLink :to="`/product-view/${item.id}`"
            class="item_cont">
              <div class="item_cont-image">
                <img :src="item.imageUrl" alt="圖片">
              </div>
              <div class="item_cont-text">
                <div class="tibox">{{ item.title }}</div>
                ${{ item.price }}
              </div>
            </RouterLink>
          </swiper-slide>
        </swiper>
      </div>
      <div class="custom-pagination"></div>
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
      swiperOption: {
        pagination: {
          el: '.custom-pagination', // 指定分頁元素
          clickable: true,
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },

        loop: true,
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 50,
        modules: 'this.modules',
        navigation: false,

      },
    };
  },
  computed: {
    ...mapState(productStore, ['products']),
    filteredItems() {
      return this.products;
      // return this.products.filter(
      //   (item) => item.id !== this.products.id && item.category === this.products.category,
      // );
    },
  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'getProductItem']),
  },
  mounted() {
    this.getProducts();
  },
};
</script>

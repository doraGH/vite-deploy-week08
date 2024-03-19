<template>
  <div class="banner d-flex flex-column justify-content-center align-items-start">
    <div class="container slogan">
      <div class="en">
        SUMMER<br>
        ICE CREAM
      </div>
      <div class="ch">夏季繽紛樂</div>
      <RouterLink to="/products" type="button" class="btn btn-primary rounded-pill">
        探索美麗新滋味
        <font-awesome-icon :icon="['fas', 'arrow-right']" /> </RouterLink>
    </div>
  </div>
  <section class="iproducts">
    <div class="container">
      <h2 class="main-header text-center">NEW PRODUCTS</h2>
      <div class="swiper-wrapper">
        <swiper
          ref="mySwiper"
          :loop="false"
          :autoplay="{ delay: 6000, disableOnInteraction: false }"
          :slidesPerGroup="1"
          :slidesPerView="1"
          :spaceBetween="50"
          :modules="modules"
          :navigation="false"
          :pagination="{
            el: '.custom-pagination', // 指定分頁元素
            clickable: true
            }"
          :breakpoints="{
            480: {
              slidesPerView: 2,
              // slidesPerGroup: 2,
            },
            992: {
              slidesPerView: 4,
              // slidesPerGroup: 4,
            },
          }">
          <swiper-slide v-for="item in getDisplayedProducts()" :key="item.id">
            <RouterLink :to="`/product-view/${item.id}`" class="item_cont">
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
  </section>
  <section class="inews">
    <div class="container">
      <!-- <h2 class="main-header text-center">NEWS</h2> -->
      <div class="row">
        <div class="col-4">
          <div class="single-box">
            <RouterLink :to="`/products?category=${encodeURIComponent('冰品')}`"
            class="single-box_pic">
              <img src="https://images.unsplash.com/photo-1573991288363-aa2067bc6a73?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="530" height="530" class="img-fluid" alt="">
            </RouterLink>
            <div class="single-box_txt">
              <h3 class="tibox">冰品專區<small>Ice cream area</small>
              </h3>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="single-box">
            <RouterLink :to="`/products?category=${encodeURIComponent('甜點')}`"
            class="single-box_pic">
              <img src="https://images.unsplash.com/photo-1567941723610-db0bcb4cca67?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="530" height="530" class="img-fluid" alt="">
            </RouterLink>
            <div class="single-box_txt">
              <h3 class="tibox">甜點專區<small>Dessert area</small>
              </h3>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="single-box">
            <RouterLink :to="`/products?category=${encodeURIComponent('飲品')}`"
            class="single-box_pic">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="530" height="530" class="img-fluid" alt="">
            </RouterLink>
            <div class="single-box_txt">
              <h3 class="tibox">飲品專區<small>Coffee area</small>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="iabout2">
    <div class="container">
      <div class="d-flex flex-column justify-content-center text-center">
        <div class="stitle">Fresh Ice Cream Shop</div>
        <div class="tibox">締造心動美味風潮！</div>
        <p>揭開歡樂滋味的序幕，我們以專業巧思打造獨一無二的美味饗宴，
          每一口都是心動的旋律。<br>精選頂級食材，搭配獨特的烹飪技藝，
          呈現令人難以忘懷的口感。<br>透過細緻的烹調，我們將美味提升至一種藝術，
          讓您的味蕾在專業巧思中沸騰。<br>融合創新和傳統，我們引領著一場風潮，
          讓您沉浸在美好的味覺饗宴中，共同譜寫難忘的滋味時光。</p>
      </div>
    </div>
    <div class="container-fluid"><img src="/about_pic1.jpg" class="img-fluid"></div>
  </section>
  <section class="adv container">
    <div class="row">
      <div class="col-12 col-md-6 my-1 adv-wrap">
        <a href="#">
          <div class="adv-text">
            <div class="title">品牌故事</div>
            <p>創新美味，品味生活的奇妙旅程。</p>
            <span class="arrow">
              <i class="hidden_i">more</i></span>
          </div>
          <div class="pic adv-img1"></div>
        </a>
      </div>
      <div class="col-12 col-md-6 my-1 adv-wrap">
        <a href="#">
          <div class="adv-text">
            <div class="title">聯絡我們</div>
            <p>發現味蕾之寶，品味美好生活。</p>
            <span class="arrow">
              <i class="hidden_i">more</i></span>
          </div>
          <div class="pic adv-img2"></div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isLoading: true,
      modules: [Autoplay, Navigation, Pagination],
      articles: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.getProducts();
    this.getArticles();
  },
  computed: {
    ...mapState(productStore, ['products', 'loadItem']),
  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'getProductItem']),

    // 取得文章列表
    getArticles() {
      const url = `${VITE_URL}/api/${VITE_PATH}/articles`;
      this.axios.get(url)
        .then((response) => {
          const { articles } = response.data;
          this.articles = articles;
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },

    getDisplayedProducts() {
      // 取前10筆或特定category的产品
      return this.products.slice(0, 6); // 只取前10条数据
      // 或者你可以使用过滤器来过滤特定的category
      // return this.products.filter(item => item.category === '特定category');
    },
  },

};
</script>

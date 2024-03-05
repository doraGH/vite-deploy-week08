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
          :loop="true"
          :autoplay="{ delay: 6000, disableOnInteraction: false }"
          :slides-per-group="1"
          :slides-per-view="1"
          :space-between="50"
          :modules="modules"
          :navigation="false"
          :pagination="{
            el: '.custom-pagination', // 指定分頁元素
            clickable: true
            }"
          :breakpoints="{
            480: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            992: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }">
          <swiper-slide v-for="item in products" :key="item.id">
            <RouterLink to="/products" class="item_cont">
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
      <h2 class="main-header text-center">NEWS</h2>
      <div class="row">
        <div class="col-6">
          <div class="single-box">
            <a href="#" title="" class="single-box_pic">
              <img src="https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="530" height="530" class="img-fluid" alt="">
            </a>
            <div class="single-box_txt">
              <!-- <div class="box__txt-cat">媒體報導</div> -->
              <div class="date">2023.10.23</div>
              <h3 class="tibox">席捲臺北時裝週 盡情暢飲體驗健康微醺感 金曲樂團麋先生也好愛！</h3>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="list-group">
            <a href="#" class="row sbox">
              <div class="col-3 image">
                <img src="https://images.unsplash.com/photo-1629385701021-fcd568a743e8?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="img-fluid" alt="">
              </div>
              <div class="col-9 text">
                <div class="text-cat">媒體報導</div>
                <div class="text-date">2023.09.29</div>
                <div class="text-title">
                  星晨酒藏 入選 VOGUE Taiwan, Fno select, trend 當代趨勢
                </div>
              </div>
            </a>
            <a href="#" class="row sbox">
              <div class="col-3 image">
                <img src="https://images.unsplash.com/photo-1592413890637-ea80fb4ed093?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="img-fluid" alt="">
              </div>
              <div class="col-9 text">
                <div class="text-cat">媒體報導</div>
                <div class="text-date">2023.09.29</div>
                <div class="text-title">
                  222
                </div>
              </div>
            </a>
            <a href="#" class="row sbox">
              <div class="col-3 image">
                <img src="https://images.unsplash.com/photo-1592413890637-ea80fb4ed093?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="img-fluid" alt="">
              </div>
              <div class="col-9 text">
                <div class="text-cat">媒體報導</div>
                <div class="text-date">2023.09.29</div>
                <div class="text-title">
                  2332
                </div>
              </div>
            </a>
          </div>
        </div>
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

    // 加入視窗大小變更事件監聽器
    window.addEventListener('resize', this.recalculateSwiper);
    // 初始設定 Swiper
    this.recalculateSwiper();

    this.getArticles();
  },
  computed: {
    ...mapState(productStore, ['products', 'loadItem']),
  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'getProductItem']),

    // 重新計算 Swiper 輪播內容的方法
    recalculateSwiper() {
      // .$swiper 是 Swiper.js 提供的一個屬性，它包含了 Swiper 實例的引用。
      const swiper = this.$refs.mySwiper.$swiper;
      if (swiper) {
        swiper.update(); // 觸發 Swiper 更新
      }
    },

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
  },
  beforeMount() {
    // 在元件被銷毀前移除視窗大小變更事件監聽器，以防止記憶體洩漏
    window.removeEventListener('resize', this.recalculateSwiper);
  },
};
</script>

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
      <h2 class="main-header text-center">PRODUCT</h2>
      <swiper
        :loop="true"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :slides-per-view="1"
        :space-between="50"
        :modules="modules"
        :navigation="true"
        :pagination="{
          el: '.custom-pagination', // 指定分页器容器的选择器
          clickable: true
          }"
        :breakpoints="{
          480: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }">
        <swiper-slide>
          <div class="item_cont">
            <div class="item_cont-image">
              <img src="https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            </div>
            <div class="item_cont-text">嘭嘭！草莓</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_cont">
            <div class="item_cont-image">
              <img src="https://plus.unsplash.com/premium_photo-1678198786424-c2cc6593f59c?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            </div>
            <div class="item_cont-text">嘭嘭！草莓</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_cont">
            <div class="item_cont-image">
              <img src="https://images.unsplash.com/photo-1594488506255-a8bbfdeedbaf?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            </div>
            <div class="item_cont-text">嘭嘭！草莓</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_cont">
            <div class="item_cont-image">
              <img src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""
              class="img-responsive">
            </div>
            <div class="item_cont-text">嘭嘭！草莓</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_cont">
            <div class="item_cont-image">
              <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80" alt="">
            </div>
            <div class="item_cont-text">嘭嘭！草莓</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_cont">
            <div class="item_cont-image">
              <img src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80" alt="">
            </div>
            <div class="item_cont-text">嘭嘭！草莓</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_cont">
            <div class="item_cont-image">
              <img src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">
            </div>
            <div class="item_cont-text">嘭嘭！草莓</div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="item_cont">
            <div class="item_cont-image">
              <img src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">
            </div>
            <div class="item_cont-text">嘭嘭！草莓</div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="custom-pagination"></div>
    </div>
  </section>
  <section class="inews">
    <div class="container">
      <h2 class="main-header">NEWS</h2>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isLoading: true,
      modules: [Autoplay, Navigation, Pagination],
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
}

.iproducts .item_cont-image {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 15px;
  border-radius: 50rem 50rem 0 0;
  overflow: hidden;
}
.iproducts .item_cont-image img {
  display: block;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.iproducts .item_cont-text {
  font-size: 1.25rem;
  text-align: center;
}
/* .custom-pagination {
  text-align: center;
  margin-top: 40px;
} */
.custom-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}
/* .swiper-pagination-bullet {
    width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));
    height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));
    display: inline-block;
    border-radius: var(--swiper-pagination-bullet-border-radius, 50%);
    background: var(--swiper-pagination-bullet-inactive-color, #000);
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
  } */
.custom-pagination .swiper-pagination-bullet {
  display: block;
  position: relative;
  width: 27px;
  height: 32px;
  margin: 0 7px;
  cursor: pointer;
}
.custom-pagination .swiper-pagination-bullet:before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 100%;
  background: #f3ccd5;
  content: "";
}
.custom-pagination .swiper-pagination-bullet-active:before {
  background: #e76785;
}

</style>

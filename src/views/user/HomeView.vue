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
  <section class="iproducts" style="height: 500px;">
    products
  </section>
</template>

<script>

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

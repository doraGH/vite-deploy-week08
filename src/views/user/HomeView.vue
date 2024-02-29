<template>
  <div class="container my-4">
    <div class="home">
      <VueLoading :active="isLoading" />
      <h1>Hello, This is Home Page.</h1>
      <hr>
    </div>
  </div>
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

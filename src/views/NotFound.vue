<template>
  <div class="nofund">
    <div class="wrapper">
      <h1 class="title">404</h1>
      <h2>Page Not Found</h2>
      <p>抱歉，你查詢的頁面不存在!</p>
      <RouterLink to="/" class="btn btn-primary btn-lg">返回首頁</RouterLink>
    </div>
  </div>
</template>

<style>
.nofund {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nofund::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45%;
  background-color: #FFEDED;
  z-index: 10;
}
.nofund .wrapper {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 2;
}
.nofund .wrapper .title {
  font-size: 200px;
  line-height: 200px;
  color: #FF9A9A;
}

</style>

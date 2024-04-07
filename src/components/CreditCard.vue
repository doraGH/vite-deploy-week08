<template>
  <h5 class="bg-dark text-light py-2 px-1">信用卡資訊</h5>
  <VForm ref="form" class="px-12 py-16" v-slot="{ errors }"
  @submit="$emit('pay-item')">
    <label for="cardNum" class="form-label">信用卡卡號 <span class="text-danger">*</span></label>
    <VField id="cardNum" name="cardNum" type="text"
      class="form-control border-gray" :class="{ 'is-invalid': errors['cardNum'] }"
      placeholder="請輸入信用卡卡號" :rules="cardNum" maxlength="16"></VField>
    <ErrorMessage name="cardNum" class="invalid-feedback"></ErrorMessage>

    <label for="validDate" class="form-label">有效年月
      <span class="text-danger">*</span></label>
    <VField id="validDate" name="validDate" type="date" class="form-control border-gray"
      :class="{ 'is-invalid': errors['validDate'] }" :rules="validDate"></VField>
    <ErrorMessage name="validDate" class="invalid-feedback"></ErrorMessage>

    <label for="securityNum" class="form-label mt-20">安全碼
      <span class="text-danger">*</span></label>
    <VField id="securityNum" name="securityNum" type="text"
      class="form-control border-gray" :class="{ 'is-invalid': errors['securityNum'] }"
      placeholder="請輸入卡片背面末3碼" :rules="securityNum" maxlength="3"></VField>
    <ErrorMessage name="securityNum" class="invalid-feedback"></ErrorMessage>

    <div class="text-end mt-24">
      <button type="submit" class="btn btn-primary text-white mt-3 w-100">確認付款</button>
    </div>
  </VForm>
</template>
<script>
export default {
  emits: ['pay-item'],
  methods: {
    // 信用卡驗證
    cardNum(num) {
      const regex = /\d{16}/;
      return regex.test(num) ? true : '請輸入正確信用卡數字';
    },
    validDate(num) {
      return num ? true : '請選擇有效年/月';
    },
    securityNum(num) {
      const regex = /\d{3}/;
      return regex.test(num) ? true : '請輸入卡片背面末3碼數字';
    },
  },
};
</script>

<template>
  <div class="d-grid gap-2 p-4 border-bottom">
    <FacebookBtn>登入</FacebookBtn>
  </div>
  <div class="pt-4">請輸入您的登入資訊</div>
  <Form class="d-grid p-4 text-end" @submit="onSubmit">
    <Field
      name="account"
      type="text"
      :rules="isRequired"
      class="form-control"
      placeholder="帳號"
    />
    <ErrorMessage name="account" class="text-danger" />
    <Field
      name="password"
      type="password"
      :rules="isRequired"
      class="form-control mt-3"
      placeholder="密碼"
    />
    <ErrorMessage name="password" class="text-danger" />
    <button class="btn btn-primary mt-3" type="submit">開始購物</button>
  </Form>
  <div class="pb-4">
    <a href="#" class="link-dark">忘記密碼?</a>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import FacebookBtn from '@/components/FacebookBtn.vue';

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
    FacebookBtn,
  },
  data() {
    return {};
  },

  methods: {
    onSubmit(values) {
      console.log(values);
    },
    isRequired(value) {
      return value ? true : '此欄位必填';
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

button {
  font-weight: bold;
}
</style>

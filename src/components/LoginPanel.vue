<template>
  <div class="d-grid gap-2 p-4 border-bottom">
    <FacebookBtn action="登入" />
  </div>
  <div class="pt-4 text-center">請輸入您的登入資訊</div>
  <Form class="d-grid p-4 text-end" @submit="onSubmit">
    <Field
      name="account"
      type="text"
      :rules="isRequired"
      class="form-control"
      placeholder="帳號"
      @keydown="cleanError"
    />
    <ErrorMessage name="account" class="text-danger" />
    <Field
      name="password"
      type="password"
      :rules="isRequired"
      class="form-control mt-3"
      placeholder="密碼"
      @keydown="cleanError"
    />
    <ErrorMessage name="password" class="text-danger" />
    <button class="btn btn-primary mt-3" type="submit">開始購物</button>
  </Form>
  <div class="text-danger text-center">{{ loginError }}</div>
  <div class="pb-4 text-center">
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
    return {
      loginError: '',
    };
  },
  methods: {
    onSubmit(values) {
      this.$axios
        .post('/api/users/login', {
            account: values.account,
            password: values.password,
        })
        .then((response) => {
          this.$store.dispatch('setLogin', response.data.data.userName);
          this.$parent.redirectAfterLogin();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            this.loginError = '帳號或密碼錯誤，請重新輸入';
          }
        });
    },
    isRequired(value) {
      return value ? true : '此欄位必填';
    },
    cleanError() {
      this.loginError = '';
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

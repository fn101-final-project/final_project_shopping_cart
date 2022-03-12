<template>
  <div class="d-grid gap-2 p-4 border-bottom">
    <button class="btn btn-primary" type="button">使用facebook註冊</button>
  </div>
  <Form class="d-grid p-4 text-end" @submit="onSubmit">
    <Field
      name="account"
      type="text"
      :rules="isRequired"
      class="form-control"
      placeholder="帳號"
    />
    <ErrorMessage name="account" class="text-danger" />
    <div class="row">
      <div class="col-md-6">
        <Field
          name="password"
          type="password"
          :rules="validatePassword"
          class="form-control mt-3"
          placeholder="密碼"
          v-model="password"
        />
        <ErrorMessage name="password" class="text-danger" />
      </div>
      <div class="col-md-6">
        <Field
          name="password-verify"
          type="password"
          :rules="validatePasswordVerify"
          class="form-control mt-3"
          placeholder="再次輸入密碼"
        />
        <ErrorMessage name="password-verify" class="text-danger" />
      </div>
    </div>
    <Field
      name="full-name"
      type="text"
      :rules="isRequired"
      class="form-control mt-3"
      placeholder="全名"
    />
    <ErrorMessage name="full-name" class="text-danger" />
    <Field
      name="gender"
      as="select"
      class="form-select mt-3"
      :rules="isRequired"
    >
      <option value="" disabled>性別</option>
      <option value="male">男</option>
      <option value="female">女</option>
    </Field>
    <ErrorMessage name="gender" class="text-danger" />
    <Field
      name="email"
      type="email"
      :rules="validateEmail"
      class="form-control mt-3"
      placeholder="Email"
    />
    <ErrorMessage name="email" class="text-danger" />
    <button class="btn btn-primary mt-3" type="submit">立即加入</button>
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
    isRequired(value) {
      return value ? true : '此欄位必填';
    },
    validateEmail(value) {
      if (!value) {
        return '此欄位必填';
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'Email格式不符';
      }
      return true;
    },
    validatePassword(value) {
      if (!value) {
        return '此欄位必填';
      }
      return value.length >= 8 ? true : '最少8個字';
    },
    validatePasswordVerify(value) {
      if (!value) {
        return '此欄位必填';
      }
      return this.password === value ? true : '密碼不一致';
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

<template>
  <div class="d-grid gap-2 p-4 border-bottom">
    <FacebookBtn action="註冊" />
  </div>
  <Form class="d-grid p-4 text-end" @submit="onSubmit">
    <Field
      name="account"
      type="text"
      :rules="isRequired"
      class="form-control"
      placeholder="帳號"
      v-model="account"
    />
    <ErrorMessage name="account" class="text-danger" />
    <div v-if="isUserExist" class="text-danger">
      此帳號已有人使用，請設定其他帳號
    </div>
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
        <div class="d-flex justify-content-between">
          <small class="ps-1 fw-light">至少8個字元</small>
          <ErrorMessage name="password" class="text-danger" />
        </div>
      </div>
      <div class="col-md-6">
        <Field
          name="passwordVerify"
          type="password"
          :rules="validatePasswordVerify"
          class="form-control mt-3"
          placeholder="再次輸入密碼"
        />
        <ErrorMessage name="passwordVerify" class="text-danger" />
      </div>
    </div>
    <Field
      name="fullName"
      type="text"
      :rules="isRequired"
      class="form-control mt-3"
      placeholder="用戶名"
    />
    <ErrorMessage name="fullName" class="text-danger" />
    <Field
      name="gender"
      as="select"
      :rules="isRequired"
      class="form-select mt-3"
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
    <div class="border-top mt-4 py-3 text-start">
      <input type="checkbox" v-model="agreeContract" />我同意<a href="#"
        >網站服務條款及隱私設定</a
      >
    </div>
    <button class="btn btn-primary mt-3" type="submit" :disabled="isDisabled">
      立即加入
    </button>
  </Form>
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
      password: '',
      account: '',
      agreeContract: false,
      isUserExist: false,
    };
  },
  watch: {
    account: {
      handler() {
        this.isUserExist = false;
      },
    },
  },
  computed: {
    isDisabled() {
      return this.agreeContract ? false : true;
    },
  },
  methods: {
    onSubmit(values) {
      this.$axios
        .post('/api/users', {
          account: values.account,
          password: values.password,
          email: values.email,
          fullName: values.fullName,
        })
        .then(() => {
          this.$swal('註冊成功').then(() => {
            this.$parent.changeToLogin();
          });
        })
        .catch((error) => {
          if (error.response.data.message === 'user already exists')
            this.isUserExist = true;
        });
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

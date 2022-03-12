<template>
  <div class="background">
    <div class="container px-5">
      <div class="row pt-5 justify-content-center">
        <button
          class="col-6"
          :class="{ active: isSignup }"
          @click="changeToSignup"
        >
          註冊會員
        </button>
        <button
          class="col-6"
          :class="{ active: isLogin }"
          @click="changeToLogin"
        >
          會員登入
        </button>
      </div>
      <div class="row pb-5">
        <div class="col-12 m-auto panel">
          <LoginPanel v-if="isLogin" />
          <SignupPanel v-if="isSignup" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginPanel from '@/components/LoginPanel.vue';
import SignupPanel from '@/components/SignupPanel.vue';

export default {
  components: {
    LoginPanel,
    SignupPanel,
  },
  data() {
    return {
      isLogin: true,
      isSignup: false,
    };
  },
  methods: {
    changeToSignup() {
      this.isLogin = false;
      this.isSignup = true;
    },
    changeToLogin() {
      this.isLogin = true;
      this.isSignup = false;
    },
  },
};
</script>

<style scoped>
.background {
  /* background: rgb(187, 187, 187); */
}

button {
  background: rgb(233, 233, 233);
  border: 1px solid rgba(128, 128, 128, 0.3);
  height: 60px;
  max-width: 300px;
}

button:first-of-type {
  border-right: none;
}

button.active {
  background: white;
  border-bottom: none;
}

.panel {
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-top: none;
  max-width: 600px;
}
</style>

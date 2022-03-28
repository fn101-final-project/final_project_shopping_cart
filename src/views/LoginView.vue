<template>
  <div class="background">
    <div class="container px-4">
      <div class="row pt-5 justify-content-center">
        <button
          class="col-6"
          :class="{ active: currentPanel === 'SignupPanel' }"
          @click="currentPanel = 'SignupPanel'"
        >
          註冊會員
        </button>
        <button
          class="col-6"
          :class="{ active: currentPanel === 'LoginPanel' }"
          @click="currentPanel = 'LoginPanel'"
        >
          會員登入
        </button>
      </div>
      <div class="row pb-5">
        <div class="col-12 m-auto panel">
          <component :is="currentPanel" />
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
      prevPath: null,
      currentPanel: 'LoginPanel',
    };
  },
  provide() {
    return {
      prevPath: this.prevPath,
      changePanel: this.changePanel,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevPath = from.path;
    });
  },
  methods: {
    changePanel(panel) {
      this.currentPanel = panel;
    },
  },
};
</script>

<style scoped>
button {
  background: rgb(233, 233, 233);
  border: 1px solid rgba(128, 128, 128, 0.3);
  height: 60px;
  max-width: 250px;
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
  max-width: 500px;
}
</style>
